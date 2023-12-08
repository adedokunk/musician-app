const express = require('express');
const path = require('path');
const store = require('./store/datastore');
const initialStoreData = require('./store/data');
const Musician = require('./models/musician');
const musicianRoutes = require('./routes/musician');

const app = express();
const port = process.env.PORT || 3001;

// Health check route pointing to the application
app.get('/musician', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Health check passed' });
});

// Include routes
app.use('/musician/api', musicianRoutes);

app.use(express.static('public'));

// Index route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Initialize store
const musician = new Musician(store);
musician.initStore(initialStoreData);
app.locals.musician = musician;

// Start server
const server = app.listen(port, () => {
  console.log("Server started on port " + port);
});

module.exports = server;
