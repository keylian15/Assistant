import { createDir, getCoursName } from "#utils/utils.js";

/**
 * Fonction qui me permet de récupérer le cours actuel
 * @param {Any[]} edt L'emploi du temps au complet
 * @returns Le cours actuel
 */
export function getCurrentCours(edt) {
    // On récupére la date et l'heure
    const now = new Date();

    // On récupére les cours
    edt.sort((a, b) => new Date(b.start) - new Date(a.start));

    // On séléctionne le cours actuel :
    const currentCours = edt.find((cour) => {
        const start = new Date(cour.start);
        const end = new Date(cour.end);

        return now >= start && now <= end;
    });

    return currentCours;
}

// Ouvrir le dossier de la matiere dans Vscode
export function openWorkspace(currentCours) {

    // On vérifie que le cours existe
    if (!currentCours) {
        return false
    }

    // On récupére le nom de la matiere formatée
    const matiere = getCoursName(currentCours['summary'])
    console.log(matiere);
    
    // On créer le répertoire
    createDir(matiere)
}
