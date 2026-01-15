import ical from 'node-ical';
import { getConfig } from '#utils/utils.js';

/**
 * Récupère et parse l'emploi du temps ICS en fonction du groupe
 * @param {string} url
 * @returns {Promise<Array>}
 */
export async function fetchEdt(url) {
    // On récupère les données de l'EDT
    const data = await ical.async.fromURL(url);

    const cours = [];

    const config = await getConfig();
    const group = config['settings']['group']; // BUT3-TD1-TPA

    // On traite le groupe, il peut y avoir BUT3-TPA ou BUT3-TD1
    const group1 = group.split('-')[0] + '-' + group.split('-')[2];
    const group2 = group.split('-')[0] + '-' + group.split('-')[1];


    for (const key in data) {
        const event = data[key];

        if (event.type === 'VEVENT') {

            if (event.description.includes(group1) || event.description.includes(group2)) {
                // On ajoute le cours à la liste
                cours.push({
                    summary: event.summary, // Nom de la matiere
                    start: event.start, // Heure de début
                    end: event.end, // Heure de fin
                    location: event.location, // Salle
                    description: event.description, // Autre info : groupe, prof, et l'export
                });
            }
        }
    }

    return cours;
}
