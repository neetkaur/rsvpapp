const { Schema, model } = require('mongoose');

const hostinviteSchema = new Schema ({
  eventtype: { type: String},
  eventtitle:{ type: String},
  hostedby: { type: String},
  phonenumber: { type: Number},
  email:{ type: String},
  eventdate: { type: Date},
  location:{type:String},
  rsvpdeadline:{type:Date}
  }
)

module.exports = model('HostInvite', hostinviteSchema);
