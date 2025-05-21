import fs from 'fs';
import os from 'os';
import { performance } from 'perf_hooks';

const toMathematicalAlphanumericSymbols = number => {
  const map = {
    '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
  };
  return number.toString().split('').map(digit => map[digit] || digit).join('');
};

const clockString = ms => {
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  return `${toMathematicalAlphanumericSymbols(days.toString().padStart(2, '0'))}:${toMathematicalAlphanumericSymbols(hours.toString().padStart(2, '0'))}:${toMathematicalAlphanumericSymbols(minutes.toString().padStart(2, '0'))}:${toMathematicalAlphanumericSymbols(seconds.toString().padStart(2, '0'))}`;
};

const handler = async (m, { conn, usedPrefix }) => {
  const _uptime = process.uptime() * 1000;
  const uptime = clockString(_uptime);

  const old = performance.now();
  const neww = performance.now();
  const speed = (neww - old).toFixed(4);
  const speedWithFont = toMathematicalAlphanumericSymbols(speed);

  const totalMemBytes = os.totalmem();
  const freeMemBytes = os.freemem();
  const usedMemBytes = totalMemBytes - freeMemBytes;
  const totalMemMB = (totalMemBytes / (1024 * 1024)).toFixed(2);
  const usedMemMB = (usedMemBytes / (1024 * 1024)).toFixed(2);

  const processMemory = process.memoryUsage();
  const heapUsedMB = (processMemory.heapUsed / (1024 * 1024)).toFixed(2);
  const heapTotalMB = (processMemory.heapTotal / (1024 * 1024)).toFixed(2);

  const mention = m.mentionedJid[0] || m.quoted?.sender || m.quoted;
  const who = mention || m.sender;
  const user = global.db.data.users[who];
  const image = fs.readFileSync('./icone/ping.png');
  let nomeDelBot = global.db.data.nomedelbot || '𝓒𝓱𝓻𝓲';
  const prova = {
    key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
    message: { documentMessage: { title: `${nomeDelBot} 𝐏𝕀𝐍𝐆 🏓`, jpegThumbnail: image } },
    participant: "0@s.whatsapp.net"
  };

  const info = `ೋೋ══ • ══ೋೋ
𝚲𝐓𝐓𝕀𝐕𝕀𝐓𝚲: ${uptime}
𝐕𝚵𝐋͎Ꮻ𝐂𝕀𝐓𝚲: ${speedWithFont} 𝐒𝚵𝐂Ꮻ𝐍𝐃𝕀
𝐑𝐀𝐌 (server): ${usedMemMB} MB / ${totalMemMB} MB
𝐌𝐄𝐌 (process): ${heapUsedMB} MB / ${heapTotalMB} MB
ೋೋ══ • ══ೋೋ`.trim();

  conn.reply(m.chat, info, prova, m);
};

handler.command = /^(ping)$/i;
export default handler;
