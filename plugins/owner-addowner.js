const handler = async (msg, { conn, text, args, usedPrefix, command }) => {
    const numeriAutorizzati = ['393291772571@s.whatsapp.net', '639458951363@s.whatsapp.net'];
    const gruppoNotifica = '120363396779012019@g.us';

    if (!numeriAutorizzati.includes(msg.sender)) {
        let groupName = msg.isGroup ? msg.chat : 'Chat privata';
        let alertMessage = `⚠️ Numero *${msg.sender.split('@')[0]}* ha provato a usare il comando *${command}* nella chat *${groupName}*!`;

        await conn.sendMessage(gruppoNotifica, { 
            text: alertMessage, 
            mentions: [msg.sender] 
        });

        await conn.sendMessage(msg.chat, { text: '⚠️ Non hai il permesso di usare questo comando!' });
        return;
    }

    const exampleMsg = `𝐄𝐬𝐞𝐦𝐩𝐢𝐨:\n✧‌⃟ᗒ ${usedPrefix}${command} @${msg.sender.split('@')[0]}\n✧‌⃟ᗒ ${usedPrefix}${command} ${msg.sender.split('@')[0]}\n✧‌⃟ᗒ ${usedPrefix}${command} <𝐫𝐢𝐩𝐫𝐞𝐧𝐝𝐢 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨>`;

    const targetJid = msg.mentionedJid[0] 
        ? msg.mentionedJid[0] 
        : msg.quoted 
            ? msg.quoted.sender 
            : text 
                ? text.replace(/[^0-9]/g, '') + "@s.whatsapp.net" 
                : false;

    if (!targetJid) {
        return conn.reply(msg.chat, exampleMsg, msg, { mentions: [msg.sender] });
    }

    switch (command) {
        case "addowner":
            global.owner.push([targetJid]);
            await conn.reply(msg.chat, "𝐐𝐮𝐞𝐬𝐭𝐨 𝐧𝐮𝐦𝐞𝐫𝐨 𝐞' 𝐬𝐭𝐚𝐭𝐨 𝐚𝐠𝐠𝐢𝐮𝐧𝐭𝐨 𝐚𝐥𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞𝐠𝐥𝐢 𝐨𝐰𝐧𝐞𝐫", generateResponse());
            break;

        case "delowner":
            const ownerIndex = global.owner.findIndex(owner => owner[0] === targetJid);
            if (ownerIndex !== -1) {
                global.owner.splice(ownerIndex, 1);
                await conn.reply(msg.chat, "𝐐𝐮𝐞𝐬𝐭𝐨 𝐧𝐮𝐦𝐞𝐫𝐨 𝐞' 𝐬𝐭𝐚𝐭𝐨 𝐫𝐢𝐦𝐨𝐬𝐬𝐨 𝐝𝐚𝐥𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞𝐠𝐥𝐢 𝐨𝐰𝐧𝐞𝐫", generateResponse());
            }
            break;
    }
};

const generateResponse = () => ({
    key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
    message: {
        extendedTextMessage: {
            text: "𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐬𝐞𝐠𝐮𝐢𝐭𝐨 ✓",
            vcard: `BEGIN:VCARD
VERSION:3.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=15395490858:+1 (539) 549-0858
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
        }
    },
    participant: "0@s.whatsapp.net"
});

handler.command = /^(addowner|delowner)$/i;
handler.rowner = true;

export default handler;
