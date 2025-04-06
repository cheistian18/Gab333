let handler = async (m, { conn, isAdmin }) => {  
    // Numero autorizzato
    const numeroAutorizzato = '393291772571@s.whatsapp.net'; // Sostituisci con il numero autorizzato

    // Verifica se l'utente che esegue il comando è il numero autorizzato
    if (m.sender !== numeroAutorizzato) {
        await conn.sendMessage(m.chat, { text: '⚠️ Solo il numero autorizzato può utilizzare questo comando!' });
        return;
    }

    if (m.fromMe) return;
    if (isAdmin) throw 'ok';

    try {  
        // Invia il messaggio prima di eseguire l'azione
        await conn.sendMessage(m.chat, { text: '𝐝𝐢𝐬𝐜𝐞𝐩𝐨𝐥𝐢, 𝐜𝐫𝐢𝐬𝐭𝐨 𝐚𝐯𝐫𝐚̀ 𝐬𝐞𝐦𝐩𝐫𝐞 𝐢𝐥 𝐩𝐨𝐭𝐞𝐫𝐞 𝐬𝐮 𝐝𝐢 𝐯𝐨𝐢.' });

        // Promuove l'utente a admin
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote");
    } catch {
        await m.reply('coglione non sai fare nulla e vuoi diventare Dio 😂');
    }
};

handler.command = /^cristo$/i;
handler.group = true;
handler.botAdmin = true;
export default handler;
