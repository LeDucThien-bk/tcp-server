let mongoose = require('mongoose')

let accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokenkey: {
    type: String,
  },
  permission: {
    type: String,
  },
  listDevice: [String],
  listAreas: [String],
  lastLogin: Date,
  timeCreated: Date
})

accountSchema.pre('save', function (next) {
  let now = Date.now()
  this.lastLogin = now
  // Set a value for createdAt only if it is null
  if (!this.timeCreated) {
    this.timeCreated = now
  }
  // Call the next function in the pre-save chain
  next()
})

module.exports = mongoose.model('Account', accountSchema)