
var linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
var surveyRegex = /https?:\/\/(www\.)?whatsurvey\.com\/[^\s]+/i;

export async function before(msg, { isAdmin, isBotAdmin }) {
  if (msg.isBaileys && msg.fromMe) return true;
  if (!msg.isGroup) return false;
  var chatData = global.db.data.chats[msg.chat];
  var sender = msg.key.participant;
  var messageId = msg.key.id;
  var botSettings = global.db.data.settings[this.user.jid] || {};

  var foundLink = linkRegex.exec(msg.text);
  var foundSurveyLink = surveyRegex.exec(msg.text);

  if (isAdmin && chatData.antiLink && (msg.text.includes("https://chat.whatsapp.com") || foundSurveyLink)) return;
  if (chatData.antiLink && (foundLink || foundSurveyLink) && !isAdmin) {
    if (isBotAdmin) {
      var groupLink = "https://chat.whatsapp.com/" + (await this.groupInviteCode(msg.chat));
      if (msg.text.includes(groupLink)) return true;
    }
    if (isBotAdmin && botSettings.restrict) {
      var warningMessage = {
        'key': {
          'participants': "0@s.whatsapp.net",
          'fromMe': false,
          'id': "Halo"
        },
        'message': {
          'locationMessage': {
            'name': "𝐀𝐧𝐭𝐢 - 𝐋𝐢𝐧𝐤",
            'jpegThumbnail': await (await fetch("https://telegra.ph/file/a3b727e38149464863380.png")).buffer(),
            'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
          }
        },
        'participant': "0@s.whatsapp.net"
      };
      conn.reply(msg.chat, "⚠ 𝐋𝐈𝐍𝐊 𝐃𝐈 𝐀𝐋𝐓𝐑𝐈 𝐆𝐑𝐔𝐏𝐏𝐈 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈", warningMessage);
      await conn.sendMessage(msg.chat, { 'delete': { 'remoteJid': msg.chat, 'fromMe': false, 'id': messageId, 'participant': sender } });
    }
  }
}
```
