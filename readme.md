# 📅 EDT Auto Launcher

Application d'automatisation locale qui lance vos outils de travail (VS Code, commandes, applications...) en fonction de votre emploi du temps universitaire (ADE iCalendar).

## 🎯 Objectif

Développer une application Node.js légère et modulaire qui :

- Synchronise l'emploi du temps depuis ADE iCalendar (format ICS)
- Identifie le cours actuel ou à venir
- Interprète le nom de la matière
- Ouvre automatiquement le workspace VS Code correspondant
- S'exécute à l'heure prévue du cours, ou immédiatement si le PC était éteint
- Fonctionne en arrière-plan avec une empreinte système minimale
- Se configure entièrement via fichier de paramétrage

## 🧠 Principes de conception

**Ce que nous évitons :**
- API officielle inexistante → exploitation du standard iCalendar
- Vérifications continues inutiles → planification intelligente du prochain réveil
- Interface graphique en V1 → focus sur la stabilité

**Ce que nous privilégions :**
- Architecture modulaire et évolutive
- Configuration déclarative plutôt que logique codée en dur

## 🖥️ Environnement technique

- **Système** : Windows 11
- **Runtime** : Node.js
- **Multi-plateforme** : considéré pour les versions futures

## 📅 Gestion des données

- **Format** : iCalendar (.ics)
- **Source** : ADE Campus (plateforme universitaire)
- **Mode de fonctionnement** :
  - Détection en temps réel (cours actuel / prochain cours)
  - Pas de vision hebdomadaire en V1
- **Synchronisation** :
  - Relecture périodique du fichier ICS
  - Prise en compte automatique des modifications d'emploi du temps
  - Système de notifications prévu en V2

## ⚙️ Cycle d'exécution

1. Chargement des paramètres de configuration
2. Récupération et analyse du fichier ICS
3. Identification du cours en cours ou prochain
4. Calcul du moment d'exécution optimal
5. Mise en veille programmée du script
6. Au moment du déclenchement :
   - Analyse de la matière concernée
   - Application des règles de correspondance
   - Exécution des actions définies
7. Transition vers le cours suivant

## 🗂️ Système de configuration

L'intégralité du comportement applicatif est définie par configuration.

**Caractéristiques :**
- Association matière → actions
- Comportement par défaut paramétrable
- Création automatique de dossiers (optionnel)
- Extension des fonctionnalités sans modification du code

**Exemple de structure :**
```json
{
  "settings": {
    "refresh_time": "08:00",
    "on_unknown_subject": "do_nothing",
    "create_folder_if_missing": true
  },
  "subjects": {
    "Informatique": {
      "workspace": "C:/Cours/Informatique",
      "actions": [
        { "type": "vscode" }
      ]
    },
    "Node": {
      "workspace": "C:/Cours/Node",
      "actions": [
        { "type": "vscode" },
        { "type": "command", "cmd": "npm run dev" },
        { "type": "browser", "url": "http://localhost:3000" }
      ]
    }
  }
}
```

⚠️ *La structure définitive pourra être ajustée, l'approche reste identique.*

## 🧪 Gestion des scénarios particuliers

**PC éteint ou retard :**
- Si l'heure du cours est dépassée, les actions s'exécutent dès le démarrage
- Aucun événement n'est ignoré

**Matière non reconnue :**

Comportement paramétrable selon les préférences :
- Ne rien faire
- Appliquer une configuration générique
- Créer un dossier vide
- Consigner l'anomalie dans les logs

## 🔔 Système de notifications

**Version 1 :**
- Notifications uniquement en cas d'erreur

**Version 2 (prévue) :**
- Alertes de modifications d'emploi du temps
- Confirmations de lancement
- Avertissements système

## 💤 Optimisation des ressources

- Aucune boucle d'exécution continue
- Calcul intelligent du prochain point de réveil
- Utilisation CPU négligeable
- Empreinte mémoire minimale

## 🚀 Modes de démarrage

- Exécution manuelle
- Lancement automatique au démarrage Windows
- Mode service/arrière-plan (planifié)

## 🔮 Roadmap

**Version 2 :**
- Interface graphique utilisateur
- Vue hebdomadaire complète
- Notifications enrichies
- Actions personnalisables avancées

**Version 3 :**
- Compatibilité multi-OS
- Gestion de profils multiples
- Tableau de bord statistique
- Fonctionnalités de synchronisation

## 🧩 Ce que n'est pas ce projet

- ❌ Un gestionnaire de calendrier complet
- ❌ Une solution cloud
- ❌ Un système surchargé de fonctionnalités
- ❌ Un script temporaire ou jetable

## 📌 Vision du projet

EDT Auto Launcher est une solution d'automatisation personnelle conçue pour être :

- **Simple** à mettre en œuvre
- **Fiable** dans son exécution
- **Extensible** selon vos besoins
- **Discrète** dans son fonctionnement

Chaque choix technique vise à minimiser la complexité, éviter la sur-architecture, et garantir une évolution propre du projet.