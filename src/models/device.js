let mongoose = require('mongoose')

let deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  phase: {
    type: Number,
    required: true,
  },
  script: {
    type: String,
    required: true,
  },
  cycle: {
    type: String,
    required: true,
  },
  Fa: [String],
  DA: [String],
  editedAt: Date,
  createdAt: Date
})

deviceSchema.pre('save', function (next) {
    let now = Date.now()     
    this.editedAt = now
    // Set a value for createdAt only if it is null
    if (!this.createdAt) {
      this.createdAt = now
    }    
    // Call the next function in the pre-save chain
    next()    
  })

module.exports = mongoose.model('Device', deviceSchema)