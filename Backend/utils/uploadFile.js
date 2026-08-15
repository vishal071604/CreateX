const { ImageKit } = require("@imagekit/nodejs");

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error(
    "IMAGEKIT_PRIVATE_KEY is missing in Backend/.env"
  );
}

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(buffer, originalName) {
  return imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName: `createx-${Date.now()}-${originalName}`,
  });
}

module.exports = uploadFile;