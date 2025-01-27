const multer = require('multer'); // Import multer
const path = require('path'); // Import path module 
const fs = require('fs'); // Import File System module

// Define supported file types (adjust for different file types you want to support)
const FILE_TYPE = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'image/tiff': 'tiff',
    'image/x-icon': 'ico',
    'image/vnd.microsoft.icon': 'ico',
    'image/heif': 'heif',
    'image/heic': 'heic',
    'image/avif': 'avif',
    'application/pdf': 'pdf',
    'text/plain': 'txt',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/zip': 'zip',
    'application/x-rar-compressed': 'rar'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isvalidFile = FILE_TYPE[file.mimetype];
        const uploadError = new Error('File type not supported');
        if (isvalidFile) {
            cb(null, 'uploads');
        } else {
            cb(uploadError, 'uploads');
        }
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE[file.mimetype] || path.extname(file.originalname);
        cb(null, `${fileName}-${Date.now()}${extension}`);
    }
});

// Middleware for uploading files
const uploadFile = multer({ storage: storage });

module.exports = uploadFile;

// After submitting any file, it will be stored in the 'uploads' folder
