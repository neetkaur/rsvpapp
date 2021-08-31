require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const path = require('path');
const rsvpController = require('./controllers/rsvp')
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI
const db = mongoose.connection;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
db.on('open', () => {
    console.log('Mongo Connected Successfully');
});

app.use(express.json());
if (process.env.NODE_ENV !== 'development'){
  app.use(express.static('public'))
}

app.use('/api/rsvp', rsvpController)

app.get('*', (req, res) => {
	res.sendFile(path.resolve(path.join(__dirname, 'public', 'index.html')))
})

app.use(express.json());
if (process.env.NODE_ENV !== 'development'){
  app.use(express.static('public'))
}

app.listen(PORT, () => {
    console.log(`API port ${PORT}`);
});
