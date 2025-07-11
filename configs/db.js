const mongoose = require('mongoose')
require('dotenv').config()

const ConnectDB = async()=> {
    try {
            const db = await mongoose.connect(process.env.MONGO_URL)
            console.log('Connected successfully')
    }catch(error){
        console.error('failed to connect')
        process.exit(1)
    }
}

module.exports = ConnectDB