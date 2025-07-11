const Auth = require('../model/auth')
const bcrypt = require('bcrypt')

const signUp = (req , res) => {
    res.render('sign-up')
}
const Create = async(req , res) => {
    try {
        const User = req.body 

        User.password = await bcrypt.hash(User.password , 10)
        await Auth.create(User)
        console.log(User)
        res.redirect('/')

    }catch(error){
        console.error('cannot create a new user')
        res.status(500).send('server error')
    }
}
const login = (req , res)=> {
    res.render('login' , { message: req.flash('error') })
}
const VerifyLogin = async(req , res) => {
    try {
        const { password , email } = req.body

        const user = await Auth.findOne({ email })
        if(!user){
            req.flash('error' , 'user not found')
            return res.redirect('/login')
        }

        const IsMatch = await bcrypt.compare(password , user.password)
        if(!IsMatch){
            req.flash('error' , 'Invalid password')
            return res.redirect('/login')
        }

        req.session.user = user 
        res.redirect('/dashboard')

    }catch(error){
        console.error('failed to login')
        res.status(500).send('server error')
    }
}
const dashboard = async(req , res) => {
    try {
        const allUsers = await Auth.find()

        res.render('dashboard' , {
        user: req.session.user ,
        users: allUsers
     })

    }catch(error){
        console.error(err)
        res.status(500).send('Server failed')
    }
}
const logout = (req , res)=> {
    req.session.destroy(()=> {
        res.redirect('/login')
    })
}


const deleteUser = async (req, res) => {
  try {
    const currentUser = req.session.user

    // Only admin fit delete
    if (currentUser.role !== 'admin') {
      return res.status(403).send('You are not authorized to delete users')
    }

    // Prevent admin from deleting himself (extra safe)
    if (currentUser._id === req.params.id) {
      return res.status(400).send("You can't delete yourself")
    }

    await Auth.findByIdAndDelete(req.params.id)
    res.redirect('/dashboard')
  } catch (err) {
    console.error('Delete error:', err)
    res.status(500).send('Server error')
  }
}

const makeAdmin = async () => {
  const user = await Auth.findOne({ email: 'cazitaha@mailinator.com' }) // put your email
  if (user) {
    user.role = 'admin'
    await user.save()
    console.log('User is now admin')
  } else {
    console.log('User not found')
  }
}

makeAdmin()

module.exports = { signUp , Create , login , VerifyLogin , dashboard , logout , deleteUser}