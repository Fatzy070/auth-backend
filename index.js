const express = require('express')
const server = express()
const PORT = process.env.PORT || 5000
const path = require('path')
const flash = require('express-flash')
const session = require('express-session')
const ConnectDB = require('./configs/db')
ConnectDB()
server.use(express.urlencoded({ extended: true  }))

server.use(session({
    secret:'7437e62c3b9898a52ad1e367077c67781518b9ea83b4b8bcad503bef4bb68ea79adfcfbb863c0586b93a012deec16881447d77d42c48427c55e0961d451aba56',
    resave: false ,
    saveUninitialized: true
}))
server.use(flash())

server.set('views' , path.join(__dirname , 'views'))
server.set('view engine' , 'ejs')
server.use('/' , require('./routes/PageRoutes'))


server.listen(PORT , ()=> 
    console.log(`server is running port ${PORT}`)
)