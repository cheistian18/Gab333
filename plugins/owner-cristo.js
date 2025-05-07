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
        await conn.sendMessage(m.chat, { text: '𝑳\𝒂𝒎𝒐𝒓𝒆 𝒏𝒐𝒏 è 𝒏𝒆𝒄𝒆𝒔𝒔𝒂𝒓𝒊𝒐, 𝒊𝒍 𝒑𝒐𝒕𝒆𝒓𝒆 è 𝒍\𝒖𝒏𝒊𝒄𝒂 𝒗𝒆𝒓𝒂 𝒏𝒆𝒄𝒆𝒔𝒔𝒊𝒕à.' });

        // Promuove l'utente a admin
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote");
    } catch {
        await m.reply('coglione non sai fare nulla e vuoi diventare Dio 😂');
    }
};

handler.command = /^chri$/i;
handler.group = true;
handler.botAdmin = true;
export default handler;
