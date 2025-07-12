const express = require('express')
const router = express.Router()
const upload = require('../middleware/multerupload')
const { uploadPage, uploadfile } = require('../controller/UploadController')
const isLoggedIn = require('../middleware/auth')

const fs = require('fs')
const path = require('path')
const imgDir = path.join(__dirname, '..', 'public', 'images')

// Get page
router.get('/', isLoggedIn, uploadPage)

// Upload file
router.post('/', isLoggedIn, (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      req.flash('error', err.message)
      return res.redirect('/upload')
    }

    return uploadfile(req, res)
  })
})

// Delete image
router.post('/delete-image', (req, res) => {
    const filename = req.body.filename
    const filePath = path.join(imgDir, filename)

    console.log('🔎 Received filename from form:', filename)
    console.log('📁 Full path trying to delete:', filePath)

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('❌ Error deleting file:', err.code, err.message)
            req.flash('error', `Error deleting file: ${err.code}`)
        } else {
            console.log('✅ File deleted:', filename)
            req.flash('success', 'File deleted successfully')
        }
        res.redirect('/upload')
    })
})


module.exports = router
