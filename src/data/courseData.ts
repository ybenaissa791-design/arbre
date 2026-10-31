export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseNode {
  id: string;
  title: string;
  shortTitle: string;
  emoji: string;
  badge: string;
  category: 'root' | 'software' | 'hardware';
  color: {
    bg: string;
    border: string;
    text: string;
    gradient: string;
    accent: string;
  };
  metaphor: {
    title: string;
    description: string;
    emoji: string;
  };
  intro: string;
  definition: string;
  role: string[];
  howItWorks: string;
  examples: {
    name: string;
    desc: string;
    emoji: string;
  }[];
  funFact: string;
  threeDType: 'computer' | 'cpu' | 'ram' | 'storage' | 'motherboard' | 'bus' | 'peripherals' | 'software' | 'os';
  gameType: 'peripherals-sorting' | 'cpu-simulation' | 'software-matching' | 'quiz';
  parentId: string | null;
  childrenIds: string[];
  quiz: QuizQuestion[];
}

export const COURSE_NODES: Record<string, CourseNode> = {
  // ==========================================
  // RACINE GÉANTE : L'ORDINATEUR
  // ==========================================
  'ordinateur': {
    id: 'ordinateur',
    title: "L'Ordinateur Magique",
    shortTitle: "L'Ordinateur",
    emoji: "🖥️",
    badge: "La Racine de Tout",
    category: 'root',
    color: {
      bg: "bg-emerald-50",
      border: "border-emerald-500",
      text: "text-emerald-700",
      gradient: "from-emerald-500 via-teal-500 to-green-500",
      accent: "#10b981",
    },
    metaphor: {
      title: "Comme un être humain !",
      description: "L'ordinateur est comme une personne : il a un corps physique que l'on peut toucher (le Matériel) et un esprit avec des pensées et des règles (le Logiciel). Sans l'un, l'autre ne peut rien faire !",
      emoji: "🧑‍💻",
    },
    intro: "Bonjour petit génie ! Sais-tu ce qu'est vraiment un ordinateur ? Ce n'est pas seulement un écran ou une boîte noire, c'est une formidable machine magique capable de t'aider à apprendre, dessiner, écouter de la musique et voyager dans le monde entier !",
    definition: "Un ordinateur est une machine électronique qui reçoit des informations, réfléchit très vite pour faire des calculs, et te donne le résultat en quelques fractions de seconde.",
    role: [
      "🎨 T'aider à dessiner de superbes œuvres d'art",
      "📝 T'aider à écrire des histoires et tes devoirs",
      "🌍 Te faire visiter le monde grâce à Internet",
      "🎮 Faire fonctionner tes jeux préférés",
      "📞 T'aider à discuter avec tes amis et tes grands-parents en vidéo",
    ],
    howItWorks: "Pour fonctionner, l'ordinateur a besoin de deux grandes familles inséparables : la partie MATÉRIELLE (Hardware) qui est son corps, et la partie LOGICIELLE (Software) qui est son esprit.",
    examples: [
      { name: "L'ordinateur fixe", desc: "La grande tour posée sous la table avec son écran et sa souris.", emoji: "🖥️" },
      { name: "L'ordinateur portable", desc: "Celui qu'on peut plier et emporter dans son sac à dos !", emoji: "💻" },
      { name: "La tablette tactile", desc: "Un ordinateur tout fin que l'on commande du bout des doigts.", emoji: "📱" },
    ],
    funFact: "Le tout premier ordinateur du monde pesait plus de 30 tonnes et prenait la place d'une grande salle de classe ! Aujourd'hui, un téléphone dans ta poche est des millions de fois plus puissant.",
    threeDType: 'computer',
    gameType: 'cpu-simulation',
    parentId: null,
    childrenIds: ['logiciel', 'materiel'],
    quiz: [
      {
        question: "De quoi a besoin un ordinateur pour fonctionner ?",
        options: ["Seulement d'un écran", "Du Matériel (le corps) et du Logiciel (l'esprit)", "D'une baguette magique"],
        correctIndex: 1,
        explanation: "Bravo ! L'ordinateur a besoin à la fois de son corps (matériel) et de son esprit (logiciel) pour être vivant !",
      },
      {
        question: "Un ordinateur portable est-il un vrai ordinateur ?",
        options: ["Oui, c'est un ordinateur miniature et pliable", "Non, c'est un livre", "Non, c'est un jouet en plastique"],
        correctIndex: 0,
        explanation: "Exactement ! Il contient tous les mêmes composants qu'un grand ordinateur de bureau, mais miniaturisés !",
      },
      {
        question: "Peut-on toucher un logiciel avec les doigts ?",
        options: ["Oui, avec une pince", "Non, c'est comme une idée ou une musique, c'est invisible !", "Oui, ça ressemble à du chewing-gum"],
        correctIndex: 1,
        explanation: "Super réponse ! Le logiciel est numérique : on le voit à l'écran, mais on ne peut pas le saisir avec les doigts !",
      },
    ],
  },

  // ==========================================
  // BRANCHE GAUCHE : PARTIE LOGICIELLE
  // ==========================================
  'logiciel': {
    id: 'logiciel',
    title: "La Partie Logicielle (Software)",
    shortTitle: "Partie Logicielle",
    emoji: "🧠",
    badge: "L'Esprit de l'Ordinateur",
    category: 'software',
    color: {
      bg: "bg-purple-50",
      border: "border-purple-500",
      text: "text-purple-700",
      gradient: "from-purple-500 via-indigo-500 to-pink-500",
      accent: "#a855f7",
    },
    metaphor: {
      title: "L'Esprit et les Pensées",
      description: "Le logiciel, c'est comme les langues que tu as apprises et les règles de tes jeux favoris. Tu ne peux pas les toucher avec tes mains, mais c'est grâce à elles que tu sais quoi faire !",
      emoji: "💭",
    },
    intro: "Imagine un piano magnifique : sans le musicien et sans la partition de musique, le piano reste totalement muet. La partie logicielle, c'est la musique et le musicien qui font chanter l'ordinateur !",
    definition: "Le logiciel (en anglais 'Software') est l'ensemble des programmes, des instructions et des codes secrets qui disent aux composants physiques quoi faire.",
    role: [
      "🗣️ Parler la langue de l'humain et la traduire en électricité pour la machine",
      "🧭 Organiser tous les fichiers, images et musiques",
      "🛡️ Protéger l'ordinateur contre les erreurs",
      "🎨 Te donner des pinceaux, des crayons et des boutons magiques sur l'écran",
    ],
    howItWorks: "Il existe deux grands types de logiciels : le Système d'Exploitation (le chef d'orchestre) et les Logiciels d'Application (les outils et jeux).",
    examples: [
      { name: "Le Système d'Exploitation", desc: "Le patron qui démarre tout (ex: Windows, Android).", emoji: "👑" },
      { name: "Les Jeux & Dessins", desc: "Les programmes avec lesquels tu t'amuses (ex: Paint, Scratch).", emoji: "🎮" },
      { name: "Le Navigateur", desc: "La porte pour voyager sur le Web (ex: Chrome, Firefox).", emoji: "🌐" },
    ],
    funFact: "Les logiciels sont écrits avec des codes appelés 'langages de programmation'. Un grand jeu vidéo peut contenir plus de 50 millions de lignes de code écrites par des centaines de programmeurs !",
    threeDType: 'software',
    gameType: 'software-matching',
    parentId: 'ordinateur',
    childrenIds: ['os', 'applications'],
    quiz: [
      {
        question: "Quelle est la meilleure comparaison pour le logiciel ?",
        options: ["Une boîte de carton", "L'esprit et les connaissances d'une personne", "Une prise de courant"],
        correctIndex: 1,
        explanation: "Gagné ! Le logiciel est invisible mais c'est lui qui apporte l'intelligence à la machine !",
      },
      {
        question: "Que se passe-t-il si un ordinateur n'a aucun logiciel installé ?",
        options: ["Il fonctionne encore mieux", "Il reste tout noir et ne sait rien faire", "Il se transforme en robot ménager"],
        correctIndex: 1,
        explanation: "Très bien ! Sans logiciel, les pièces électroniques n'ont aucun ordre à exécuter, l'écran reste noir !",
      },
      {
        question: "Comment appelle-t-on les personnes qui fabriquent des logiciels ?",
        options: ["Des astronautes", "Des programmeurs ou développeurs", "Des boulangers de données"],
        correctIndex: 1,
        explanation: "Exactement ! Les programmeurs écrivent le code magique qui donne vie aux logiciels !",
      },
    ],
  },

  // 1.1 Logiciel de base (OS)
  'os': {
    id: 'os',
    title: "Le Système d'Exploitation (OS)",
    shortTitle: "Système d'Exploitation (OS)",
    emoji: "👑",
    badge: "Le Chef d'Orchestre",
    category: 'software',
    color: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-700",
      gradient: "from-blue-500 via-indigo-600 to-cyan-500",
      accent: "#3b82f6",
    },
    metaphor: {
      title: "Le Grand Chef d'Orchestre",
      description: "Dans un orchestre, chaque musicien a un instrument différent (violon, tambour, flûte). Le Chef d'Orchestre bat la mesure pour que tout le monde joue en harmonie parfaite. L'OS fait pareil avec tous les composants !",
      emoji: "🎼",
    },
    intro: "Dès que tu appuies sur le bouton d'allumage de ton ordinateur ou de ta tablette, c'est lui qui se réveille le tout premier ! Sans lui, personne ne saurait quoi faire.",
    definition: "Le Système d'Exploitation (en anglais Operating System ou 'OS') est le logiciel de base indispensable. C'est le chef qui gère la mémoire, l'écran, le clavier et permet à toutes les autres applications de se lancer.",
    role: [
      "⏰ Réveiller tous les composants physiques au démarrage",
      "👆 Comprendre quand tu cliques avec la souris ou touches l'écran",
      "📁 Ranger tes fichiers dans des dossiers bien organisés",
      "🚦 Partager le temps du cerveau (CPU) entre toutes tes fenêtres ouvertes",
    ],
    howItWorks: "L'OS sert de pont entre toi, tes jeux, et les pièces en métal de l'ordinateur. Quand tu veux imprimer, tu cliques sur 'Imprimer' dans ton dessin, l'OS prend l'ordre et le murmure à l'imprimante dans sa langue secrète !",
    examples: [
      { name: "Windows", desc: "Le système le plus connu sur les ordinateurs de classe et de maison.", emoji: "🪟" },
      { name: "Android", desc: "Le système magique sur la plupart des téléphones et tablettes.", emoji: "🤖" },
      { name: "macOS & iOS", desc: "Les systèmes créés par la marque à la pomme (Apple).", emoji: "🍎" },
      { name: "Linux", desc: "Le système libre représenté par un petit pingouin tout mignon nommé Tux !", emoji: "🐧" },
    ],
    funFact: "Le pingouin mascotte de Linux s'appelle Tux ! Il a été choisi parce que son créateur s'est un jour fait gentiment pincer le doigt par un manchot dans un zoo !",
    threeDType: 'os',
    gameType: 'software-matching',
    parentId: 'logiciel',
    childrenIds: [],
    quiz: [
      {
        question: "Qui est le premier logiciel à se réveiller au démarrage ?",
        options: ["Un jeu vidéo", "Le Système d'Exploitation (OS)", "La calculatrice"],
        correctIndex: 1,
        explanation: "Bravo ! L'OS allume la maison et prépare le terrain pour tous les autres !",
      },
      {
        question: "Lequel de ces noms est un Système d'Exploitation pour téléphone ou tablette ?",
        options: ["Android", "Chocolat", "Bicyclette"],
        correctIndex: 0,
        explanation: "Super ! Android est le système d'exploitation de milliards de téléphones dans le monde !",
      },
      {
        question: "Quel animal rigolo est la mascotte du système Linux ?",
        options: ["Un écureuil", "Un pingouin nommé Tux", "Un dinosaure"],
        correctIndex: 1,
        explanation: "Oui ! C'est le pingouin Tux, le champion du monde des logiciels libres !",
      },
    ],
  },

  // 1.2 Logiciels d'application
  'applications': {
    id: 'applications',
    title: "Les Logiciels d'Application",
    shortTitle: "Logiciels d'Application",
    emoji: "🎨",
    badge: "Les Boîtes à Outils & Jeux",
    category: 'software',
    color: {
      bg: "bg-pink-50",
      border: "border-pink-500",
      text: "text-pink-700",
      gradient: "from-pink-500 via-rose-500 to-orange-400",
      accent: "#ec4899",
    },
    metaphor: {
      title: "La Boîte magique de crayons et jouets",
      description: "Si l'OS est la maison, les applications sont tous les jouets, pinceaux, cahiers de coloriage et jeux de société qui se trouvent dans ta chambre !",
      emoji: "🧰",
    },
    intro: "Chaque fois que tu dis 'Je veux dessiner !' ou 'Je veux écouter de la musique !', tu ouvres une application différente. Chaque application a un talent bien précis.",
    definition: "Un logiciel d'application (ou simplement une 'app') est un programme conçu pour t'aider à accomplir une tâche précise : dessiner, taper un texte, calculer, ou jouer à un jeu passionnant.",
    role: [
      "🎨 Dessiner et colorier de magnifiques images",
      "📝 Taper des textes, poésies et lettres pour la maîtresse",
      "🧮 Faire des calculs et résoudre des énigmes mathématiques",
      "🚀 Apprendre à programmer des petits robots et des histoires avec Scratch",
    ],
    howItWorks: "Une application demande la permission au Système d'Exploitation pour afficher ses images sur l'écran, jouer des sons dans les haut-parleurs et sauvegarder tes créations dans le disque dur.",
    examples: [
      { name: "Paint", desc: "Le carnet magique pour dessiner avec plein de couleurs.", emoji: "🖌️" },
      { name: "Scratch", desc: "Le jeu du petit chat pour apprendre à coder en assemblant des blocs !", emoji: "🐱" },
      { name: "Navigateur Web", desc: "Pour chercher des photos d'animaux ou regarder des documentaires.", emoji: "🧭" },
      { name: "Lecteur Audio / Vidéo", desc: "Pour écouter tes chansons préférées et regarder des dessins animés.", emoji: "🎵" },
    ],
    funFact: "Scratch a été inventé par des savants d'une université célèbre (le MIT) pour que les enfants de primaire puissent inventer leurs propres jeux vidéo comme de vrais développeurs !",
    threeDType: 'software',
    gameType: 'software-matching',
    parentId: 'logiciel',
    childrenIds: [],
    quiz: [
      {
        question: "Quelle application utilises-tu pour dessiner un beau chat multicolore ?",
        options: ["La calculatrice", "Paint ou un logiciel de dessin", "L'imprimante"],
        correctIndex: 1,
        explanation: "Bravo ! Paint est parfait pour exprimer tous tes talents d'artiste !",
      },
      {
        question: "À quoi sert l'application Scratch avec son petit chat roux ?",
        options: ["À faire cuire des crêpes", "À apprendre à coder et créer des histoires animées", "À nettoyer le clavier"],
        correctIndex: 1,
        explanation: "Génial ! Scratch permet aux élèves d'assembler des briques de code en s'amusant !",
      },
      {
        question: "Peut-on installer plusieurs applications différentes sur le même ordinateur ?",
        options: ["Oui, autant que la mémoire peut en contenir !", "Non, une seule pour toute la vie", "Seulement le dimanche"],
        correctIndex: 0,
        explanation: "Absolument ! Tu peux avoir des dizaines d'applications pour dessiner, écrire, apprendre et jouer !",
      },
    ],
  },

  // ==========================================
  // BRANCHE DROITE : PARTIE MATÉRIELLE
  // ==========================================
  'materiel': {
    id: 'materiel',
    title: "La Partie Matérielle (Hardware)",
    shortTitle: "Partie Matérielle",
    emoji: "🦾",
    badge: "Le Corps de l'Ordinateur",
    category: 'hardware',
    color: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-700",
      gradient: "from-cyan-500 via-blue-500 to-indigo-600",
      accent: "#0284c7",
    },
    metaphor: {
      title: "Le Corps, les Os et les Muscles",
      description: "Le matériel (Hardware), c'est tout ce que tu peux voir avec tes yeux et toucher avec tes mains : l'écran, les touches, la souris, les puces électroniques et les câbles !",
      emoji: "🔩",
    },
    intro: "Viens explorer le corps de la machine ! À l'intérieur de la boîte et autour d'elle se cachent des organes électroniques extraordinaires qui travaillent ensemble comme une équipe de super-héros.",
    definition: "Le matériel (en anglais 'Hardware') regroupe toutes les pièces physiques, mécaniques et électroniques de l'ordinateur. Le mot anglais commence par 'Hard' qui signifie 'dur', parce qu'on peut le toucher !",
    role: [
      "⚡ Recevoir l'énergie électrique pour faire battre le cœur de l'ordinateur",
      "🧠 Calculer à des vitesses vertigineuses",
      "💾 Garder tes données même quand tout est éteint",
      "👀 Te montrer des images merveilleuses et faire entendre du bon son",
    ],
    howItWorks: "La partie matérielle se divise en deux grandes familles : l'Unité Centrale (les organes vitaux internes) et les Périphériques (les organes des sens et d'action externes).",
    examples: [
      { name: "L'Unité Centrale", desc: "La boîte magique avec le cerveau, la mémoire et le cœur.", emoji: "📦" },
      { name: "Les Périphériques", desc: "Tout ce qu'on branche autour : souris, clavier, écran...", emoji: "🔌" },
    ],
    funFact: "Le mot 'Hardware' vient du mot anglais qui désigne la quincaillerie (les vis, clous et outils en métal). C'est pourquoi en français on dit tout simplement 'le matériel' !",
    threeDType: 'computer',
    gameType: 'peripherals-sorting',
    parentId: 'ordinateur',
    childrenIds: ['unite-centrale', 'peripheriques'],
    quiz: [
      {
        question: "Que signifie le mot 'Hardware' ?",
        options: ["Les vêtements de l'ordinateur", "La partie matérielle que l'on peut toucher", "Une marque de confiture"],
        correctIndex: 1,
        explanation: "Bravo ! Le Hardware, c'est tout le matériel physique : vis, circuits, touches et câbles !",
      },
      {
        question: "Quelles sont les deux grandes parties du matériel ?",
        options: ["Le haut et le bas", "L'Unité Centrale et les Périphériques", "Le sucre et le sel"],
        correctIndex: 1,
        explanation: "Exactement ! L'unité centrale au centre, et les périphériques branchés tout autour !",
      },
      {
        question: "Si tu touches le clavier avec tes doigts, touches-tu du matériel ou du logiciel ?",
        options: ["Du matériel", "Du logiciel", "Un fantôme"],
        correctIndex: 0,
        explanation: "Oui ! Le clavier est un objet solide en plastique que l'on touche, c'est du matériel pur !",
      },
    ],
  },

  // ------------------------------------------
  // SOUS-BRANCHE : L'UNITÉ CENTRALE
  // ------------------------------------------
  'unite-centrale': {
    id: 'unite-centrale',
    title: "L'Unité Centrale (Le Boîtier)",
    shortTitle: "L'Unité Centrale",
    emoji: "📦",
    badge: "Le Cœur du Corps",
    category: 'hardware',
    color: {
      bg: "bg-indigo-50",
      border: "border-indigo-500",
      text: "text-indigo-700",
      gradient: "from-indigo-600 via-purple-600 to-blue-600",
      accent: "#4f46e5",
    },
    metaphor: {
      title: "La Cabine de Pilotage d'une Fusée",
      description: "C'est la boîte protectrice dans laquelle dorment et travaillent tous les organes les plus précieux : le cerveau, la mémoire et le système d'alimentation !",
      emoji: "🚀",
    },
    intro: "Ne te fie pas à son allure de simple boîte en métal ou en plastique : à l'intérieur, c'est une véritable ville futuriste miniature avec ses autoroutes, ses usines à calculs et ses entrepôts !",
    definition: "L'Unité Centrale est le boîtier principal qui abrite les composants internes vitaux : le Processeur (CPU), la Mémoire Vive (RAM), la Carte Mère, le Disque de Stockage, et les Bus de communication.",
    role: [
      "🛡️ Protéger les circuits très délicats contre la poussière et les chocs",
      "🌬️ Faire circuler de l'air frais pour que les composants ne transpirent pas",
      "🔌 Fournir les prises pour brancher l'écran, la souris et le câble internet",
    ],
    howItWorks: "Quand tu allumes l'ordinateur, l'électricité entre dans l'unité centrale, fait tourner les ventilateurs, et réveille chaque composant logé sur la grande carte mère.",
    examples: [
      { name: "La Grande Tour", desc: "Posée sur ou sous le bureau, avec parfois des lumières colorées !", emoji: "🗼" },
      { name: "Le Boîtier d'un PC portable", desc: "La partie plate sous le clavier qui cache les mêmes merveilles.", emoji: "💻" },
    ],
    funFact: "Certains joueurs d'ordinateurs passionnés mettent de l'eau avec des tuyaux colorés (comme une piscine miniature !) pour refroidir leur unité centrale. Cela s'appelle le Watercooling !",
    threeDType: 'computer',
    gameType: 'cpu-simulation',
    parentId: 'materiel',
    childrenIds: ['cpu', 'ram', 'stockage', 'carte-mere', 'bus', 'alimentation'],
    quiz: [
      {
        question: "Qu'y a-t-il à l'intérieur de l'unité centrale ?",
        options: ["Des bonbons", "Les composants vitaux : CPU, RAM, Carte Mère, Disque", "Un petit hamster qui court dans une roue"],
        correctIndex: 1,
        explanation: "Bravo ! C'est là que se trouvent les organes vitaux de la machine !",
      },
      {
        question: "Pourquoi y a-t-il des ventilateurs dans l'unité centrale ?",
        options: ["Pour faire de la musique", "Pour souffler de l'air frais et éviter que les pièces chauffent trop", "Pour sécher les cheveux"],
        correctIndex: 1,
        explanation: "Exactement ! En travaillant très vite, les puces chauffent, elles adorent l'air frais !",
      },
      {
        question: "Dans un ordinateur portable, où est l'unité centrale ?",
        options: ["Dans l'écran", "Juste sous le clavier", "Elle n'existe pas"],
        correctIndex: 1,
        explanation: "Super ! Elle est bien cachée et aplatie juste sous les touches du clavier !",
      },
    ],
  },

  // 1.1 CPU / Processeur
  'cpu': {
    id: 'cpu',
    title: "Le Processeur (CPU)",
    shortTitle: "Le Processeur (CPU)",
    emoji: "⚡",
    badge: "Le Super-Cerveau",
    category: 'hardware',
    color: {
      bg: "bg-amber-50",
      border: "border-amber-500",
      text: "text-amber-700",
      gradient: "from-amber-500 via-yellow-500 to-orange-500",
      accent: "#f59e0b",
    },
    metaphor: {
      title: "Le Cerveau Éclair",
      description: "Le processeur est le cerveau géant de l'ordinateur ! Il sait faire des milliards d'additions et de réflexions en une seule seconde sans jamais se fatiguer !",
      emoji: "🧠⚡",
    },
    intro: "Si l'ordinateur était un champion de calcul mental, le processeur gagnerait la médaille d'or de l'univers à chaque seconde !",
    definition: "Le Processeur (ou CPU, pour 'Central Processing Unit') est une toute petite puce carrée en silicium qui exécute les ordres des programmes et effectue tous les calculs mathématiques et logiques.",
    role: [
      "🧮 Calculer à la vitesse de l'éclair (milliards de calculs par seconde)",
      "🎯 Prendre les décisions : 'si le joueur appuie sur Espace, alors faire sauter le personnage !'",
      "🕹️ Donner le tempo à toute la machine",
    ],
    howItWorks: "Il prend une consigne depuis la mémoire vive, la décode, fait le calcul, et renvoie la réponse. Sa vitesse se mesure en Gigahertz (GHz) : 3 GHz signifie qu'il peut faire 3 milliards d'opérations par seconde !",
    examples: [
      { name: "Intel Core (i3, i5, i7)", desc: "Des processeurs très répandus dans les ordinateurs.", emoji: "🟦" },
      { name: "AMD Ryzen", desc: "D'autres processeurs très rapides adorés pour les jeux.", emoji: "🟧" },
      { name: "Apple Silicon (M1, M2, M3)", desc: "Les puces surpuissantes des ordinateurs Apple.", emoji: "🍏" },
    ],
    funFact: "À l'intérieur d'un processeur qui fait la taille d'un timbre postal, il y a plus de 10 milliards de minuscules interrupteurs appelés transistors ! C'est tellement petit qu'il faudrait un microscope géant pour les voir !",
    threeDType: 'cpu',
    gameType: 'cpu-simulation',
    parentId: 'unite-centrale',
    childrenIds: [],
    quiz: [
      {
        question: "Quel organe du corps humain ressemble le plus au Processeur ?",
        options: ["Le pied", "Le cerveau", "L'estomac"],
        correctIndex: 1,
        explanation: "Bravo ! Le processeur réfléchit et calcule tout, exactement comme notre cerveau !",
      },
      {
        question: "Combien d'opérations par seconde un processeur moderne peut-il faire ?",
        options: ["Environ 10 calculs", "Quelques centaines", "Plusieurs milliards de calculs !"],
        correctIndex: 2,
        explanation: "Incroyable mais vrai ! Plusieurs milliards d'opérations chaque seconde !",
      },
      {
        question: "Quelle est la taille réelle d'une puce de processeur ?",
        options: ["La taille d'une voiture", "La taille d'un timbre postal", "La taille d'une maison"],
        correctIndex: 1,
        explanation: "Oui ! C'est tout petit comme un carré de chocolat ou un timbre, mais hyper puissant !",
      },
    ],
  },

  // 1.2 RAM / Mémoire Vive
  'ram': {
    id: 'ram',
    title: "La Mémoire Vive (RAM)",
    shortTitle: "La Mémoire Vive (RAM)",
    emoji: "⚡📝",
    badge: "La Table de Travail Magique",
    category: 'hardware',
    color: {
      bg: "bg-emerald-50",
      border: "border-emerald-500",
      text: "text-emerald-700",
      gradient: "from-emerald-500 via-green-500 to-teal-600",
      accent: "#10b981",
    },
    metaphor: {
      title: "La Table de Travail de ton Bureau",
      description: "Quand tu fais tes devoirs, tu poses sur ta table ta trousse, ton cahier et ta règle. Plus ta table est grande, plus tu peux poser de choses en même temps ! Mais le soir, on range tout et la table redevient vide !",
      emoji: "🪑",
    },
    intro: "Le processeur a besoin de travailler très vite. Pour ne pas perdre de temps à chercher ses dossiers au fond d'une armoire, il pose tout sur sa table magique : la RAM !",
    definition: "La RAM (Random Access Memory, ou Mémoire Vive) est la mémoire à court terme ultra-rapide. Elle garde les applications et les documents ouverts pendant que tu les utilises. Quand on éteint l'ordinateur, tout s'efface !",
    role: [
      "⚡ Donner au processeur les informations à la vitesse de la lumière",
      "🏃‍♂️ Permettre d'avoir plusieurs fenêtres ouvertes en même temps (jeu + musique + dessin)",
      "🧹 Se vider automatiquement dès qu'on ferme une application",
    ],
    howItWorks: "Quand tu cliques sur un jeu, il est copié depuis le disque dur vers la RAM. Le processeur pioche directement dedans sans attendre !",
    examples: [
      { name: "Barrette de 8 Go", desc: "Une bonne table de travail pour naviguer et regarder des vidéos.", emoji: "🟩" },
      { name: "Barrette de 16 Go ou 32 Go", desc: "Une immense table de travail pour les grands jeux 3D et le montage vidéo !", emoji: "🚀" },
    ],
    funFact: "On dit que la RAM est une mémoire 'volatile' : comme un petit oiseau qui s'envole, dès que le courant électrique est coupé, toutes ses données disparaissent instantanément ! C'est pour ça qu'il faut toujours enregistrer ses devoirs !",
    threeDType: 'ram',
    gameType: 'cpu-simulation',
    parentId: 'unite-centrale',
    childrenIds: [],
    quiz: [
      {
        question: "Que se passe-t-il dans la RAM quand on éteint complètement l'ordinateur ?",
        options: ["Tout reste dedans pour toujours", "Tout s'efface car la mémoire a besoin de courant", "Elle se met à sonner comme un réveil"],
        correctIndex: 1,
        explanation: "Bravo ! La RAM est volatile : sans électricité, son ardoise redevient toute blanche !",
      },
      {
        question: "À quoi ressemble la RAM ?",
        options: ["À une table de travail où l'on pose ses cahiers ouverts", "À une boîte de craies", "À un parapluie"],
        correctIndex: 0,
        explanation: "Super métaphore ! Plus la table est large, plus l'ordinateur peut ouvrir d'applications sans ralentir !",
      },
      {
        question: "Pourquoi dit-on qu'il faut enregistrer son travail avant d'éteindre ?",
        options: ["Pour que le dessin passe de la RAM au Disque Dur permanent", "Pour faire plaisir à l'écran", "Pour changer la couleur de la souris"],
        correctIndex: 0,
        explanation: "Exactement ! Enregistrer envoie le fichier de la RAM vers le stockage permanent !",
      },
    ],
  },

  // 1.3 Stockage / Disque Dur & SSD
  'stockage': {
    id: 'stockage',
    title: "Le Stockage (Disque Dur & SSD)",
    shortTitle: "Le Disque (Stockage)",
    emoji: "🗄️",
    badge: "L'Armoire à Souvenirs Permanente",
    category: 'hardware',
    color: {
      bg: "bg-cyan-50",
      border: "border-cyan-500",
      text: "text-cyan-700",
      gradient: "from-cyan-600 via-blue-600 to-indigo-700",
      accent: "#0891b2",
    },
    metaphor: {
      title: "L'Armoire à Jouets Géante",
      description: "C'est la grande armoire fermée de ta chambre où tu ranges tes livres préférés, tes albums photos et tes boîtes de jeux. Même si tu dors ou pars en vacances, tout reste bien au chaud pour des années !",
      emoji: "📚",
    },
    intro: "Où vont tes photos de vacances et tes dessins quand tu éteins la machine le soir ? Ils dorment paisiblement dans le disque de stockage !",
    definition: "Le Disque Dur (HDD) ou le Disque SSD est la mémoire permanente (non-volatile) de l'ordinateur. C'est ici que sont rangés Windows, tes jeux, tes musiques et tes photos pour toujours.",
    role: [
      "💾 Garder tes fichiers pour toujours, même sans électricité",
      "📦 Ranger des milliers de photos et des dizaines de jeux",
      "🚪 Prêter ses fichiers à la RAM chaque fois que tu en as besoin",
    ],
    howItWorks: "Il existe les vieux disques durs mécaniques avec un disque métallique qui tourne très vite, et les nouveaux SSD (Solid State Drive) qui sont comme des super cartes mémoire sans aucune pièce qui bouge, 10 fois plus rapides !",
    examples: [
      { name: "Le Disque Dur (HDD)", desc: "Avec un petit disque qui tourne comme un tourne-disque miniature !", emoji: "💿" },
      { name: "Le Disque SSD", desc: "Silencieux et ultra-rapide comme une fusée moderne.", emoji: "⚡" },
    ],
    funFact: "Un petit disque SSD moderne de la taille d'une gomme à effacer peut stocker plus d'un million de photos souvenirs ! Autrefois, pour garder autant de photos sur papier, il aurait fallu un camion entier !",
    threeDType: 'storage',
    gameType: 'cpu-simulation',
    parentId: 'unite-centrale',
    childrenIds: [],
    quiz: [
      {
        question: "Où sont rangées tes photos quand l'ordinateur est complètement éteint ?",
        options: ["Dans la souris", "Dans le Disque Dur ou le SSD", "Dans le fil électrique"],
        correctIndex: 1,
        explanation: "Bravo ! Le stockage permanent conserve tous tes fichiers même sans courant !",
      },
      {
        question: "Entre le vieux Disque Dur (HDD) et le SSD moderne, lequel est le plus rapide ?",
        options: ["Le SSD, il démarre l'ordinateur en quelques secondes !", "Le disque en carton", "Ils ont la même vitesse qu'un escargot"],
        correctIndex: 0,
        explanation: "Gagné ! Le SSD est comme une fusée comparé aux anciens disques mécaniques !",
      },
      {
        question: "Quelle métaphore correspond au stockage permanent ?",
        options: ["La table de travail", "L'armoire où l'on range ses souvenirs", "Le robinet d'eau"],
        correctIndex: 1,
        explanation: "Exactement ! C'est la grande armoire magique de la chambre !",
      },
    ],
  },

  // 1.4 Carte Mère
  'carte-mere': {
    id: 'carte-mere',
    title: "La Carte Mère (Motherboard)",
    shortTitle: "La Carte Mère",
    emoji: "🟩",
    badge: "Le Squelette & Système Nerveux",
    category: 'hardware',
    color: {
      bg: "bg-teal-50",
      border: "border-teal-500",
      text: "text-teal-700",
      gradient: "from-teal-600 via-emerald-600 to-green-700",
      accent: "#0d9488",
    },
    metaphor: {
      title: "La Maman protectrice et le Squelette",
      description: "On l'appelle 'Carte Mère' parce qu'elle porte tous les composants comme une maman qui tient ses enfants par la main ! Elle est le grand squelette et le système nerveux qui relie tout le monde !",
      emoji: "🤱🦴",
    },
    intro: "Regarde ce grand circuit imprimé vert ou noir qui tapisse le fond du boîtier : c'est elle qui réunit toute la famille des composants !",
    definition: "La Carte Mère est la plus grande plaque électronique de l'ordinateur. C'est sur elle que l'on vient clipser le Processeur, la RAM, la Carte Graphique et les câbles vers le stockage.",
    role: [
      "🤝 Faire discuter tous les composants entre eux",
      "⚡ Distribuer le courant électrique aux bons endroits",
      "📍 Accueillir les prises arrière (USB, son, écran, câble réseau)",
    ],
    howItWorks: "Elle est gravée de milliers de fines pistes en cuivre dorées ou argentées appelées les 'Bus'. C'est par là que les signaux électriques voyagent d'un composant à un autre.",
    examples: [
      { name: "Le Socket", desc: "Le petit nid douillet où l'on pose le processeur.", emoji: "🔲" },
      { name: "Les Slots RAM", desc: "Les longs rails où l'on enfonce les barrettes de mémoire.", emoji: "📏" },
      { name: "Les Ports USB", desc: "Les fenêtres pour brancher ta souris et ta clé USB.", emoji: "🔌" },
    ],
    funFact: "Si on mettait bout à bout toutes les petites pistes en cuivre gravées sur une carte mère moderne, elles mesureraient plusieurs centaines de mètres de long !",
    threeDType: 'motherboard',
    gameType: 'cpu-simulation',
    parentId: 'unite-centrale',
    childrenIds: [],
    quiz: [
      {
        question: "Pourquoi s'appelle-t-elle la 'Carte Mère' ?",
        options: ["Parce qu'elle cuisine des gâteaux", "Parce qu'elle accueille et relie tous les composants ensemble", "Parce qu'elle est née un dimanche"],
        correctIndex: 1,
        explanation: "Bravo ! Elle est la maman de tous les composants électroniques qui s'y branchent !",
      },
      {
        question: "Que trouve-t-on gravé à sa surface ?",
        options: ["Des milliers de petites pistes en cuivre pour faire passer les informations", "De la peinture à l'eau", "Des poèmes"],
        correctIndex: 0,
        explanation: "Super ! Ces lignes en cuivre sont les autoroutes des données de l'ordinateur !",
      },
      {
        question: "Peut-on brancher le processeur directement sans carte mère ?",
        options: ["Oui avec du scotch", "Non, il a absolument besoin de son nid sur la carte mère", "Seulement s'il fait beau"],
        correctIndex: 1,
        explanation: "Exactement ! La carte mère est indispensable pour tenir et connecter le processeur !",
      },
    ],
  },

  // 1.5 Les Bus
  'bus': {
    id: 'bus',
    title: "Les Bus Informatiques",
    shortTitle: "Les Bus de Données",
    emoji: "🚌⚡",
    badge: "Les Autoroutes de l'Information",
    category: 'hardware',
    color: {
      bg: "bg-amber-50",
      border: "border-amber-500",
      text: "text-amber-700",
      gradient: "from-amber-600 via-orange-500 to-yellow-500",
      accent: "#d97706",
    },
    metaphor: {
      title: "Les Autoroutes des Petits Lutins de Données",
      description: "Ce n'est pas un bus jaune avec des roues sur la route d'école, mais une autoroute électrique miniature où des milliards de petits lutins transportent des paquets de 0 et de 1 à la vitesse de la lumière !",
      emoji: "🛣️",
    },
    intro: "Comment le processeur envoie-t-il son dessin à l'écran ? Par quel chemin les clics de ta souris arrivent-ils au cerveau de la machine ? Par les Bus !",
    definition: "Un Bus informatique est un ensemble de pistes conductrices ou de câbles qui transportent les données, les adresses et les signaux de commande entre deux composants de l'ordinateur.",
    role: [
      "🚚 Transporter les paquets d'informations d'un composant à l'autre",
      "🚦 Coordonner la circulation pour qu'il n'y ait jamais d'accident de données",
      "⚡ Assurer des transferts ultra-rapides sans bouchons !",
    ],
    howItWorks: "Un bus a une 'largeur' (par exemple 64 voies comme une autoroute à 64 files) et une vitesse (fréquence). Plus il a de voies, plus de lutins peuvent rouler en même temps côte à côte !",
    examples: [
      { name: "Le Bus Système (Front Side Bus / PCIe)", desc: "L'autoroute à très grande vitesse entre le CPU et la RAM.", emoji: "🏎️" },
      { name: "Le Bus USB", desc: "Le bus universel qui relie ta souris, ton clavier et ta manette.", emoji: "🔌" },
    ],
    funFact: "Le mot USB signifie 'Universal Serial Bus' : en français, cela veut dire 'Bus Série Universel'. C'est le bus le plus célèbre et le plus utilisé sur toute la planète Terre !",
    threeDType: 'bus',
    gameType: 'cpu-simulation',
    parentId: 'unite-centrale',
    childrenIds: [],
    quiz: [
      {
        question: "À quoi sert un bus dans un ordinateur ?",
        options: ["À emmener les élèves à la piscine", "À transporter les données entre les composants comme une autoroute", "À nettoyer les ventilateurs"],
        correctIndex: 1,
        explanation: "Bravo ! Les bus informatiques sont les voies de circulation des données !",
      },
      {
        question: "Que signifie la lettre 'B' dans le mot 'USB' ?",
        options: ["Bateau", "Bus", "Banane"],
        correctIndex: 1,
        explanation: "Oui ! USB signifie Universal Serial Bus (Bus Série Universel) !",
      },
      {
        question: "Si une autoroute de bus a 64 voies au lieu de 32, que se passe-t-il ?",
        options: ["Elle transporte 2 fois plus d'informations en même temps !", "Elle tombe en panne", "Elle change de couleur"],
        correctIndex: 0,
        explanation: "Exactement ! Plus il y a de voies, plus les données roulent rapidement sans bouchon !",
      },
    ],
  },

  // 1.6 Alimentation & Refroidissement
  'alimentation': {
    id: 'alimentation',
    title: "L'Alimentation & Le Refroidissement",
    shortTitle: "Alimentation & Ventilateurs",
    emoji: "⚡🌬️",
    badge: "L'Énergie & Le Souffle Frais",
    category: 'hardware',
    color: {
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-700",
      gradient: "from-red-500 via-orange-500 to-amber-500",
      accent: "#ef4444",
    },
    metaphor: {
      title: "Le Cœur qui donne l'énergie et la Gourde d'eau fraîche",
      description: "L'alimentation est comme le cœur et le goûter qui apporte toute l'énergie vitale. Et le ventilateur est la gourde d'eau fraîche qui souffle sur les sportifs pendant la course pour ne pas surchauffer !",
      emoji: "🧃💨",
    },
    intro: "Sans électricité, l'ordinateur le plus puissant du monde ne serait qu'un tas de plastique endormi. Et sans air frais, ses composants auraient beaucoup trop chaud !",
    definition: "Le Bloc d'Alimentation transforme le courant électrique fort de la prise murale (230 Volts) en petit courant doux (12V, 5V, 3.3V) dont ont besoin les puces. Les ventilateurs et radiateurs évacuent la chaleur.",
    role: [
      "🔌 Nourrir en électricité propre chaque pièce de la machine",
      "🛡️ Protéger contre les orages et surtensions électriques",
      "🌪️ Souffler de l'air frais en continu sur le processeur et la carte graphique",
    ],
    howItWorks: "Le ventilateur tourne grâce à un petit moteur électrique et aspire l'air chaud vers l'extérieur du boîtier tout en faisant entrer de l'air frais.",
    examples: [
      { name: "Le Bloc d'Alimentation", desc: "La boîte métallique avec la grosse prise secteur à l'arrière.", emoji: "🔌" },
      { name: "Le Ventilateur du Processeur", desc: "Un ventilateur fixé sur un radiateur en aluminium à lamelles.", emoji: "🌀" },
      { name: "La Batterie de l'ordinateur portable", desc: "La réserve d'énergie rechargeable pour l'utiliser sans fil.", emoji: "🔋" },
    ],
    funFact: "Sans son radiateur et son ventilateur, un processeur moderne en plein calcul pourrait monter à plus de 100°C en moins de 3 secondes, soit la température de l'eau qui bout dans une casserole !",
    threeDType: 'computer',
    gameType: 'cpu-simulation',
    parentId: 'unite-centrale',
    childrenIds: [],
    quiz: [
      {
        question: "À quoi sert le bloc d'alimentation ?",
        options: ["À donner des gâteaux à l'ordinateur", "À transformer l'électricité de la prise pour nourrir les composants", "À imprimer des feuilles"],
        correctIndex: 1,
        explanation: "Bravo ! L'alimentation apporte l'énergie électrique indispensable à toutes les puces !",
      },
      {
        question: "Pourquoi entend-on parfois un léger souffle dans l'ordinateur ?",
        options: ["C'est le ventilateur qui souffle pour refroidir la machine", "C'est l'ordinateur qui dort et ronfle", "C'est le vent de la fenêtre"],
        correctIndex: 0,
        explanation: "Oui ! C'est le ventilateur qui tourne pour chasser l'air chaud !",
      },
      {
        question: "Comment un ordinateur portable fonctionne-t-il dans le train sans prise ?",
        options: ["Grâce à sa batterie rechargeable", "Grâce à des piles de lampe torche", "Par télépathie"],
        correctIndex: 0,
        explanation: "Super ! Sa batterie stocke l'électricité pour lui donner plusieurs heures d'autonomie !",
      },
    ],
  },

  // ------------------------------------------
  // SOUS-BRANCHE : LES PÉRIPHÉRIQUES
  // ------------------------------------------
  'peripheriques': {
    id: 'peripheriques',
    title: "Les Périphériques",
    shortTitle: "Les Périphériques",
    emoji: "🔌🖱️",
    badge: "Les Organes des Sens & d'Action",
    category: 'hardware',
    color: {
      bg: "bg-orange-50",
      border: "border-orange-500",
      text: "text-orange-700",
      gradient: "from-orange-500 via-amber-500 to-rose-500",
      accent: "#f97316",
    },
    metaphor: {
      title: "Les Yeux, les Oreilles, la Voix et les Mains",
      description: "Pour que tu puisses parler à l'ordinateur et qu'il puisse te répondre, il a besoin d'organes sensoriels : les périphériques sont ses yeux (webcam), ses oreilles (micro), ses mains (souris/clavier) et sa voix (haut-parleurs) !",
      emoji: "👀👂👄",
    },
    intro: "Autour de l'ordinateur se trouvent tous les appareils géniaux avec lesquels tes doigts, tes yeux et ta voix interagissent !",
    definition: "Un périphérique est tout matériel qui se branche à l'unité centrale pour échanger des informations : pour entrer des données (Entrée), afficher des résultats (Sortie), ou stocker et communiquer.",
    role: [
      "📥 Faire entrer tes idées, tes textes et tes clics dans la machine",
      "📤 Te montrer les images en couleurs et faire sortir les sons",
      "💾 Voyager avec tes fichiers d'une maison à l'autre",
    ],
    howItWorks: "Chaque périphérique possède une petite puce qui communique avec le système d'exploitation grâce à un petit programme spécial appelé un 'pilote' (driver).",
    examples: [
      { name: "Périphériques d'Entrée", desc: "Souris, Clavier, Webcam, Microphone, Scanner...", emoji: "📥" },
      { name: "Périphériques de Sortie", desc: "Écran, Imprimante, Enceintes, Casque audio...", emoji: "📤" },
      { name: "Stockage & Communication", desc: "Clé USB, Disque externe, Carte Wi-Fi...", emoji: "💾" },
    ],
    funFact: "La toute première souris d'ordinateur a été taillée dans un bloc de vrai bois avec deux petites roues en métal sous le ventre et un seul bouton rouge !",
    threeDType: 'peripherals',
    gameType: 'peripherals-sorting',
    parentId: 'materiel',
    childrenIds: ['entree', 'sortie', 'stockage-comm'],
    quiz: [
      {
        question: "D'où vient le mot 'Périphérique' ?",
        options: ["D'un mot qui veut dire 'au bord / autour'", "D'une recette de cuisine", "Du nom d'un célèbre pirate"],
        correctIndex: 0,
        explanation: "Bravo ! Les périphériques sont placés autour de l'unité centrale !",
      },
      {
        question: "En quelle matière était faite la toute première souris d'ordinateur ?",
        options: ["En fromage", "En bois taillé !", "En or massif"],
        correctIndex: 1,
        explanation: "Incroyable mais vrai ! Elle était fabriquée en bois par son inventeur Douglas Engelbart !",
      },
      {
        question: "Quelles sont les 3 grandes familles de périphériques ?",
        options: ["Rouge, Vert, Bleu", "Entrée, Sortie, Stockage/Communication", "Petit, Moyen, Grand"],
        correctIndex: 1,
        explanation: "Exactement ! Les entrées pour donner, les sorties pour recevoir, et le stockage/communication pour garder et voyager !",
      },
    ],
  },

  // 2.1 Périphériques d'Entrée
  'entree': {
    id: 'entree',
    title: "Les Périphériques d'Entrée",
    shortTitle: "Périphériques d'Entrée",
    emoji: "📥🖱️",
    badge: "Les Sens qui Reçoivent",
    category: 'hardware',
    color: {
      bg: "bg-sky-50",
      border: "border-sky-500",
      text: "text-sky-700",
      gradient: "from-sky-500 via-blue-500 to-indigo-500",
      accent: "#0ea5e9",
    },
    metaphor: {
      title: "Les Yeux, les Oreilles et le Toucher",
      description: "Ce sont les capteurs qui envoient des ordres et des informations DE L'EXTÉRIEUR VERS L'INTÉRIEUR de la machine, comme tes yeux qui lisent un livre et envoient l'image à ton cerveau !",
      emoji: "📥👁️",
    },
    intro: "Sans périphérique d'entrée, impossible de jouer ou de taper son prénom : l'ordinateur n'aurait aucun moyen de savoir ce que tu as dans la tête !",
    definition: "Un périphérique d'entrée permet à l'utilisateur d'envoyer des informations, des ordres, du texte, des images ou des sons à l'unité centrale de l'ordinateur.",
    role: [
      "🔤 Écrire des lettres et des chiffres avec les touches",
      "👆 Montrer un endroit avec la flèche et cliquer pour choisir",
      "🎤 Enregistrer ta voix ou le chant d'un oiseau",
      "📷 Prendre ta photo en direct pour la classe virtuelle",
    ],
    howItWorks: "Chaque fois que tu appuies sur la touche 'A' du clavier, un petit interrupteur se ferme et envoie un code électrique (01000001) que le processeur comprend immédiatement comme la lettre A !",
    examples: [
      { name: "Le Clavier", desc: "Pour taper des histoires, des chiffres et des mots de passe.", emoji: "⌨️" },
      { name: "La Souris", desc: "Pour déplacer le curseur et cliquer sur les boutons.", emoji: "🖱️" },
      { name: "La Webcam", desc: "L'œil vidéo qui filme ton visage en direct.", emoji: "📹" },
      { name: "Le Microphone", desc: "L'oreille qui écoute ta voix et tes chansons.", emoji: "🎙️" },
      { name: "La Manette de jeu", desc: "Avec ses joysticks et boutons pour faire courir ton héros !", emoji: "🎮" },
      { name: "Le Scanner", desc: "L'appareil qui numérise tes dessins sur papier pour les mettre sur l'ordinateur.", emoji: "📠" },
    ],
    funFact: "L'ordre des lettres sur ton clavier (AZERTY en France) a été inventé à l'époque des machines à écrire mécaniques pour éviter que les petites tiges de métal ne se coincent entre elles !",
    threeDType: 'peripherals',
    gameType: 'peripherals-sorting',
    parentId: 'peripheriques',
    childrenIds: [],
    quiz: [
      {
        question: "La souris est-elle un périphérique d'entrée ou de sortie ?",
        options: ["D'entrée, car elle donne des ordres vers l'ordinateur !", "De sortie, car elle chante", "De repos"],
        correctIndex: 0,
        explanation: "Bravo ! En cliquant, tu fais 'entrer' tes mouvements dans la machine !",
      },
      {
        question: "Quel périphérique permet d'enregistrer ta voix pour chanter une chanson ?",
        options: ["Le microphone", "L'écran", "L'imprimante"],
        correctIndex: 0,
        explanation: "Super ! Le microphone est l'oreille qui capte les sons de l'extérieur !",
      },
      {
        question: "La webcam est comme quel organe du corps humain ?",
        options: ["La bouche", "Les yeux", "Les orteils"],
        correctIndex: 1,
        explanation: "Exactement ! Elle voit le monde et transmet les images à l'ordinateur !",
      },
    ],
  },

  // 2.2 Périphériques de Sortie
  'sortie': {
    id: 'sortie',
    title: "Les Périphériques de Sortie",
    shortTitle: "Périphériques de Sortie",
    emoji: "📤🖥️",
    badge: "La Voix & Les Tableaux d'Affichage",
    category: 'hardware',
    color: {
      bg: "bg-rose-50",
      border: "border-rose-500",
      text: "text-rose-700",
      gradient: "from-rose-500 via-pink-500 to-red-500",
      accent: "#f43f5e",
    },
    metaphor: {
      title: "La Bouche qui parle et le Tableau magique",
      description: "Ce sont les organes qui transmettent les résultats DE L'INTÉRIEUR VERS L'EXTÉRIEUR : l'écran te montre ce qu'il pense, et les haut-parleurs font entendre sa voix !",
      emoji: "📤🗣️",
    },
    intro: "Quand l'ordinateur a fini de faire ses calculs ou son dessin, comment te montre-t-il le résultat ? Grâce aux périphériques de sortie !",
    definition: "Un périphérique de sortie permet à l'ordinateur de restituer les informations traitées à l'utilisateur, sous forme d'images lumineuses, de feuilles imprimées ou de sons musicaux.",
    role: [
      "📺 Afficher des millions de couleurs lumineuses en direct",
      "📄 Imprimer tes poèmes et dessins sur une vraie feuille de papier",
      "🔊 Jouer la musique, les bruitages et les voix de tes dessins animés",
    ],
    howItWorks: "L'écran est composé de millions de minuscules points appelés 'pixels' (Rouge, Vert, Bleu). En allumant ces points avec des intensités différentes, il dessine n'importe quelle image !",
    examples: [
      { name: "L'Écran (Moniteur)", desc: "La grande vitre magique qui affiche les images et le bureau.", emoji: "🖥️" },
      { name: "L'Imprimante", desc: "La machine qui dépose des petites gouttes d'encre sur une feuille blanche.", emoji: "🖨️" },
      { name: "Les Haut-parleurs", desc: "Les boîtes qui font vibrer l'air pour créer de la musique.", emoji: "🔊" },
      { name: "Le Casque audio", desc: "Pour écouter ta leçon ou ta musique sans déranger les autres.", emoji: "🎧" },
      { name: "Le Vidéoprojecteur", desc: "Pour projeter le cours de la maîtresse en géant sur le mur !", emoji: "📽️" },
    ],
    funFact: "Un écran standard contient plus de 2 millions de petits carrés lumineux appelés pixels. Ils clignotent plus de 60 fois par seconde, tellement vite que tes yeux voient une vidéo parfaitement fluide !",
    threeDType: 'peripherals',
    gameType: 'peripherals-sorting',
    parentId: 'peripheriques',
    childrenIds: [],
    quiz: [
      {
        question: "L'écran est-il un périphérique d'entrée ou de sortie ?",
        options: ["De sortie, car il fait SORTIR l'image pour que nos yeux la voient !", "D'entrée", "Ni l'un ni l'autre"],
        correctIndex: 0,
        explanation: "Bravo ! L'écran fait sortir l'information sous forme de lumière pour nos yeux !",
      },
      {
        question: "Comment s'appellent les millions de petits points colorés d'un écran ?",
        options: ["Des confettis", "Des pixels", "Des bulles"],
        correctIndex: 1,
        explanation: "Super ! Les pixels sont les briques de couleur qui forment toutes les images !",
      },
      {
        question: "Lequel de ces appareils imprime un dessin sur du vrai papier ?",
        options: ["Le microphone", "L'imprimante", "Le clavier"],
        correctIndex: 1,
        explanation: "Gagné ! L'imprimante est bien un périphérique de sortie sur papier !",
      },
    ],
  },

  // 2.3 Stockage & Communication
  'stockage-comm': {
    id: 'stockage-comm',
    title: "Stockage Amovible & Communication",
    shortTitle: "Stockage & Réseau",
    emoji: "💾🌐",
    badge: "Les Voyageurs de Données",
    category: 'hardware',
    color: {
      bg: "bg-emerald-50",
      border: "border-emerald-500",
      text: "text-emerald-700",
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      accent: "#059669",
    },
    metaphor: {
      title: "La Valise magique et le Pigeon voyageur",
      description: "La clé USB est comme une petite valise dans laquelle tu emportes tes dessins de l'école à la maison. Et la carte Wi-Fi est comme un pigeon voyageur invisible qui discute avec le monde entier !",
      emoji: "🧳🕊️",
    },
    intro: "Tu veux apporter ton exposé sur les dinosaures à l'école ou envoyer une photo à ton cousin qui habite loin ? Voici les outils indispensables !",
    definition: "Ce sont les appareils qui permettent de transporter des données (Clé USB, Disque externe) ou de faire communiquer plusieurs ordinateurs entre eux à travers les ondes ou les câbles (Wi-Fi, Carte Réseau).",
    role: [
      "🧳 Transporter des gigaoctets de fichiers dans sa poche de pantalon",
      "🌐 Connecter l'ordinateur à la box Internet sans aucun fil grâce au Wi-Fi",
      "👥 Partager des documents et jouer en réseau avec ses copains",
    ],
    howItWorks: "La clé USB utilise de la mémoire flash qui retient les 0 et les 1 même débranchée. Le Wi-Fi utilise des ondes radio invisibles qui traversent l'air comme la musique à la radio !",
    examples: [
      { name: "La Clé USB", desc: "Le petit bâtonnet que l'on glisse dans la poche pour emporter ses cours.", emoji: "💾" },
      { name: "Le Disque Dur Externe", desc: "Un grand coffre nomade pour garder toutes les photos de la famille.", emoji: "🗄️" },
      { name: "La Carte Wi-Fi", desc: "L'antenne invisible qui capte Internet dans toute la maison.", emoji: "📶" },
      { name: "Le Câble Réseau (RJ45)", desc: "Le câble souvent jaune ou bleu pour une connexion ultra-rapide.", emoji: "🔌" },
    ],
    funFact: "Les ondes Wi-Fi voyagent à la vitesse de la lumière : près de 300 000 kilomètres par seconde ! En un clin d'œil, tes données ont le temps de faire 7 fois le tour de la Terre !",
    threeDType: 'peripherals',
    gameType: 'peripherals-sorting',
    parentId: 'peripheriques',
    childrenIds: [],
    quiz: [
      {
        question: "À quoi sert une clé USB ?",
        options: ["À ouvrir la porte de la maison", "À stocker et transporter des fichiers dans sa poche", "À faire des étincelles"],
        correctIndex: 1,
        explanation: "Bravo ! La clé USB est la valise nomade de tes fichiers informatiques !",
      },
      {
        question: "Comment voyage le signal Wi-Fi dans la maison ?",
        options: ["Dans des petits tuyaux d'eau", "Grâce à des ondes radio invisibles dans l'air", "Par le plancher"],
        correctIndex: 1,
        explanation: "Exactement ! Les ondes Wi-Fi traversent l'air à la vitesse de la lumière !",
      },
      {
        question: "La clé USB est-elle à la fois une entrée et une sortie ?",
        options: ["Oui ! On peut y copier des fichiers (sortie) et en lire (entrée)", "Non, seulement pour décorer", "Elle ne fonctionne que dans l'espace"],
        correctIndex: 0,
        explanation: "Super perspicace ! C'est un support mixte : l'ordinateur peut y écrire et y lire !",
      },
    ],
  },
};

// Tree structure helpers
export const ROOT_NODE_ID = 'ordinateur';

export interface TreeLevel {
  level: number;
  nodeIds: string[];
}
