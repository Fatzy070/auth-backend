const express = require('express')
const router = express.Router()
const upload = require('../middleware/multerupload')
const { uploadPage, uploadfile } = require('../controller/UploadController')
const isLoggedIn = require('../middleware/auth') // ✅ Import the guard

router.get('/', isLoggedIn, uploadPage)

router.post('/', isLoggedIn, (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      req.flash('error', err.message)
      return res.redirect('/upload')
    }

    return uploadfile(req, res)
  })
})



module.exports = router