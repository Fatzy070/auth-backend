const path = require('path')
const multer = require('multer')

const uploadpath = path.join(__dirname, '..', 'public', 'images')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadpath) // ✅ Fixed 'req'
    },
    filename: (req, file, cb) => {
        let originalFileName = file.originalname
        let fileExtension = path.extname(originalFileName)
        let newName = `file_${Date.now()}${fileExtension}`
        cb(null, newName) // ✅ Pass filename properly
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        let fileExtension = path.extname(file.originalname).toLowerCase()
        let acceptTypes = ['.jpg', '.png', '.gif', '.jpeg']

        if (acceptTypes.includes(fileExtension)) {
            cb(null, true)
        } else {
            cb(new Error('Only image files are allowed!'))
        }
    }
})

module.exports = upload
