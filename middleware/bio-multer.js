const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValidMime = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid File Type!');
    if (isValidMime) {
      error = null;
    }
    callback(error, 'images/bio');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('-');
    const extension = MIME_TYPE_MAP[file.mimetype];
    callback(null, `${name}-${Date.now()}.${extension}`);
  },
});

module.exports = multer({ storage }).single('image');
