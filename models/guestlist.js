const { Schema, model } = require('mongoose');

const guestSchema = new Schema ({
  name: { type: String},
  email:{ type: String},
  phonenumber: { type: Number},
  responsemessage:{type: String},
  howmany:{type:Number, default: 0}
  }
)

module.exports = model('Guest', guestSchema);
