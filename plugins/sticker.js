const {inrl} = require("../lib/");
const fs = require("fs");
const path = require("path");

inrl(
  {
    pattern: "sticker",
    desc: "It cnvert image to sticker",
    react: "🔁",
    type : 'converter',
    usage : "to convert short video or image to sticker fromate, ex:- sticker[repleyed_msg]"
  },
  async (message, match, data) => {
  let {STICKER_DATA} = data;
    if (!/image|video|webp/.test(message.client.mime)) return await message.send(
          "Reply to Supported media With Caption"
        );
    try {
     if (message.quoted.mime) {
        let download = await message.quoted.download();
        message.client.sendFile(message.from, download, "", message, {
          asSticker: true,
          author: STICKER_DATA.split(';')[0],
          packname: STICKER_DATA.split(';')[1],
          categories: ["😄", "😊"],
        });
      } else if (/image|video|webp/.test(message.client.mime)) {
        let download = await message.client.downloadMediaMessage(message);
        message.client.sendFile(message.from, download, "", message, {
          asSticker: true,
          author: STICKER_DATA.split(';')[0],
          packname: STICKER_DATA.split(';')[1],
          categories: ["😄", "😊"],
        });
      } else {
        return await message.send(
          "*_Reply to Supported media With Caption_*"
        );
      }
    } catch (error) {
      return await message.send(
        error
      );
    }
  }
);
