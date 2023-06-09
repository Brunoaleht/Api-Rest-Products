const mongoose = require('mongoose')

async function main() {
  await mongoose.connect('mongodb+srv://brunoaleh1:francisco123@angular-back.eb0l8ap.mongodb.net/?retryWrites=true&w=majority')
  console.log('Connected in Mongoose')
}

main().catch((err) => console.log(err))

module.exports = mongoose