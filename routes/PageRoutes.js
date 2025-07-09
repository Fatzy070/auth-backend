const express = require('express')
const router = express.Router()
const { signUp , Create , login , VerifyLogin , dashboard , logout , deleteUser} = require('../controller/PageController')
const IsLoggedIn = require('../middleware/auth')

router.get('/' , signUp)
router.post('/' , Create)
router.get('/login' , login)
router.post('/login' , VerifyLogin)
router.get('/dashboard' , IsLoggedIn ,  dashboard )
router.post('/logout' , logout)
router.post('/delete/:id', deleteUser)

module.exports = router