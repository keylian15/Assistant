import { fetchEdt } from './edt/fetchEdt.js';
import { getCurrentCours, openWorkspace } from './launcher/openWorkspace.js';
import { createDir, getConfig, getCoursName, loadJson } from './utils/utils.js';

const ICS_URL = 'https://edt.univ-littoral.fr/jsp/custom/modules/plannings/2XnmKA3r.shu';

async function main() {
    // try {
    let events = await fetchEdt(ICS_URL);

    //     console.log('📅 Emploi du temps brut :\n');

    //     // Trier les événements par date de début (du plus ancien au plus récent)
    //     events.sort((a, b) => new Date(b.start) - new Date(a.start));

    //     // Affichage normal : le plus ancien en premier, le plus récent en dernier
    //     events.forEach((event) => {
    //         console.log('Matière :\n Avant - ', event.summary);
    //         // console.log('Début   :', event.start);
    //         // console.log('Fin     :', event.end);
    //         // console.log('Lieu    :', event.location);
    //         // console.log('Desc.   :', event.description);

    //         console.log("Apres - ", getCoursName(event.summary), "\n\n");
    //     });
    // } catch (err) {
    //     console.error("❌ Erreur lors de la récupération de l'EDT");
    //     console.error(err.message);
    // }

    // await createDir("test")

    openWorkspace(getCurrentCours(events));
}

main();
