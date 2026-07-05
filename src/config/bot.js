import { logger } from '../utils/logger.js';

export const botConfig = {
  // =========================
  // PRÉSENCE DU BOT (ce que les utilisateurs voient sous le nom du bot)
  // =========================
  // Options pour `status` :
  // - "online"    = point vert
  // - "idle"      = lune jaune
  // - "dnd"       = ne pas déranger (rouge)
  // - "invisible" = apparaît hors ligne
  presence: {
    // État en ligne actuel affiché sur Discord.
    status: "online",

    // Lignes d'activité affichées sous le nom du bot.
    // Correspondance des numéros `type` selon Discord :
    // 0 = Joue à
    // 1 = Diffuse en direct
    // 2 = Écoute
    // 3 = Regarde
    // 4 = Personnalisé
    // 5 = En compétition
    activities: [
      {
        // Texte que les utilisateurs verront (exemple : "Playing /help | Titan Bot").
        name: "/help",
        // Numéro du type d'activité (0 = Joue à).
        type: 0,
      },
    ],
  },

  // =========================
  // COMPORTEMENT DES COMMANDES
  // =========================
  commands: {
    // IDs des propriétaires du bot (séparés par des virgules dans la variable d'env OWNER_IDS).
    // Les propriétaires ont accès aux commandes de niveau owner/admin.
    owners: process.env.OWNER_IDS?.split(",") || [],

    // Temps d'attente par défaut entre deux utilisations d'une commande (en secondes).
    defaultCooldown: 3,

    // Si true, les anciennes commandes sont supprimées avant d'être ré-enregistrées.
    deleteCommands: false,

    // ID de serveur optionnel utilisé pour tester rapidement les slash commands.
    testGuildId: process.env.TEST_GUILD_ID,

    // Préfixe des commandes textuelles (ex : "!" pour "!ping").
    // Supporte à la fois les slash commands et les commandes avec préfixe.
    prefix: process.env.PREFIX || "!",
  },

  // =========================
  // SYSTÈME DE CANDIDATURES
  // =========================
  applications: {
    // Questions par défaut affichées quand quelqu'un remplit une candidature.
    defaultQuestions: [
      { question: "What is your name?", required: true },
      { question: "How old are you?", required: true },
      { question: "Why do you want to join?", required: true },
    ],

    // Couleurs des embeds selon le statut de la candidature.
    statusColors: {
      pending: "#FFA500",
      approved: "#00FF00",
      denied: "#FF0000",
    },

    // Temps d'attente avant de pouvoir soumettre une nouvelle candidature (heures).
    applicationCooldown: 24,

    // Supprime automatiquement les candidatures refusées après ce nombre de jours.
    deleteDeniedAfter: 7,

    // Supprime automatiquement les candidatures approuvées après ce nombre de jours.
    deleteApprovedAfter: 30,

    // IDs des rôles autorisés à gérer les candidatures.
    managerRoles: [], // Sera rempli via l'environnement ou la base de données
  },

  // =========================
  // COULEURS DES EMBEDS & IDENTITÉ VISUELLE
  // =========================
  // IMPORTANT : ceci est la SOURCE UNIQUE DE VÉRITÉ pour toutes les couleurs du bot
  embeds: {
    colors: {
      // Couleurs principales de la marque.
      primary: "#336699",
      secondary: "#2F3136",

      // Couleurs standards pour les messages de succès/erreur/avertissement/info.
      success: "#57F287",
      error: "#ED4245",
      warning: "#FEE75C",
      info: "#3498DB",

      // Couleurs neutres utilitaires.
      light: "#FFFFFF",
      dark: "#202225",
      gray: "#99AAB5",

      // Raccourcis de la palette style Discord.
      blurple: "#5865F2",
      green: "#57F287",
      yellow: "#FEE75C",
      fuchsia: "#EB459E",
      red: "#ED4245",
      black: "#000000",

      // Couleurs spécifiques à certaines fonctionnalités.
      giveaway: {
        active: "#57F287",
        ended: "#ED4245",
      },
      ticket: {
        open: "#57F287",
        claimed: "#FAA61A",
        closed: "#ED4245",
        pending: "#99AAB5",
      },
      economy: "#F1C40F",
      birthday: "#E91E63",
      moderation: "#9B59B6",

      // Correspondance des couleurs de priorité des tickets.
      priority: {
        none: "#95A5A6",
        low: "#3498db",
        medium: "#2ecc71",
        high: "#f1c40f",
        urgent: "#e74c3c",
      },
    },
    footer: {
      // Texte de pied de page par défaut dans les embeds du bot.
      text: "Titan Bot",
      // URL de l'icône du pied de page (null = pas d'icône).
      icon: null,
    },
    // URL de la miniature par défaut pour les embeds (null = pas de miniature).
    thumbnail: null,
    author: {
      // Bloc auteur par défaut optionnel pour les embeds.
      name: null,
      icon: null,
      url: null,
    },
  },

  // =========================
  // PARAMÈTRES DE L'ÉCONOMIE
  // =========================
  economy: {
    currency: {
      // Nom affiché de la monnaie.
      name: "coins",
      // Nom affiché au pluriel.
      namePlural: "coins",
      // Symbole de la monnaie affiché dans les soldes.
      symbol: "$",
    },

    // Solde de départ pour les nouveaux utilisateurs.
    startingBalance: 0,

    // Capacité maximale de la banque avant amélioration (si les améliorations sont utilisées).
    baseBankCapacity: 100000,

    // Montant de la récompense quotidienne.
    dailyAmount: 100,

    // Plage de gains aléatoires pour la commande "work".
    workMin: 10,
    workMax: 100,

    // Plage de gains aléatoires pour la commande "beg" (mendier).
    begMin: 5,
    begMax: 50,

    // Chance de réussite lors d'un vol (0.4 = 40%).
    robSuccessRate: 0.4,

    // Temps en prison après un vol échoué (millisecondes).
    // 3600000 = 1 heure.
    robFailJailTime: 3600000,
  },

  // =========================
  // PARAMÈTRES DE LA BOUTIQUE
  // =========================
  // Ajoute ici les valeurs par défaut de la boutique quand nécessaire.
  shop: {

  },

  // =========================
  // SYSTÈME DE TICKETS
  // =========================
  tickets: {
    // ID de la catégorie où les nouveaux tickets sont créés (null = pas de catégorie forcée).
    defaultCategory: null,

    // IDs des rôles autorisés à gérer/traiter les tickets.
    supportRoles: [],

    // Options de priorité que les utilisateurs/le staff peuvent assigner.
    priorities: {
      none: {
        emoji: "⚪",
        color: "#95A5A6",
        label: "None",
      },
      low: {
        emoji: "🟢",
        color: "#2ECC71",
        label: "Low",
      },
      medium: {
        emoji: "🟡",
        color: "#F1C40F",
        label: "Medium",
      },
      high: {
        emoji: "🔴",
        color: "#E74C3C",
        label: "High",
      },
      urgent: {
        emoji: "🚨",
        color: "#E91E63",
        label: "Urgent",
      },
    },

    // Priorité par défaut pour les nouveaux tickets.
    defaultPriority: "none",

    // ID de la catégorie où les tickets fermés sont archivés.
    archiveCategory: null,

    // ID du salon où les logs de tickets sont envoyés.
    logChannel: null,
  },

  // =========================
  // PARAMÈTRES DES GIVEAWAYS
  // =========================
  giveaways: {
    // Durée par défaut d'un giveaway en millisecondes.
    // 86400000 = 24 heures.
    defaultDuration: 86400000,

    // Plage autorisée pour le nombre de gagnants.
    minimumWinners: 1,
    maximumWinners: 10,

    // Plage de durée autorisée pour un giveaway en millisecondes.
    // 300000 = 5 minutes.
    minimumDuration: 300000,
    // 2592000000 = 30 jours.
    maximumDuration: 2592000000,

    // IDs des rôles autorisés à organiser des giveaways.
    allowedRoles: [],

    // IDs des rôles qui contournent les restrictions des giveaways.
    bypassRoles: [],
  },

  // =========================
  // PARAMÈTRES D'ANNIVERSAIRE
  // =========================
  birthday: {
    // ID du rôle donné aux utilisateurs le jour de leur anniversaire.
    defaultRole: null,

    // ID du salon où les annonces d'anniversaire sont publiées.
    announcementChannel: null,

    // Fuseau horaire utilisé pour calculer les dates d'anniversaire.
    timezone: "UTC",
  },

  // =========================
  // PARAMÈTRES DE VÉRIFICATION
  // =========================
  verification: {
    // Message affiché lors de la publication du panneau de vérification.
    defaultMessage: "Click the button below to verify yourself and gain access to the server!",

    // Texte sur le bouton de vérification.
    defaultButtonText: "Verify",

    // Comportement de la vérification automatique.
    autoVerify: {
      // Comment la vérification automatique décide qui est approuvé automatiquement :
      // - "none"        = tout le monde est vérifié automatiquement immédiatement
      // - "account_age" = le compte doit être plus vieux que le nombre de jours défini
      // - "server_size" = vérifie automatiquement tout le monde seulement dans les petits serveurs
      defaultCriteria: "none",

      // Nombre de jours utilisé quand `defaultCriteria` vaut `account_age`.
      defaultAccountAgeDays: 7,

      // Seuil du nombre de membres utilisé quand `defaultCriteria` vaut `server_size`.
      // Exemple : 1000 signifie vérification automatique si le serveur a moins de 1000 membres.
      serverSizeThreshold: 1000,

      // Limites de sécurité autorisées pour les exigences d'âge de compte.
      // 1 = jour minimum, 365 = jours maximum.
      minAccountAge: 1,
      maxAccountAge: 365,

      // Si true, l'utilisateur reçoit un DM après la vérification.
      sendDMNotification: true,

      // Descriptions lisibles pour chaque mode de critère.
      criteria: {
        account_age: "Account must be older than specified days",
        server_size: "All users if server has less than 1000 members",
        none: "All users immediately"
      }
    },

    // Temps minimum entre deux tentatives de vérification (millisecondes).
    // 5000 = 5 secondes.
    verificationCooldown: 5000,

    // Nombre maximum de tentatives échouées autorisées dans la fenêtre de temps ci-dessous.
    maxVerificationAttempts: 3,

    // Fenêtre de temps pour compter les tentatives (millisecondes).
    // 60000 = 1 minute.
    attemptWindow: 60000,

    // Limites de sécurité en mémoire (évite une croissance mémoire illimitée).
    maxCooldownEntries: 10000,
    maxAttemptEntries: 10000,
    // Fréquence de nettoyage des maps de cooldown/tentatives (millisecondes).
    // 300000 = 5 minutes.
    cooldownCleanupInterval: 300000,
    // Taille maximale des métadonnées pour les entrées d'audit (octets).
    maxAuditMetadataBytes: 4096,
    // Nombre maximum d'entrées d'audit conservées en mémoire.
    maxInMemoryAuditEntries: 1000,
    // Si true, journalise chaque action de vérification.
    logAllVerifications: true,
    // Si true, conserve l'historique d'audit de vérification.
    keepAuditTrail: true,
  },

  // =========================
  // MESSAGES DE BIENVENUE / DÉPART
  // =========================
  welcome: {
    // Modèle de message de bienvenue publié quand un utilisateur rejoint.
    // Placeholders : {user}, {server}, {memberCount}
    defaultWelcomeMessage:
      "Welcome {user} to {server}! We now have {memberCount} members!",
    // Modèle de message de départ publié quand un utilisateur quitte.
    // Placeholders : {user}, {memberCount}
    defaultGoodbyeMessage:
      "{user} has left the server. We now have {memberCount} members.",
    // ID du salon pour les messages de bienvenue.
    defaultWelcomeChannel: null,
    // ID du salon pour les messages de départ.
    defaultGoodbyeChannel: null,
  },

  // =========================
  // SALONS COMPTEURS
  // =========================
  counters: {
    defaults: {
      // Modèles de nom/description par défaut pour les entrées de compteur.
      name: "{name} Counter",
      description: "Server {name} counter",
      // Type de salon utilisé pour les compteurs (généralement "voice").
      type: "voice",
      // Format du nom du salon. `{count}` est remplacé automatiquement.
      channelName: "{name}-{count}",
    },
    permissions: {
      // Permissions refusées par défaut pour le salon compteur.
      deny: ["VIEW_CHANNEL"],
      // Permissions autorisées par défaut pour le salon compteur.
      allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
    },
    messages: {
      // Messages de réponse par défaut pour les actions de compteur.
      created: "✅ Created counter **{name}**",
      deleted: "🗑️ Deleted counter **{name}**",
      updated: "🔄 Updated counter **{name}**",
    },
    types: {
      // Types de compteurs intégrés et comment chaque compte est calculé.
      members: {
        name: "👥 Members",
        description: "Total members in the server",
        getCount: (guild) => guild.memberCount.toString(),
      },
      bots: {
        name: "🤖 Bots",
        description: "Total bot accounts in the server",
        getCount: (guild) =>
          guild.members.cache.filter((m) => m.user.bot).size.toString(),
      },
      members_only: {
        name: "👤 Humans",
        description: "Total human members (non-bots)",
        getCount: (guild) =>
          guild.members.cache.filter((m) => !m.user.bot).size.toString(),
      },
    },
  },

  // =========================
  // MESSAGES GÉNÉRIQUES DU BOT
  // =========================
  messages: {
    noPermission: "You do not have permission to use this command.",
    cooldownActive: "Please wait {time} before using this command again.",
    errorOccurred: "An error occurred while executing this command.",
    missingPermissions:
      "I am missing required permissions to perform this action.",
    commandDisabled: "This command has been disabled.",
    maintenanceMode: "The bot is currently in maintenance mode.",
  },

  // =========================
  // ACTIVATION/DÉSACTIVATION DES FONCTIONNALITÉS
  // =========================
  // Mets n'importe quelle fonctionnalité à `false` pour la désactiver globalement.
  features: {
    // Systèmes principaux.
    economy: true,
    leveling: true,
    moderation: true,
    logging: true,
    welcome: true,

    // Systèmes d'engagement communautaire.
    tickets: true,
    giveaways: true,
    birthday: true,
    counter: true,

    // Systèmes de sécurité et d'auto-gestion.
    verification: true,
    reactionRoles: true,
    joinToCreate: true,

    // Modules utilitaires/confort.
    voice: true,
    search: true,
    tools: true,
    utility: true,
    community: true,
    fun: true,
  },
};

export function validateConfig(config) {
  const errors = [];

  if (process.env.NODE_ENV !== 'production') {
    logger.debug('Environment variables check:');
    logger.debug('DISCORD_TOKEN exists:', !!process.env.DISCORD_TOKEN);
    logger.debug('TOKEN exists:', !!process.env.TOKEN);
    logger.debug('CLIENT_ID exists:', !!process.env.CLIENT_ID);
    logger.debug('GUILD_ID exists:', !!process.env.GUILD_ID);
    logger.debug('POSTGRES_HOST exists:', !!process.env.POSTGRES_HOST);
    logger.debug('NODE_ENV:', process.env.NODE_ENV);
  }

  if (!process.env.DISCORD_TOKEN && !process.env.TOKEN) {
    errors.push("Bot token is required (DISCORD_TOKEN or TOKEN environment variable)");
  }

  if (!process.env.CLIENT_ID) {
    errors.push("Client ID is required (CLIENT_ID environment variable)");
  }

  if (process.env.NODE_ENV === 'production') {
    if (!process.env.POSTGRES_HOST) {
      errors.push("PostgreSQL host is required in production (POSTGRES_HOST environment variable)");
    }
    if (!process.env.POSTGRES_USER) {
      errors.push("PostgreSQL user is required in production (POSTGRES_USER environment variable)");
    }
    if (!process.env.POSTGRES_PASSWORD) {
      errors.push("PostgreSQL password is required in production (POSTGRES_PASSWORD environment variable)");
    }
  }

  return errors;
}

const configErrors = validateConfig(botConfig);
if (configErrors.length > 0) {
  logger.error("Bot configuration errors:", configErrors.join("\n"));
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
}

export const BotConfig = botConfig;

export function getColor(path, fallback = "#99AAB5") {
  
  if (typeof path === "number") return path;
  if (typeof path === "string" && path.startsWith("#")) {
    
    return parseInt(path.replace("#", ""), 16);
  }
  const result = path
    .split(".")
    .reduce(
      (obj, key) => (obj && obj[key] !== undefined ? obj[key] : fallback),
      botConfig.embeds.colors,
    );
  
  if (typeof result === "string" && result.startsWith("#")) {
    return parseInt(result.replace("#", ""), 16);
  }
  return result;
}

export function getRandomColor() {
  const colors = Object.values(botConfig.embeds.colors).flatMap((color) =>
    typeof color === "string" ? color : Object.values(color),
  );
  return colors[Math.floor(Math.random() * colors.length)];
}

export default botConfig;
