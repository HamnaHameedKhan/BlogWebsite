const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  // cloud_name : process.env.CLOUD_NAME,
  // api_key : process.env.API_KEY,
  // api_secret : process.env.API_SECRET,

  cloud_name: 'dfjpqdcmi',
  api_key: 189511156677287,
  api_secret: 'HHGFRNSQzNCOoPHvZMoIq2NR3pQ'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blogs',
    allowedFormats: ['jpg', 'png'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload