const Guest = require('../models/guestlist')
const HostInvite = require('../models/hostinvite')
const router = require('express').Router();

router.post('/invite', async(req, res) => {
  try{
    const invitedetails = await HostInvite.create(req.body)
    res.status(200).json(invitedetails)
  }catch(error){
    console.error(error)
    res.status(400).json({ message: error.message })
  }
})

router.post('/guestlist', async(req, res) => {
  try{
    const newguest = await Guest.create(req.body)
    res.status(200).json(newguest)
  }catch(error){
    console.error(error)
    res.status(400).json({ message: error.message })
  }
})

router.get('/guestlist', async (req, res) => {
  try{
    const allguest = await Guest.find({})
    res.status(200).json(allguest)
  }catch(error){
    console.error(error);
    res.status(400).json({ message: error.message });
  }
})

router.put('/guest', async (req, res) => {
  try {
    const guestCountUpdated = await Guest.findOneAndUpdate({ email: req.body.email }, {howmany: req.body.howmany} , { new: true })
    res.status(200).json(guestCountUpdated)
  }catch(error){
    console.error(error);
    res.status(400).json({ message: error.message })
  }
})

router.put('/guest/response', async (req, res) => {
  console.log(req.body.message)
  console.log(req.body)

  try {
    const guestMsgUpdated = await Guest.findOneAndUpdate({ email: req.body.email }, {responsemessage: req.body.message} , { new: true })
    res.status(200).json(guestMsgUpdated)
  }catch(error){
    console.error(error);
    res.status(400).json({ message: error.message })
  }
})

router.post('/guest', async (req, res) => {
  try {
    const guestEmailfound = await Guest.findOne({ email: req.body.email })
    res.status(200).json(guestEmailfound)
  }catch(error){
    console.error(error);
    res.status(400).json({ message: error.message })
  }
})

router.get('/guest/:id', async (req, res) => {
  try{
    const foundInvite = await HostInvite.findById(req.params.id)
    console.log(foundInvite)
    res.status(200).json(foundInvite)
  }catch(error){
    console.error(error);
    res.status(400).json({ message: error.message });
  }
})

module.exports = router;
