// Import ImageKit class from ImageKit Node.js package
const { ImageKit } = require("@imagekit/nodejs");

// Create ImageKit instance using private key from .env file
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Function to upload file to ImageKit
async function uploadFile(buffer) {

    // Print buffer data in terminal for debugging
    console.log(buffer);

    // Upload file to ImageKit
    const result = await imagekit.files.upload({

        // Convert buffer/binary data into Base64 format
        file: buffer.toString("base64"),

        // Name of the uploaded file
        fileName: "image.jpg",
    });

    // Return uploaded file result/url/details
    return result;
}

// Export uploadFile function to use in other files
module.exports = uploadFile;