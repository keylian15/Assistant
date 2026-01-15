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
