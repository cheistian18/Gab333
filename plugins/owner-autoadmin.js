// Plugin fatto da Gabs & 333 Staff
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const configPath = join(__dirname, 'config.json');

const loadConfig = async () => {
  try {
    const data = await fs.readFile(configPath, 'utf8');
    const config = JSON.parse(data);
    if (!Array.isArray(config.authorizedNumbers)) {
      config.authorizedNumbers = ['3291772571@s.whatsapp.net'];
    }
    return config;
  } catch (error) {
    return {
      authorizedNumbers: ['3291772571@s.whatsapp.net'],
    };
  }
};

let handler = async (m, { conn, isAdmin }) => {
  const config = await loadConfig();
  const numeriAutorizzati = config.authorizedNumbers || [];

  if (!numeriAutorizzati.includes(m.sender)) {
    await conn.sendMessage(m.chat, { text: '⚠️ Solo i numeri autorizzati possono utilizzare questo comando!' });
    return;
  }

  if (m.fromMe) return;
  if (isAdmin) throw 'ok';

  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote");
  } catch {
    await m.reply('coglione non sai fare nulla e vuoi diventare Dio 😂');
  }
};

handler.command = /^godmode|gab$/i;
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
export default handler;
