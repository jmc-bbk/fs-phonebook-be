const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })

// Validators

const validateNumberLength = number => number.length >= 8
const validateNumberHyphen = number => {
  index = number.indexOf('-')
  return (index === 2) || (index === 3)
}

const validateNumber = [
  {validator: validateNumberLength, msg: 'Number must be greater than 8 characters.'},
  {validator: validateNumberHyphen, msg: 'Hyphen must be the 3rd or 4th character.'}
]

const validateNameDoesNotExist = name => {

}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    unique: true
  },
  number: {
    type: String,
    validate: validateNumber
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
