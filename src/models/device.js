let mongoose = require('mongoose')
let validator = require('validator')

let deviceSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
    }
  },
  updatedAt: Date,
  createdAt: Date
})

deviceSchema.pre('save', function (next) {
    let now = Date.now()
     
    this.updatedAt = now
    // Set a value for createdAt only if it is null
    if (!this.createdAt) {
      this.createdAt = now
    }
    
    // Call the next function in the pre-save chain
    next()    
  })

module.exports = mongoose.model('Device', deviceSchema)