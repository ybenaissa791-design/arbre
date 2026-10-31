export type Language = 'fr' | 'ar';

export interface LessonContent {
  id: string;
  title: string;
  emoji: string;
  metaphorTitle: string;
  metaphorDesc: string;
  videoUrl?: string;
  simpleWhat: string;       // Ultra simple 1-2 sentence definition
  simpleRole: string[];     // 2-3 simple bullet points with emojis
  images: {
    url: string;
    caption: string;
  }[];
  threeDType?: 'computer' | 'cpu' | 'ram' | 'storage' | 'motherboard' | 'bus' | 'peripherals' | 'software' | 'os';
  gameType?: 'peripherals-hub' | 'drawing-canvas' | 'quiz';
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

// -------------------------------------------------------------
// FRENCH DATA
// Videos ONLY on nodes that have their own video file:
// - ordinateur -> /video/ordinateur.mp4
// - unite-centrale -> /video/unite_centrale.mp4
// - cpu -> /video/cpu.mp4
// - ram -> /video/memoire.mp4
// - carte-mere -> /video/carte_mere.mp4
// - peripheriques -> /video/peripheriques.mp4
// NO other node has a video!
// -------------------------------------------------------------
export const CONTENT_FR: Record<string, LessonContent> = {
  'ordinateur': {
    id: 'ordinateur',
    title: "L'Ordinateur",
    emoji: "🖥️",
    metaphorTitle: "Comme un être humain !",
    metaphorDesc: "L'ordinateur a un Corps solide (le Matériel) et un Esprit intelligent (le Logiciel).",
    videoUrl: "/video/ordinateur.mp4",
    simpleWhat: "L'ordinateur est une machine magique qui t'aide à dessiner, apprendre, jouer et communiquer avec le monde.",
    simpleRole: [
      "🎨 Dessiner de jolies images colorées",
      "🎮 Jouer à des jeux amusants et éducatifs",
      "📚 Apprendre plein de choses pour l'école",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
        caption: "L'ordinateur portable que l'on peut emporter partout",
      },
      {
        url: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80",
        caption: "L'ordinateur de bureau avec son grand écran lumineux",
      },
    ],
    threeDType: 'computer',
    gameType: 'quiz',
    quiz: [
      {
        question: "À quoi ressemble l'ordinateur ?",
        options: ["À une personne avec un corps et un esprit", "À un vélo", "À un arbre"],
        correctIndex: 0,
        explanation: "Bravo ! Le matériel est son corps physique, et le logiciel est son esprit !",
      },
    ],
  },

  'logiciel': {
    id: 'logiciel',
    title: "Partie Logicielle",
    emoji: "🧠",
    metaphorTitle: "L'Esprit et les Pensées",
    metaphorDesc: "C'est la partie invisible : les idées, les règles des jeux et les ordres donnés à la machine.",
    // NO VIDEO HERE (only rich visuals)
    simpleWhat: "Le logiciel (Software), ce sont les programmes invisibles qui disent à l'ordinateur comment fonctionner.",
    simpleRole: [
      "💡 Donner des ordres précis aux pièces physiques",
      "✨ Faire chanter la musique et bouger tes jeux vidéo",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
        caption: "Les logiciels permettent de créer des jeux et de coder",
      },
      {
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        caption: "Des lignes de code secret qui donnent vie à la machine",
      },
    ],
    threeDType: 'software',
    gameType: 'quiz',
    quiz: [
      {
        question: "Peut-on toucher un logiciel avec les doigts ?",
        options: ["Non, c'est invisible comme une idée ou une pensée", "Oui, avec des gants", "Oui, c'est en bois"],
        correctIndex: 0,
        explanation: "Exactement ! Le logiciel est numérique, on le voit à l'écran mais on ne peut pas le saisir !",
      },
    ],
  },

  'os': {
    id: 'os',
    title: "Système d'Exploitation (OS)",
    emoji: "👑",
    metaphorTitle: "Le Grand Chef d'Orchestre",
    metaphorDesc: "C'est le chef qui réveille l'ordinateur et fait jouer tous les instruments ensemble.",
    // NO VIDEO HERE
    simpleWhat: "C'est le premier grand logiciel qui démarre quand tu allumes l'ordinateur (exemples : Windows, Android).",
    simpleRole: [
      "⏰ Réveiller l'écran, le clavier et la souris",
      "📁 Ranger tous tes dessins et documents dans des dossiers",
      "🚦 Distribuer le travail à chaque partie de la machine",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80",
        caption: "Windows et Android : les chefs d'orchestre de tes appareils",
      },
    ],
    threeDType: 'os',
    gameType: 'quiz',
    quiz: [
      {
        question: "Qui est le premier logiciel à se réveiller quand on allume la machine ?",
        options: ["Le Système d'Exploitation (OS)", "La calculatrice", "Un jeu vidéo"],
        correctIndex: 0,
        explanation: "Bravo ! L'OS allume toute la maison et prépare le terrain pour tes jeux !",
      },
    ],
  },

  'applications': {
    id: 'applications',
    title: "Logiciels d'Application",
    emoji: "🎨",
    metaphorTitle: "La Boîte magique d'Outils et de Jeux",
    metaphorDesc: "Comme une trousse d'écolier avec des crayons, des ciseaux et des cahiers magiques.",
    // NO VIDEO HERE
    simpleWhat: "Ce sont les programmes que tu ouvres pour faire une activité précise : dessiner, écrire, calculer ou jouer.",
    simpleRole: [
      "🖌️ Paint pour dessiner et colorier",
      "🐱 Scratch pour créer des histoires animées",
      "🌐 Le Navigateur Web pour explorer Internet",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        caption: "Les applications pour peindre et exprimer ta créativité",
      },
    ],
    threeDType: 'software',
    gameType: 'drawing-canvas',
    quiz: [
      {
        question: "Quelle application utilises-tu pour dessiner un soleil ?",
        options: ["Paint ou un logiciel de dessin", "La prise de courant", "L'imprimante"],
        correctIndex: 0,
        explanation: "Bravo ! Paint est ton carnet de dessin magique sur l'ordinateur !",
      },
    ],
  },

  'materiel': {
    id: 'materiel',
    title: "Partie Matérielle",
    emoji: "🦾",
    metaphorTitle: "Le Corps et les Organes",
    metaphorDesc: "C'est tout ce qui est solide et que tu peux toucher avec tes mains.",
    // NO VIDEO HERE
    simpleWhat: "Le matériel (Hardware), ce sont les pièces physiques solides : l'écran, le clavier, la boîte et les circuits.",
    simpleRole: [
      "⚡ Recevoir l'énergie électrique pour faire battre le cœur de l'ordinateur",
      "👀 Montrer des images éclatantes et faire entendre les sons",
    ],
    images: [
      {
        url: "/images/unite_centrale.jfif",
        caption: "Les pièces solides et électroniques qui forment l'ordinateur",
      },
    ],
    threeDType: 'computer',
    gameType: 'quiz',
    quiz: [
      {
        question: "Le clavier est-il du matériel ou du logiciel ?",
        options: ["Du matériel, car on peut le toucher avec les doigts", "Du logiciel", "Un fantôme"],
        correctIndex: 0,
        explanation: "Exactement ! Le clavier est en plastique solide, c'est du matériel pur !",
      },
    ],
  },

  'unite-centrale': {
    id: 'unite-centrale',
    title: "L'Unité Centrale",
    emoji: "📦",
    metaphorTitle: "La Maison des Organes Vitaux",
    metaphorDesc: "C'est le grand coffre protecteur qui abrite le cerveau, le cœur et la mémoire.",
    videoUrl: "/video/unite_centrale.mp4",
    simpleWhat: "La grande boîte (ou le dessous du clavier d'un ordinateur portable) qui protège tous les trésors électroniques.",
    simpleRole: [
      "🛡️ Protéger les circuits très délicats contre la poussière et les chocs",
      "🌬️ Souffler de l'air frais avec son ventilateur pour ne pas surchauffer",
    ],
    images: [
      {
        url: "/images/unite_centrale.jfif",
        caption: "L'intérieur de l'unité centrale avec tous ses composants",
      },
    ],
    threeDType: 'computer',
    gameType: 'quiz',
    quiz: [
      {
        question: "Pourquoi trouve-t-on des ventilateurs dans l'unité centrale ?",
        options: ["Pour souffler de l'air frais et refroidir les pièces", "Pour faire de la musique", "Pour sécher le linge"],
        correctIndex: 0,
        explanation: "Bravo ! En calculant à toute vitesse, les composants chauffent et ont besoin d'air frais !",
      },
    ],
  },

  'cpu': {
    id: 'cpu',
    title: "Le Processeur (CPU)",
    emoji: "⚡",
    metaphorTitle: "Le Super-Cerveau Éclair",
    metaphorDesc: "Il réfléchit et fait des milliards de calculs à la seconde sans jamais se fatiguer !",
    videoUrl: "/video/cpu.mp4",
    simpleWhat: "Le processeur est une petite puce carrée en silicium qui est le vrai cerveau pensant de la machine.",
    simpleRole: [
      "🧮 Calculer à la vitesse de l'éclair (milliards d'opérations par seconde)",
      "🎯 Faire bouger les héros et les voitures dans tes jeux vidéo",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80",
        caption: "La puce carrée du processeur avec ses broches dorées",
      },
    ],
    threeDType: 'cpu',
    gameType: 'quiz',
    quiz: [
      {
        question: "Quel organe de notre corps ressemble le plus au processeur ?",
        options: ["Le cerveau", "Le pied", "L'estomac"],
        correctIndex: 0,
        explanation: "Bravo ! Le processeur réfléchit et calcule tout, exactement comme notre cerveau !",
      },
    ],
  },

  'ram': {
    id: 'ram',
    title: "Mémoire Vive (RAM)",
    emoji: "📝",
    metaphorTitle: "La Table de Travail Magique",
    metaphorDesc: "C'est la table où l'ordinateur pose ses cahiers ouverts. Le soir quand on éteint, la table redevient vide !",
    videoUrl: "/video/memoire.mp4",
    simpleWhat: "Une mémoire ultra-rapide qui garde les applications ouvertes en ce moment même.",
    simpleRole: [
      "⚡ Donner les informations au cerveau à la vitesse de la lumière",
      "🧹 Se vider toute seule dès que l'ordinateur est éteint",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
        caption: "Une barrette de mémoire vive RAM avec ses puces noires",
      },
    ],
    threeDType: 'ram',
    gameType: 'quiz',
    quiz: [
      {
        question: "Que se passe-t-il dans la RAM quand on coupe l'électricité ?",
        options: ["Elle s'efface complètement car elle a besoin de courant", "Elle garde tout pour toujours", "Elle sonne"],
        correctIndex: 0,
        explanation: "Exactement ! La RAM est une mémoire vive temporaire : sans courant, elle redevient toute blanche !",
      },
    ],
  },

  'stockage': {
    id: 'stockage',
    title: "Le Stockage (Disque Dur / SSD)",
    emoji: "🗄️",
    metaphorTitle: "L'Armoire à Souvenirs Permanente",
    metaphorDesc: "C'est l'armoire fermée qui garde tes photos, vidéos et jeux pour toujours, même éteint !",
    // NO VIDEO HERE
    simpleWhat: "Le Disque Dur ou SSD est la mémoire permanente qui conserve tes fichiers pour des années.",
    simpleRole: [
      "💾 Garder tes créations même la nuit quand l'ordinateur dort",
      "📚 Ranger des milliers de photos et d'albums de famille",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
        caption: "Un disque de stockage moderne ultra-rapide",
      },
    ],
    threeDType: 'storage',
    gameType: 'quiz',
    quiz: [
      {
        question: "Où dorment tes photos quand l'ordinateur est complètement éteint ?",
        options: ["Dans le Disque de Stockage", "Dans la souris", "Dans la prise de courant"],
        correctIndex: 0,
        explanation: "Bravo ! Le stockage permanent conserve précieusement tous tes souvenirs !",
      },
    ],
  },

  'carte-mere': {
    id: 'carte-mere',
    title: "La Carte Mère",
    emoji: "🟩",
    metaphorTitle: "Le Grand Squelette et les Nerfs",
    metaphorDesc: "Elle tient tous les composants ensemble et leur permet de se parler comme une maman protectrice.",
    videoUrl: "/video/carte_mere.mp4",
    simpleWhat: "La grande plaque verte sur laquelle on vient brancher le cerveau, la mémoire et tous les câbles.",
    simpleRole: [
      "🤝 Faire discuter tous les composants entre eux par ses pistes dorées",
      "⚡ Distribuer le courant électrique à chaque pièce de façon équilibrée",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        caption: "La grande carte mère avec ses pistes conductrices en cuivre",
      },
    ],
    threeDType: 'motherboard',
    gameType: 'quiz',
    quiz: [
      {
        question: "Pourquoi s'appelle-t-elle la Carte Mère ?",
        options: ["Parce qu'elle accueille et relie tous les organes ensemble", "Parce qu'elle prépare le goûter", "Parce qu'elle est en pâte à modeler"],
        correctIndex: 0,
        explanation: "Bravo ! Elle est la maman bienveillante qui rassemble tous les composants !",
      },
    ],
  },

  'alimentation': {
    id: 'alimentation',
    title: "L'Alimentation",
    emoji: "🔌",
    metaphorTitle: "Le Cœur Électrique",
    metaphorDesc: "Elle apporte l'énergie électrique indispensable pour réveiller tous les circuits.",
    // NO VIDEO HERE
    simpleWhat: "Le boîtier électrique qui transforme le courant fort de la prise murale en petite énergie douce.",
    simpleRole: [
      "⚡ Nourrir toutes les puces électroniques en électricité",
      "🔋 Recharger la batterie de l'ordinateur portable",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
        caption: "Le bloc d'alimentation qui fournit l'énergie",
      },
    ],
    threeDType: 'computer',
    gameType: 'quiz',
    quiz: [
      {
        question: "Que donne le bloc d'alimentation à la machine ?",
        options: ["De l'électricité propre et douce", "Du jus de pomme", "Du vent"],
        correctIndex: 0,
        explanation: "Exactement ! L'électricité est la nourriture indispensable de l'ordinateur !",
      },
    ],
  },

  'peripheriques': {
    id: 'peripheriques',
    title: "Les Périphériques",
    emoji: "🔌",
    metaphorTitle: "Les Yeux, les Mains, les Oreilles et la Voix",
    metaphorDesc: "Ce sont les appareils branchés autour de la machine pour communiquer avec elle.",
    videoUrl: "/video/peripheriques.mp4",
    simpleWhat: "Tous les appareils branchés autour de l'ordinateur : la souris, le clavier, l'écran, le micro et l'imprimante.",
    simpleRole: [
      "📥 Faire ENTRER tes ordres et tes idées (souris, clavier)",
      "📤 Faire SORTIR les images et les sons (écran, haut-parleurs)",
      "💾 Transporter tes documents et te connecter au Web (clé USB, Wi-Fi)",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
        caption: "La souris, le clavier et l'écran : les périphériques stars",
      },
    ],
    threeDType: 'peripherals',
    gameType: 'peripherals-hub', // HAS BOTH GAMES: Memory & Boxes!
    quiz: [
      {
        question: "Pourquoi les appelle-t-on des 'périphériques' ?",
        options: ["Parce qu'ils sont placés tout autour de la machine", "Parce qu'ils dorment", "Parce qu'ils chantent"],
        correctIndex: 0,
        explanation: "Bravo ! Le mot périphérique signifie qu'ils sont placés en périphérie, tout autour !",
      },
    ],
  },

  'entree': {
    id: 'entree',
    title: "Périphériques d'Entrée",
    emoji: "📥",
    metaphorTitle: "Les Yeux, les Oreilles et le Toucher",
    metaphorDesc: "Ils font ENTRER tes ordres de l'extérieur vers l'intérieur de la machine.",
    // NO VIDEO HERE
    simpleWhat: "La souris, le clavier, la webcam et le micro qui captent tes mouvements, tes textes et ta voix.",
    simpleRole: [
      "🖱️ La Souris : clique et montre les boutons",
      "⌨️ Le Clavier : tape les lettres et les chiffres",
      "🎙️ Le Microphone : enregistre ta voix et tes chansons",
      "📹 La Webcam : filme ton visage pour la classe",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        caption: "Le clavier pour écrire des histoires",
      },
      {
        url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
        caption: "La souris pour pointer et cliquer",
      },
    ],
    threeDType: 'peripherals',
    gameType: 'quiz',
    quiz: [
      {
        question: "La souris est-elle un périphérique d'entrée ou de sortie ?",
        options: ["D'Entrée, car elle envoie tes clics vers l'ordinateur", "De Sortie", "De repos"],
        correctIndex: 0,
        explanation: "Bravo ! En cliquant, tu fais 'entrer' tes consignes dans la machine !",
      },
    ],
  },

  'sortie': {
    id: 'sortie',
    title: "Périphériques de Sortie",
    emoji: "📤",
    metaphorTitle: "La Bouche et le Grand Tableau Magique",
    metaphorDesc: "Ils font SORTIR les informations pour que tes yeux les voient et tes oreilles les entendent.",
    // NO VIDEO HERE
    simpleWhat: "L'écran, les enceintes et l'imprimante qui te restituent les images, les musiques et les feuilles de papier.",
    simpleRole: [
      "🖥️ L'Écran : affiche les couleurs éclatantes",
      "🔊 Les Haut-parleurs : font résonner la musique",
      "🖨️ L'Imprimante : dépose de l'encre sur une vraie feuille",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
        caption: "L'écran qui fait sortir les images lumineuses",
      },
      {
        url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80",
        caption: "L'imprimante qui fait sortir tes dessins sur du papier",
      },
    ],
    threeDType: 'peripherals',
    gameType: 'quiz',
    quiz: [
      {
        question: "L'écran est-il une entrée ou une sortie ?",
        options: ["De Sortie, car il fait sortir la lumière et les images pour tes yeux", "D'Entrée", "Une porte"],
        correctIndex: 0,
        explanation: "Bravo ! L'écran fait sortir le résultat pour que tu puisses l'admirer !",
      },
    ],
  },

  'stockage-comm': {
    id: 'stockage-comm',
    title: "Stockage & Réseau",
    emoji: "💾",
    metaphorTitle: "La Petite Valise et les Ondes Invisibles",
    metaphorDesc: "La clé USB voyage dans ta poche, et le Wi-Fi discute avec le monde entier à la vitesse de la lumière.",
    // NO VIDEO HERE
    simpleWhat: "La clé USB pour transporter tes devoirs, et la carte Wi-Fi pour te connecter à Internet sans aucun câble.",
    simpleRole: [
      "💾 La Clé USB : glisse des milliers de photos dans ta poche",
      "📶 Le Wi-Fi : voyage dans l'air comme la musique à la radio",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=600&q=80",
        caption: "La clé USB : petite, légère et nomade",
      },
    ],
    threeDType: 'peripherals',
    gameType: 'quiz',
    quiz: [
      {
        question: "À quoi sert la clé USB ?",
        options: ["À transporter ses fichiers d'un ordinateur à un autre dans sa poche", "À allumer le radiateur", "À boire de l'eau"],
        correctIndex: 0,
        explanation: "Bravo ! La clé USB est la valise nomade de tes fichiers !",
      },
    ],
  },
};

// -------------------------------------------------------------
// ARABIC DATA
// -------------------------------------------------------------
export const CONTENT_AR: Record<string, LessonContent> = {
  'ordinateur': {
    id: 'ordinateur',
    title: "الحاسوب",
    emoji: "🖥️",
    metaphorTitle: "مثل جسم الإنسان !",
    metaphorDesc: "الحاسوب له جسد صلب نلمسه باليد (العتاد)، وعقل ذكي يفكر (البرمجيات).",
    videoUrl: "/video/ordinateur.mp4",
    simpleWhat: "الحاسوب آلة ذكية وسحرية تساعدك على الرسم، والتعلم، واللعب، ومشاهدة الفيديوهات الجميلة.",
    simpleRole: [
      "🎨 رسم لوحات رائعة بالألوان",
      "🎮 الاستمتاع بألعاب مسلية ومفيدة",
      "📚 التعلم وإنجاز الواجبات المدرسية",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
        caption: "حاسوب محمول خفيف يسهل حمله في المحفظة",
      },
      {
        url: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80",
        caption: "حاسوب مكتبي مع شاشة كبيرة مريحة",
      },
    ],
    threeDType: 'computer',
    gameType: 'quiz',
    quiz: [
      {
        question: "بماذا يشبه الحاسوب الإنسان ؟",
        options: ["له جسد ملموس (العتاد) وروح مفكرة (البرمجيات)", "يشبه الشجرة", "يشبه الدراجة"],
        correctIndex: 0,
        explanation: "أحسنت ! العتاد هو الجسد، والبرمجيات هي العقل والروح !",
      },
    ],
  },

  'logiciel': {
    id: 'logiciel',
    title: "البرمجيات",
    emoji: "🧠",
    metaphorTitle: "العقل والأفكار",
    metaphorDesc: "هي الأفكار والأوامر غير المرئية التي لا نلمسها باليد ولكنها تدير كل شيء.",
    simpleWhat: "البرمجيات هي الأوامر والبرامج التي تخبر مكونات الحاسوب بما يجب فعله بدقة.",
    simpleRole: [
      "💡 إعطاء الأوامر لأجزاء الحاسوب",
      "✨ تشغيل الألعاب وتطبيقات الرسم والموسيقى",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
        caption: "برامج الألعاب والرسم السحرية",
      },
      {
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        caption: "التعليمات البرمجية الذكية",
      },
    ],
    threeDType: 'software',
    gameType: 'quiz',
    quiz: [
      {
        question: "هل يمكننا لمس البرمجيات بأيدينا ؟",
        options: ["لا، هي برامج غير ملموسة مثل الفكرة", "نعم بالقفازات", "نعم مصنوعة من الخشب"],
        correctIndex: 0,
        explanation: "صحيح ! نراها على الشاشة ونتفاعل معها ولكن لا نمسكها باليد !",
      },
    ],
  },

  'os': {
    id: 'os',
    title: "نظام التشغيل (OS)",
    emoji: "👑",
    metaphorTitle: "قائد الأوركسترا والمدير",
    metaphorDesc: "هو القائد الذي يوقظ الحاسوب ويجعل كل الأجهزة تعمل معاً بانسجام.",
    simpleWhat: "هو أول برنامج يشتغل عند الضغط على زر التشغيل (مثل ويندوز أو أندرويد).",
    simpleRole: [
      "⏰ إيقاظ الشاشة والفأرة ولوحة المفاتيح",
      "📁 ترتيب رسوماتك وملفاتك في مجلدات منظمة",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80",
        caption: "ويندوز وأندرويد هما قادة الحاسوب والهاتف",
      },
    ],
    threeDType: 'os',
    gameType: 'quiz',
    quiz: [
      {
        question: "من هو أول برنامج يستيقظ عند تشغيل الحاسوب ؟",
        options: ["نظام التشغيل (OS)", "الآلة الحاسبة", "لعبة كرة القدم"],
        correctIndex: 0,
        explanation: "ممتاز ! نظام التشغيل هو أول من يفتح البيت ويوقظ الجميع !",
      },
    ],
  },

  'applications': {
    id: 'applications',
    title: "التطبيقات والبرامج",
    emoji: "🎨",
    metaphorTitle: "صندوق الألعاب والأدوات",
    metaphorDesc: "مثل علبة الألوان ودفتر الرسم : تطبيق لكل عمل تحب القيام به !",
    simpleWhat: "برامج نفتحها للقيام بنشاط محدد : كالرسم، والكتابة، أو التعلم واللعب.",
    simpleRole: [
      "🖌️ برنامج الرسام (Paint) لتلوين الصور",
      "🐱 برنامج سكراتش (Scratch) لابتكار الألعاب",
      "🌐 المتصفح لمشاهدة الفيديوهات والمعلومات",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        caption: "تطبيقات الرسم والتصميم الإبداعية",
      },
    ],
    threeDType: 'software',
    gameType: 'drawing-canvas',
    quiz: [
      {
        question: "ما هو التطبيق الذي تستعمله لرسم شمس جميلة بالفرشاة ؟",
        options: ["برنامج الرسام (Paint)", "قابس الكهرباء", "المكنسة"],
        correctIndex: 0,
        explanation: "أحسنت ! برنامج الرسام هو تطبيقك المفضل للإبداع والتلوين !",
      },
    ],
  },

  'materiel': {
    id: 'materiel',
    title: "العتاد (المكونات المادية)",
    emoji: "🦾",
    metaphorTitle: "الجسد والأعضاء",
    metaphorDesc: "كل ما تراه بعينك وتستطيع لمسه بيدك كالشاشة والفأرة والعلبة.",
    simpleWhat: "القطع الحقيقية الصلبة المصنوعة من البلاستيك والمعادن والدوائر الإلكترونية.",
    simpleRole: [
      "⚡ استقبال الكهرباء ليعمل الحاسوب",
      "👀 إظهار الصور وسماع الأصوات الجميلة",
    ],
    images: [
      {
        url: "/images/unite_centrale.jfif",
        caption: "الوحدة المركزية ومكوناتها المادية الملموسة",
      },
    ],
    threeDType: 'computer',
    gameType: 'quiz',
    quiz: [
      {
        question: "هل لوحة المفاتيح تعتبر عتاداً مادياً ؟",
        options: ["نعم، لأننا نلمس أزرارها بأصابعنا", "لا، هي خيال", "لا، هي صوت"],
        correctIndex: 0,
        explanation: "صحيح ! لأنها شيء ملموس ومصنوع من مادة صلبة !",
      },
    ],
  },

  'unite-centrale': {
    id: 'unite-centrale',
    title: "الوحدة المركزية",
    emoji: "📦",
    metaphorTitle: "بيت الأعضاء المهمة",
    metaphorDesc: "العلبة القوية التي تحمي العقل (المعالج) والقلب والذاكرة.",
    videoUrl: "/video/unite_centrale.mp4",
    simpleWhat: "الصندوق الرئيسي الذي يجمع كل الأجزاء الذكية والإلكترونية داخله.",
    simpleRole: [
      "🛡️ حماية القطع الحساسة من الغبار والصدمات",
      "🌬️ تبريد القطع بواسطة مروحة تدور بالهواء اللطيف",
    ],
    images: [
      {
        url: "/images/unite_centrale.jfif",
        caption: "داخل الوحدة المركزية المليئة بالدوائر العجيبة",
      },
    ],
    threeDType: 'computer',
    gameType: 'quiz',
    quiz: [
      {
        question: "لماذا توجد مروحة داخل الوحدة المركزية ؟",
        options: ["لتبريد القطع لأنها تسخن عند العمل بسرعة", "لتطيير الطائرات الورقية", "لصنع العصير"],
        correctIndex: 0,
        explanation: "ممتاز ! المروحة تبرد العقل والقطع عند الحسابات السريعة !",
      },
    ],
  },

  'cpu': {
    id: 'cpu',
    title: "المعالج (CPU)",
    emoji: "⚡",
    metaphorTitle: "العقل الخارق السريع",
    metaphorDesc: "يفكر ويحسب مليارات العمليات في ثانية واحدة دون تعب !",
    videoUrl: "/video/cpu.mp4",
    simpleWhat: "شريحة صغيرة جداً مربعة هي العقل المفكر والمدبر للحاسوب.",
    simpleRole: [
      "🧠 إجراء الحسابات بسرعة الضوء",
      "🎯 تحريك الشخصيات والسيارات في ألعابك",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80",
        caption: "شريحة المعالج الذكية مع سنونها الذهبية",
      },
    ],
    threeDType: 'cpu',
    gameType: 'quiz',
    quiz: [
      {
        question: "أي عضو في جسم الإنسان يشبه المعالج ؟",
        options: ["الدماغ والعقل", "القدم", "الركبة"],
        correctIndex: 0,
        explanation: "أحسنت ! المعالج هو دماغ الحاسوب المفكر !",
      },
    ],
  },

  'ram': {
    id: 'ram',
    title: "الذاكرة الحية (RAM)",
    emoji: "📝",
    metaphorTitle: "طاولة العمل السريعة",
    metaphorDesc: "طاولة سحرية يضع عليها الحاسوب ألعابه ورسوماته المفتوحة حالياً.",
    videoUrl: "/video/memoire.mp4",
    simpleWhat: "ذاكرة سريعة جداً تساعد المعالج. عندما نطفئ الحاسوب، تصبح فارغة تماماً.",
    simpleRole: [
      "⚡ تزويد المعالج بالمعلومات في جزء من الثانية",
      "🧹 تمسح ما بداخلها تلقائياً عند انقطاع الكهرباء",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
        caption: "لوحة الذاكرة الحية الخضراء السريعة",
      },
    ],
    threeDType: 'ram',
    gameType: 'quiz',
    quiz: [
      {
        question: "ماذا يحدث للذاكرة الحية عند إطفاء الحاسوب ؟",
        options: ["تُمحى لأنها تحتاج كهرباء لتبقى نشيطة", "تبقى ممتلئة للأبد", "تتحول إلى حجر"],
        correctIndex: 0,
        explanation: "صحيح ! هي ذاكرة سريعة لكنها مؤقتة تتفرغ عند الإطفاء !",
      },
    ],
  },

  'stockage': {
    id: 'stockage',
    title: "وحدة التخزين (القرص الصلب)",
    emoji: "🗄️",
    metaphorTitle: "خزانة الذكريات الدائمة",
    metaphorDesc: "خزانة مغلقة تحفظ صورك وألعابك لسنوات حتى لو أطفأت الحاسوب ونمت !",
    simpleWhat: "القرص الصلب يحفظ كل الملفات والصور والفيديوهات بشكل دائم وآمن.",
    simpleRole: [
      "💾 حفظ ذكرياتك حتى بعد إطفاء الكهرباء",
      "📚 استيعاب آلاف الصور والكتب والألعاب",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
        caption: "قرص التخزين لحفظ الألعاب والصور",
      },
    ],
    threeDType: 'storage',
    gameType: 'quiz',
    quiz: [
      {
        question: "أين تنام صورك عندما يكون الحاسوب مطفأً تماماً ؟",
        options: ["في قرص التخزين الدائم", "في الفأرة", "في الهواء"],
        correctIndex: 0,
        explanation: "ممتاز ! قرص التخزين يحفظ كل شيء بأمان حتى بدون كهرباء !",
      },
    ],
  },

  'carte-mere': {
    id: 'carte-mere',
    title: "اللوحة الأم",
    emoji: "🟩",
    metaphorTitle: "الهيكل العظمي والأعصاب",
    metaphorDesc: "تحمل كل القطع وتربط بينها ليتحدث الجميع مع بعضهم بحب !",
    videoUrl: "/video/carte_mere.mp4",
    simpleWhat: "اللوحة الخضراء الكبيرة التي يتصل بها المعالج والذاكرة وكل الأسلاك.",
    simpleRole: [
      "🤝 توصيل كل القطع ليتحدث المعالج مع الشاشة والذاكرة",
      "⚡ توزيع الكهرباء بنظام على كل جزء",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        caption: "اللوحة الأم مع خطوط التوصيل النحاسية",
      },
    ],
    threeDType: 'motherboard',
    gameType: 'quiz',
    quiz: [
      {
        question: "لماذا سُميت باللوحة الأم ؟",
        options: ["لأنها تحتضن وتربط كل مكونات الحاسوب معاً", "لأنها تطبخ الطعام", "لأنها تحكي قصصاً"],
        correctIndex: 0,
        explanation: "أحسنت ! هي الأم التي تجمع كل الأعضاء في مكان واحد !",
      },
    ],
  },

  'alimentation': {
    id: 'alimentation',
    title: "مزود الطاقة (الكهرباء)",
    emoji: "🔌",
    metaphorTitle: "القلب المغذي",
    metaphorDesc: "يمد كل أجزاء الحاسوب بالطاقة اللطيفة لتعمل بنشاط وسعادة.",
    simpleWhat: "الجهاز الذي يأخذ الكهرباء القوية من الحائط ويحولها لكهرباء لطيفة وآمنة.",
    simpleRole: [
      "⚡ إطعام كل الشرائح الإلكترونية بالكهرباء",
      "🔋 شحن بطارية الحاسوب المحمول",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
        caption: "مزود الطاقة الكهربائية مع مروحته الخاصة",
      },
    ],
    threeDType: 'computer',
    gameType: 'quiz',
    quiz: [
      {
        question: "ماذا يقدم مزود الطاقة للحاسوب ؟",
        options: ["الكهرباء اللازمة للعمل", "عصير البرتقال", "الحلويات"],
        correctIndex: 0,
        explanation: "بالضبط ! الكهرباء هي طعام وغذاء الآلات الإلكترونية !",
      },
    ],
  },

  'peripheriques': {
    id: 'peripheriques',
    title: "الملحقات والأجهزة",
    emoji: "🔌",
    metaphorTitle: "العيون واليدان والصوت",
    metaphorDesc: "كل الأجهزة الخارجية التي نتواصل بها مع الحاسوب من حوله.",
    videoUrl: "/video/peripheriques.mp4",
    simpleWhat: "الأجهزة المتصلة بالحاسوب : الفأرة، لوحة المفاتيح، الشاشة، الطابعة، والميكروفون.",
    simpleRole: [
      "📥 إدخال الأوامر والكلمات (الفأرة، لوحة المفاتيح)",
      "📤 إخراج الصور والأصوات (الشاشة، مكبرات الصوت)",
      "💾 نقل الملفات (مفتاح USB)",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
        caption: "الفأرة ولوحة المفاتيح صديقا التلميذ المفضلان",
      },
    ],
    threeDType: 'peripherals',
    gameType: 'peripherals-hub',
    quiz: [
      {
        question: "لماذا تسمى بالأجهزة الملحقة ؟",
        options: ["لأنها تتصل بالوحدة المركزية وتلتف حولها", "لأنها تسير في الشارع", "لأنها زرقاء اللون"],
        correctIndex: 0,
        explanation: "ممتاز ! لأنها تلحق بالحاسوب وترتبط به لنتواصل معه !",
      },
    ],
  },

  'entree': {
    id: 'entree',
    title: "وحدات الإدخال",
    emoji: "📥",
    metaphorTitle: "العيون والآذان والأصابع",
    metaphorDesc: "تدخل أوامرك وكلامك من الخارج إلى داخل الحاسوب.",
    simpleWhat: "الفأرة، ولوحة المفاتيح، والكاميرا، والميكروفون التي تلتقط ما تفعله.",
    simpleRole: [
      "🖱️ الفأرة : للنقر واختيار الأشياء",
      "⌨️ لوحة المفاتيح : لكتابة الحروف والأرقام",
      "🎙️ الميكروفون : لتسجيل صوتك الجميل",
      "📹 الكاميرا : لتصوير وجهك في القسم الافتراضي",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        caption: "لوحة المفاتيح لكتابة الكلمات الجميلة",
      },
      {
        url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
        caption: "الفأرة للنقر وتحريك السهم على الشاشة",
      },
    ],
    threeDType: 'peripherals',
    gameType: 'quiz',
    quiz: [
      {
        question: "هل الفأرة وحدة إدخال أم إخراج ؟",
        options: ["وحدة إدخال، لأنها ترسل نقراتك وحركاتك إلى الداخل !", "وحدة إخراج", "نافذة"],
        correctIndex: 0,
        explanation: "أحسنت ! بحركاتك على الفأرة تُدخل الأوامر إلى الحاسوب !",
      },
    ],
  },

  'sortie': {
    id: 'sortie',
    title: "وحدات الإخراج",
    emoji: "📤",
    metaphorTitle: "الفم واللوحة السحرية",
    metaphorDesc: "تُخرج نتائج العمل لتراها بعينك وتسمعها بأذنيك من الداخل إلى الخارج.",
    simpleWhat: "الشاشة، ومكبرات الصوت، والطابعة التي تعرض وتطبع ما قام به الحاسوب.",
    simpleRole: [
      "🖥️ الشاشة : تُظهر الصور الملونة والفيديوهات",
      "🔊 مكبرات الصوت : تطلق الأصوات والأناشيد",
      "🖨️ الطابعة : تطبع رسوماتك على ورق حقيقي",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
        caption: "الشاشة المضيئة لعرض الصور الملونة",
      },
      {
        url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80",
        caption: "الطابعة لإخراج رسمتك على ورقة بيضاء حقيقية",
      },
    ],
    threeDType: 'peripherals',
    gameType: 'quiz',
    quiz: [
      {
        question: "هل الشاشة وحدة إدخال أم إخراج ؟",
        options: ["وحدة إخراج، لأنها تُخرج لنا الصورة لنراها بأعيننا !", "وحدة إدخال", "مرآة عادية"],
        correctIndex: 0,
        explanation: "رائع ! الشاشة تُخرج الضوء والصور لعيوننا !",
      },
    ],
  },

  'stockage-comm': {
    id: 'stockage-comm',
    title: "التخزين والاتصال",
    emoji: "💾",
    metaphorTitle: "الحقيبة والحمام الزاجل",
    metaphorDesc: "مفتاح USB يسافر في جيبك، وشبكة الـ Wi-Fi تتواصل مع العالم بدون أسلاك !",
    simpleWhat: "مفتاح USB لنقل رسوماتك إلى المدرسة، والواي فاي للاتصال بالإنترنت.",
    simpleRole: [
      "💾 مفتاح USB : خفيف في الجيب لحمل الملفات",
      "📶 الواي فاي (Wi-Fi) : موجات غير مرئية في الهواء للتواصل",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=600&q=80",
        caption: "مفتاح USB خفيف يوضع في الجيب بسهولة",
      },
    ],
    threeDType: 'peripherals',
    gameType: 'quiz',
    quiz: [
      {
        question: "ما فائدة مفتاح USB ؟",
        options: ["نقل الملفات والصور من حاسوب لآخر في الجيب", "إشعال الضوء", "شرب الماء"],
        correctIndex: 0,
        explanation: "أحسنت ! مفتاح USB هو حقيبة صغيرة متنقلة لملفاتك !",
      },
    ],
  },
};

export const UI_TEXT = {
  fr: {
    siteTitle: "L'Arbre Magique de l'Informatique",
    subTitle: "Cours interactif pour enfants de primaire",
    clubName: "Club RED PHOENIX (Cyber Sécurité ENSAO)",
    clubFooter: "Réalisé par le Club RED PHOENIX (Club de Cyber Sécurité ENSAO)",
    schoolNote: "Pour les élèves de l'école primaire",
    pdfButton: "Enregistrer en PDF 📄",
    soundOn: "Sons ON",
    soundOff: "Sons OFF",
    listenVoice: "Écouter l'histoire 🎧",
    stopVoice: "Arrêter la voix ⏹️",
    close: "Fermer ✕",
    backToTree: "← Retour à l'Arbre",
    starsWon: "étoiles gagnées",
    treeHint: "Clique sur un cercle pour ouvrir sa leçon en plein écran !",
    videoTitle: "1. Regarde la vidéo magique 🎬",
    picturesTitle: "2. Les images et la vue 3D 🖼️",
    summaryTitle: "3. En résumé tout simple 💡",
    gameTitle: "4. Le jeu amusant 🎮",
    playGame: "Jouer au jeu !",
    restart: "Recommencer",
    score: "Score",
    bravo: "Bravo champion ! 🎉",
    congrats: "Tu as réussi !",
    guideTitle: "Bienvenue sur l'Arbre Magique !",
    guideDesc: "Clique sur les cercles pour découvrir les secrets de l'ordinateur !",
    startAdventure: "C'est parti ! 🚀",
    drawingStudio: "Atelier de Dessin & Peinture 🎨",
  },
  ar: {
    siteTitle: "شجرة الحاسوب السحرية",
    subTitle: "درس تفاعلي وممتع لأبطال وتلاميذ الابتدائي",
    clubName: "نادي RED PHOENIX (الأمن السيبراني ENSAO)",
    clubFooter: "تم الإنجاز بحب بواسطة نادي RED PHOENIX (نادي الأمن السيبراني بالمدرسة الوطنية للعلوم التطبيقية بوجدة ENSAO)",
    schoolNote: "مخصص لتلاميذ التعليم الابتدائي",
    pdfButton: "حفظ كملف PDF 📄",
    soundOn: "تشغيل الأصوات",
    soundOff: "كتم الأصوات",
    listenVoice: "استمع إلى الدرس 🎧",
    stopVoice: "إيقاف الصوت ⏹️",
    close: "إغلاق ✕",
    backToTree: "العودة إلى الشجرة →",
    starsWon: "نجوم تم جمعها",
    treeHint: "اضغط على أي دائرة لتفتح درسها السحري في شاشة كاملة !",
    videoTitle: "1. شاهد الفيديو التوضيحي 🎬",
    picturesTitle: "2. الصور والمجسم ثلاثي الأبعاد 🖼️",
    summaryTitle: "3. خلاصة بسيطة جداً 💡",
    gameTitle: "4. اللعبة المسلية 🎮",
    playGame: "العب اللعبة !",
    restart: "إعادة اللعب",
    score: "النقاط",
    bravo: "أحسنت يا بطل ! 🎉",
    congrats: "لقد نجحت في التحدي !",
    guideTitle: "مرحباً بك في شجرة الحاسوب السحرية !",
    guideDesc: "اضغط على الدوائر لاكتشاف أسرار الحاسوب بالصور والفيديو !",
    startAdventure: "هيا بنا لنبدأ ! 🚀",
    drawingStudio: "ورشة الرسم والتلوين 🎨",
  },
};
