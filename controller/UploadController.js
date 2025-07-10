const fspromises = require('fs').promises
const path = require('path')

const imgDir = path.join(__dirname , '..' , 'public' , 'images')


const uploadPage = async(req , res) => {
    let files = await fspromises.readdir(imgDir)
    let images = []
    files.forEach( files => images.push(`/images/${files}`))
     console.log(images)
     const error = req.flash("error")
     res.render('upload' , { images , error })
}

const uploadfile = async(req , res)=>{
    console.log(req.file)
    res.redirect('/upload')
}

module.exports = { uploadPage , uploadfile }