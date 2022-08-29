const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstack.qc7urho.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})


const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  mongoose
    .connect(url)
    Person.find({}).then((result) => {
      console.log('phonebook:')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  mongoose
    .connect(url)
    .then((result) => {
      console.log(`added ${person.name} number ${person.number} to database`)
      return person.save()
    })
    .then((result) => {
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}