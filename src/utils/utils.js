import fs from 'fs/promises';
import path from 'path';

/**
 * Lire un fichier JSON local
 * @param {string} filePath - chemin relatif à src/
 * @returns {Promise<Object>} contenu du JSON
 */
export async function loadJson(filePath) {
    const fullPath = path.resolve(filePath);
    const data = await fs.readFile(fullPath, 'utf-8');
    return JSON.parse(data);
}

/**
 * Récupérer la config du fichier config.json
 * @returns {Promise<Object>} contenu de la config
 */
export async function getConfig() {
    return await loadJson('./config/config.json');
}

/**
 *
 * @param {String} name Le nom du dossier
 * @returns Le nom bien pour un nom de dossier
 */
export function getCoursName(name) {
    return name
        .replace(/\./g, '_')        // remplace tous les points
        .replace(/\s+/g, '_')       // remplace tous les espaces
        .replace(/_[A-Za-z]_+/g, '_') // supprime les lettres entre _
        .replace(/__+/g, '_')       // fusionne les double _
        .trim();
}


/**
 * Créer un dossier si il n'existe pas, ou le dossier parent si dirPath est null
 * @param {String|null} dirPath
 */
export async function createDir(dirPath = null) {
    const config = await getConfig();
    const parentFolder = config['settings']['parent_folder'];
    let fullPath = '';

    // Déterminer le chemin complet à créer
    fullPath = path.isAbsolute(dirPath)
        ? path.resolve(dirPath)
        : path.resolve(path.join(parentFolder, dirPath));

    try {
        // Vérifie si le dossier existe
        await fs.access(fullPath);
        console.log(`Dossier déjà existant : ${fullPath}`);
    } catch {
        // Si erreur, le dossier n'existe pas -> créer
        await fs.mkdir(fullPath, { recursive: true });
        console.log(`Dossier créé : ${fullPath}`);
    }
}
