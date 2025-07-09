const IsLoggedIn = (req , res , next) => {
    if(req.session && req.session.user){
        next()
    }else {
        req.flash('error' , 'You must be logged in to view this page')
        res.redirect('/login')
    }
}

module.exports = IsLoggedIn