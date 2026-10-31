'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Play, Pause, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';

interface ViewerProps {
  type: 'computer' | 'cpu' | 'ram' | 'storage' | 'motherboard' | 'bus' | 'peripherals' | 'software' | 'os';
  title?: string;
}

export const Computer3DViewer: React.FC<ViewerProps> = ({ type, title }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [infoTip, setInfoTip] = useState<string>("Fais glisser ta souris ou ton doigt pour faire tourner l'objet en 3D !");

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const fanGroupRef = useRef<THREE.Group | null>(null);
  const platterRef = useRef<THREE.Mesh | null>(null);
  const actuatorRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Mouse interaction state
  const isDraggingRef = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Dimensions
    const width = mount.clientWidth || 500;
    const height = mount.clientHeight || 360;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f172a'); // Rich dark tech slate
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 7);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.8); // Cyan soft light
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf472b6, 1.2); // Pink backlight
    dirLight2.position.set(-5, 4, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xfacc15, 2, 10);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    // Platform / Floor
    const floorGeo = new THREE.CylinderGeometry(3.5, 3.8, 0.2, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.6,
      roughness: 0.3,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -1.5;
    floor.receiveShadow = true;
    rootGroup.add(floor);

    // Glowing rim for platform
    const rimGeo = new THREE.TorusGeometry(3.55, 0.05, 16, 64);
    const rimMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = -1.4;
    rootGroup.add(rim);

    // Build specific 3D Model according to node type
    buildModel(type, rootGroup);

    // Render loop
    let clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (autoRotate && rootGroupRef.current) {
        rootGroupRef.current.rotation.y += 0.008;
      }

      // Rotate fan if present
      if (fanGroupRef.current) {
        fanGroupRef.current.rotation.z += 0.15;
      }

      // Rotate hard drive platter if present
      if (platterRef.current) {
        platterRef.current.rotation.y += 0.2;
      }

      // Move HDD actuator arm if present
      if (actuatorRef.current) {
        actuatorRef.current.rotation.y = Math.sin(time * 3) * 0.25;
      }

      // Animate particles if present
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.01;
        const positions = (particlesRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += Math.sin(time * 4 + i) * 0.005;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Mouse Drag rotation handlers
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !rootGroupRef.current) return;
      const deltaX = e.clientX - prevMousePos.current.x;
      const deltaY = e.clientY - prevMousePos.current.y;

      rootGroupRef.current.rotation.y += deltaX * 0.01;
      rootGroupRef.current.rotation.x += deltaY * 0.01;
      // Clamp vertical tilt
      rootGroupRef.current.rotation.x = Math.max(-0.6, Math.min(0.6, rootGroupRef.current.rotation.x));

      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch support for tablets & mobiles
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !rootGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.current.x;
      const deltaY = e.touches[0].clientY - prevMousePos.current.y;

      rootGroupRef.current.rotation.y += deltaX * 0.01;
      rootGroupRef.current.rotation.x += deltaY * 0.01;
      rootGroupRef.current.rotation.x = Math.max(-0.6, Math.min(0.6, rootGroupRef.current.rotation.x));

      prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize handler
    const handleResize = () => {
      if (!mount || !renderer || !camera) return;
      const newW = mount.clientWidth;
      const newH = mount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type, autoRotate]);

  // Model Builder function
  const buildModel = (modelType: string, parent: THREE.Group) => {
    switch (modelType) {
      case 'computer':
      case 'materiel':
      case 'unite-centrale':
        buildComputerSetup(parent);
        break;
      case 'cpu':
        buildCpuModel(parent);
        break;
      case 'ram':
        buildRamModel(parent);
        break;
      case 'storage':
        buildStorageModel(parent);
        break;
      case 'motherboard':
        buildMotherboardModel(parent);
        break;
      case 'bus':
        buildBusHighway(parent);
        break;
      case 'peripherals':
      case 'entree':
      case 'sortie':
      case 'stockage-comm':
        buildPeripheralsCollection(parent);
        break;
      case 'software':
      case 'os':
      case 'applications':
        buildSoftwareHologram(parent);
        break;
      default:
        buildComputerSetup(parent);
    }
  };

  // 1. Full Desktop Computer Setup
  const buildComputerSetup = (parent: THREE.Group) => {
    setInfoTip("Voici l'ordinateur complet ! Admire l'écran, le clavier, la souris et la tour avec son ventilateur RGB !");
    const compGroup = new THREE.Group();

    // --- PC TOWER ---
    const towerGeo = new THREE.BoxGeometry(0.9, 1.8, 1.8);
    const towerMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.set(-1.8, -0.4, 0);
    compGroup.add(tower);

    // Acrylic side panel (transparent)
    const glassGeo = new THREE.BoxGeometry(0.05, 1.6, 1.6);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.1,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.set(-1.33, -0.4, 0);
    compGroup.add(glass);

    // RGB Fan inside tower
    const fanGroup = new THREE.Group();
    fanGroup.position.set(-1.5, -0.3, 0.4);
    for (let i = 0; i < 4; i++) {
      const bladeGeo = new THREE.BoxGeometry(0.35, 0.08, 0.02);
      const bladeMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x06b6d4 : 0xec4899 });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.rotation.z = (i * Math.PI) / 2;
      fanGroup.add(blade);
    }
    compGroup.add(fanGroup);
    fanGroupRef.current = fanGroup;

    // --- MONITOR ---
    const screenBaseGeo = new THREE.CylinderGeometry(0.4, 0.45, 0.06, 24);
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    const screenBase = new THREE.Mesh(screenBaseGeo, darkMat);
    screenBase.position.set(0.5, -1.35, 0);
    compGroup.add(screenBase);

    const screenStandGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.8, 16);
    const screenStand = new THREE.Mesh(screenStandGeo, darkMat);
    screenStand.position.set(0.5, -0.95, 0);
    compGroup.add(screenStand);

    // Monitor Bezel
    const screenFrameGeo = new THREE.BoxGeometry(2.3, 1.4, 0.1);
    const screenFrame = new THREE.Mesh(screenFrameGeo, darkMat);
    screenFrame.position.set(0.5, -0.3, 0);
    compGroup.add(screenFrame);

    // Screen Glass / Display (Glowing blue smiley face)
    const displayGeo = new THREE.PlaneGeometry(2.1, 1.25);
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Wallpaper background gradient
      const grad = ctx.createLinearGradient(0, 0, 512, 300);
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(0.5, '#6366f1');
      grad.addColorStop(1, '#a855f7');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 300);

      // Friendly smile and code
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Bonjour les Petits Génies !', 256, 100);

      ctx.font = 'bold 50px Arial';
      ctx.fillText('💻 🌟 🤖', 256, 175);

      ctx.font = '22px Arial';
      ctx.fillStyle = '#fef08a';
      ctx.fillText('Prêt à explorer l\'ordinateur ?', 256, 230);
    }
    const screenTex = new THREE.CanvasTexture(canvas);
    const displayMat = new THREE.MeshBasicMaterial({ map: screenTex });
    const display = new THREE.Mesh(displayGeo, displayMat);
    display.position.set(0.5, -0.3, 0.055);
    compGroup.add(display);

    // --- KEYBOARD ---
    const kbGeo = new THREE.BoxGeometry(1.6, 0.06, 0.6);
    const kb = new THREE.Mesh(kbGeo, darkMat);
    kb.position.set(0.5, -1.35, 1.1);
    kb.rotation.x = 0.05;
    compGroup.add(kb);

    // Key rows
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 10; col++) {
        const keyGeo = new THREE.BoxGeometry(0.1, 0.04, 0.08);
        const keyMat = new THREE.MeshStandardMaterial({
          color: (row + col) % 3 === 0 ? 0x38bdf8 : 0x64748b,
          roughness: 0.3,
        });
        const key = new THREE.Mesh(keyGeo, keyMat);
        key.position.set(col * 0.14 - 0.15, -1.31, row * 0.11 + 0.95);
        compGroup.add(key);
      }
    }

    // --- MOUSE ---
    const mouseGeo = new THREE.SphereGeometry(0.18, 16, 16);
    mouseGeo.scale(1, 0.6, 1.5);
    const mouseMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3, metalness: 0.4 });
    const mouse = new THREE.Mesh(mouseGeo, mouseMat);
    mouse.position.set(1.6, -1.35, 1.1);
    compGroup.add(mouse);

    parent.add(compGroup);
  };

  // 2. Microprocessor (CPU)
  const buildCpuModel = (parent: THREE.Group) => {
    setInfoTip("Voici le Processeur (CPU) ! C'est le cerveau ultra-rapide qui effectue des milliards de calculs à la seconde !");
    const cpuGroup = new THREE.Group();

    // Green PCB substrate
    const pcbGeo = new THREE.BoxGeometry(2.4, 0.1, 2.4);
    const pcbMat = new THREE.MeshStandardMaterial({ color: 0x047857, roughness: 0.4 });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    cpuGroup.add(pcb);

    // Golden pins underneath
    const pinsGeo = new THREE.BoxGeometry(2.2, 0.04, 2.2);
    const pinsMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.1 });
    const pins = new THREE.Mesh(pinsGeo, pinsMat);
    pins.position.y = -0.07;
    cpuGroup.add(pins);

    // Metallic Heatspreader (IHS)
    const ihsGeo = new THREE.BoxGeometry(1.8, 0.18, 1.8);
    const ihsMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.85, roughness: 0.2 });
    const ihs = new THREE.Mesh(ihsGeo, ihsMat);
    ihs.position.y = 0.14;
    cpuGroup.add(ihs);

    // Golden embossed logo / text canvas
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#d4d4d8';
      ctx.fillRect(0, 0, 256, 256);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SUPER CPU', 128, 80);
      ctx.font = 'bold 24px monospace';
      ctx.fillStyle = '#d97706';
      ctx.fillText('⚡ 4.5 GHz ⚡', 128, 130);
      ctx.fillStyle = '#2563eb';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('10 MILLIARDS', 128, 175);
      ctx.fillText('TRANSISTORS', 128, 205);
    }
    const tex = new THREE.CanvasTexture(canvas);
    const labelGeo = new THREE.PlaneGeometry(1.5, 1.5);
    const labelMat = new THREE.MeshBasicMaterial({ map: tex });
    const label = new THREE.Mesh(labelGeo, labelMat);
    label.rotation.x = -Math.PI / 2;
    label.position.y = 0.24;
    cpuGroup.add(label);

    // Pulsing data rings
    const ringGeo = new THREE.TorusGeometry(1.8, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.2;
    cpuGroup.add(ring);

    // Orbiting data particles
    const particleCount = 60;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 1.6 + Math.random() * 0.8;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xfacc15, size: 0.1 });
    const particles = new THREE.Points(geometry, pMat);
    cpuGroup.add(particles);
    particlesRef.current = particles;

    cpuGroup.scale.set(1.3, 1.3, 1.3);
    parent.add(cpuGroup);
  };

  // 3. RAM Stick (Memory)
  const buildRamModel = (parent: THREE.Group) => {
    setInfoTip("Voici une barrette de Mémoire Vive (RAM) ! C'est la table de travail magique qui retient tout ce qui est ouvert !");
    const ramGroup = new THREE.Group();

    // PCB Stick
    const pcbGeo = new THREE.BoxGeometry(3.6, 1.1, 0.08);
    const pcbMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.3 });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    ramGroup.add(pcb);

    // Golden Connector Pins on the bottom
    const goldGeo = new THREE.BoxGeometry(3.4, 0.18, 0.09);
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.1 });
    const goldPins = new THREE.Mesh(goldGeo, goldMat);
    goldPins.position.y = -0.55;
    ramGroup.add(goldPins);

    // Black Memory IC chips (8 chips)
    for (let i = 0; i < 8; i++) {
      const chipGeo = new THREE.BoxGeometry(0.3, 0.5, 0.06);
      const chipMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.2, metalness: 0.5 });
      const chip = new THREE.Mesh(chipGeo, chipMat);
      chip.position.set(-1.4 + i * 0.4, 0.05, 0.06);
      ramGroup.add(chip);
    }

    // Heatshield on top with RGB bar
    const rgbBarGeo = new THREE.BoxGeometry(3.6, 0.16, 0.12);
    const rgbBarMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
    const rgbBar = new THREE.Mesh(rgbBarGeo, rgbBarMat);
    rgbBar.position.y = 0.62;
    ramGroup.add(rgbBar);

    ramGroup.scale.set(1.2, 1.2, 1.2);
    parent.add(ramGroup);
  };

  // 4. Storage Drive (HDD / SSD)
  const buildStorageModel = (parent: THREE.Group) => {
    setInfoTip("Voici le disque de Stockage ! Il garde toutes tes photos, tes jeux et tes devoirs pour toujours !");
    const driveGroup = new THREE.Group();

    // Drive Case
    const caseGeo = new THREE.BoxGeometry(2.4, 0.5, 3.2);
    const caseMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 });
    const driveCase = new THREE.Mesh(caseGeo, caseMat);
    driveGroup.add(driveCase);

    // Recessed inside area
    const innerGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.1, 32);
    const innerMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    inner.position.set(0, 0.22, -0.2);
    driveGroup.add(inner);

    // Mirror Platter
    const platterGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.04, 32);
    const platterMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.98,
      roughness: 0.05,
    });
    const platter = new THREE.Mesh(platterGeo, platterMat);
    platter.position.set(0, 0.26, -0.2);
    driveGroup.add(platter);
    platterRef.current = platter;

    // Center Spindle
    const spindleGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.08, 16);
    const spindleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9 });
    const spindle = new THREE.Mesh(spindleGeo, spindleMat);
    spindle.position.set(0, 0.3, -0.2);
    driveGroup.add(spindle);

    // Actuator Arm Group
    const actuatorGroup = new THREE.Group();
    actuatorGroup.position.set(-0.7, 0.28, 0.6);

    const armGeo = new THREE.BoxGeometry(0.12, 0.04, 0.9);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 });
    const arm = new THREE.Mesh(armGeo, armMat);
    arm.position.set(0.3, 0, -0.4);
    arm.rotation.y = -0.5;
    actuatorGroup.add(arm);

    // Glowing read head
    const headGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const headMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(0.55, 0, -0.8);
    actuatorGroup.add(head);

    driveGroup.add(actuatorGroup);
    actuatorRef.current = actuatorGroup;

    driveGroup.scale.set(1.1, 1.1, 1.1);
    parent.add(driveGroup);
  };

  // 5. Motherboard
  const buildMotherboardModel = (parent: THREE.Group) => {
    setInfoTip("Voici la Carte Mère ! C'est le grand squelette et le système nerveux qui relie tous les organes !");
    const mbGroup = new THREE.Group();

    // Main board (Dark Emerald / Tech PCB)
    const boardGeo = new THREE.BoxGeometry(3.2, 0.1, 3.2);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.4 });
    const board = new THREE.Mesh(boardGeo, boardMat);
    mbGroup.add(board);

    // CPU Socket
    const socketGeo = new THREE.BoxGeometry(1.0, 0.12, 1.0);
    const socketMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8, roughness: 0.2 });
    const socket = new THREE.Mesh(socketGeo, socketMat);
    socket.position.set(-0.6, 0.1, -0.6);
    mbGroup.add(socket);

    // RAM Slots (2 slots)
    for (let i = 0; i < 2; i++) {
      const slotGeo = new THREE.BoxGeometry(0.14, 0.16, 1.8);
      const slotMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
      const slot = new THREE.Mesh(slotGeo, slotMat);
      slot.position.set(0.4 + i * 0.35, 0.12, -0.4);
      mbGroup.add(slot);
    }

    // PCIe Slot (Graphics card)
    const pcieGeo = new THREE.BoxGeometry(2.0, 0.16, 0.16);
    const pcieMat = new THREE.MeshStandardMaterial({ color: 0xec4899 });
    const pcie = new THREE.Mesh(pcieGeo, pcieMat);
    pcie.position.set(-0.2, 0.12, 0.8);
    mbGroup.add(pcie);

    // Chipset Heatsink with fins
    const sinkGeo = new THREE.BoxGeometry(0.8, 0.35, 0.8);
    const sinkMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2 });
    const sink = new THREE.Mesh(sinkGeo, sinkMat);
    sink.position.set(0.6, 0.2, 0.6);
    mbGroup.add(sink);

    // Glowing circuit lines
    for (let i = 0; i < 6; i++) {
      const lineGeo = new THREE.BoxGeometry(0.04, 0.02, 1.2);
      const lineMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
      const line = new THREE.Mesh(lineGeo, lineMat);
      line.position.set(-0.1 + i * 0.08, 0.06, 0.1);
      mbGroup.add(line);
    }

    mbGroup.scale.set(1.1, 1.1, 1.1);
    parent.add(mbGroup);
  };

  // 6. Bus Data Highway
  const buildBusHighway = (parent: THREE.Group) => {
    setInfoTip("Voici les Bus de Données ! Des autoroutes ultra-rapides où voyagent les 0 et les 1 !");
    const busGroup = new THREE.Group();

    // Highway Road
    const roadGeo = new THREE.BoxGeometry(3.6, 0.1, 1.6);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    busGroup.add(road);

    // Highway lanes (Glowing neon strips)
    const laneColors = [0x38bdf8, 0x4ade80, 0xfacc15, 0xf472b6];
    for (let i = 0; i < 4; i++) {
      const laneGeo = new THREE.BoxGeometry(3.6, 0.04, 0.06);
      const laneMat = new THREE.MeshBasicMaterial({ color: laneColors[i] });
      const lane = new THREE.Mesh(laneGeo, laneMat);
      lane.position.set(0, 0.08, -0.6 + i * 0.4);
      busGroup.add(lane);

      // Data packets / Little information trucks
      for (let j = 0; j < 3; j++) {
        const packetGeo = new THREE.BoxGeometry(0.25, 0.15, 0.18);
        const packetMat = new THREE.MeshStandardMaterial({
          color: laneColors[i],
          emissive: laneColors[i],
          emissiveIntensity: 0.6,
        });
        const packet = new THREE.Mesh(packetGeo, packetMat);
        packet.position.set(-1.2 + j * 1.2, 0.16, -0.6 + i * 0.4);
        busGroup.add(packet);
      }
    }

    busGroup.scale.set(1.2, 1.2, 1.2);
    parent.add(busGroup);
  };

  // 7. Peripherals Collection
  const buildPeripheralsCollection = (parent: THREE.Group) => {
    setInfoTip("Voici les Périphériques : la Souris, le Clavier, la Clé USB et la Webcam pour communiquer avec la machine !");
    const pGroup = new THREE.Group();

    // 1. Mouse
    const mouseGeo = new THREE.SphereGeometry(0.35, 16, 16);
    mouseGeo.scale(1, 0.6, 1.4);
    const mouseMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.2 });
    const mouse = new THREE.Mesh(mouseGeo, mouseMat);
    mouse.position.set(-1.4, -0.2, 0.5);
    pGroup.add(mouse);

    // 2. USB Flash Drive
    const usbGeo = new THREE.BoxGeometry(0.4, 0.15, 1.0);
    const usbMat = new THREE.MeshStandardMaterial({ color: 0xec4899, metalness: 0.6 });
    const usb = new THREE.Mesh(usbGeo, usbMat);
    usb.position.set(1.4, -0.2, 0.6);
    pGroup.add(usb);

    const usbPlugGeo = new THREE.BoxGeometry(0.3, 0.1, 0.35);
    const usbPlugMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.95 });
    const usbPlug = new THREE.Mesh(usbPlugGeo, usbPlugMat);
    usbPlug.position.set(1.4, -0.2, 1.2);
    pGroup.add(usbPlug);

    // 3. Webcam on Stand
    const camBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.35, 0.08, 16),
      new THREE.MeshStandardMaterial({ color: 0x334155 })
    );
    camBase.position.set(0, -0.4, -0.8);
    pGroup.add(camBase);

    const camStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.7, 12),
      new THREE.MeshStandardMaterial({ color: 0x64748b })
    );
    camStem.position.set(0, 0, -0.8);
    pGroup.add(camStem);

    const camBall = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.2 })
    );
    camBall.position.set(0, 0.45, -0.8);
    pGroup.add(camBall);

    // Camera Lens
    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.1, 24),
      new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.9, roughness: 0.1 })
    );
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, 0.45, -0.5);
    pGroup.add(lens);

    pGroup.scale.set(1.1, 1.1, 1.1);
    parent.add(pGroup);
  };

  // 8. Software Hologram
  const buildSoftwareHologram = (parent: THREE.Group) => {
    setInfoTip("Voici la Partie Logicielle (L'Esprit) : une sphère d'énergie numérique avec la couronne de l'OS et les applications !");
    const softGroup = new THREE.Group();

    // Digital Core Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      roughness: 0.1,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    softGroup.add(sphere);

    // Glowing Inner Core
    const innerGeo = new THREE.SphereGeometry(0.7, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xc084fc });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    softGroup.add(inner);

    // Floating Application Badges (Icons)
    const appColors = [0x38bdf8, 0x4ade80, 0xfacc15, 0xf472b6, 0xf97316];
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const appGeo = new THREE.BoxGeometry(0.4, 0.4, 0.08);
      const appMat = new THREE.MeshStandardMaterial({
        color: appColors[i],
        roughness: 0.2,
      });
      const appMesh = new THREE.Mesh(appGeo, appMat);
      appMesh.position.set(Math.cos(angle) * 1.8, Math.sin(angle * 2) * 0.4, Math.sin(angle) * 1.8);
      appMesh.rotation.y = angle;
      softGroup.add(appMesh);
    }

    softGroup.scale.set(1.1, 1.1, 1.1);
    parent.add(softGroup);
  };

  // Reset view handler
  const handleResetView = () => {
    if (rootGroupRef.current) {
      rootGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border-4 border-slate-700/60 bg-slate-900 shadow-2xl">
      {/* Viewer Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-slate-900/90 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </span>
          <span className="font-bold text-white text-sm sm:text-base tracking-wide">
            Vue 3D Interactive : {title || 'Composant 3D'}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
              autoRotate ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300 hover:text-white'
            }`}
            title={autoRotate ? 'Arrêter la rotation' : 'Faire tourner automatiquement'}
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{autoRotate ? 'Pause' : 'Tourner'}</span>
          </button>

          <button
            onClick={handleResetView}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="Recentrer la vue"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-80 sm:h-96 cursor-grab active:cursor-grabbing select-none"
      />

      {/* Helper Banner at bottom */}
      <div className="absolute bottom-2 left-3 right-3 z-10 py-1.5 px-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs text-sky-300 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="text-base">👆</span>
          <span className="truncate">{infoTip}</span>
        </div>
        <span className="hidden md:inline text-slate-400 text-[11px] shrink-0 font-medium ml-2">
          Zoom : molette • Déplacer : clic glisser
        </span>
      </div>
    </div>
  );
};
