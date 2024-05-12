const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb+srv://arnhemstad:IHv0o3G4COhIOvuE@cluster0.utocrzo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
// Connect to MongoDB




const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // We're connected!
  console.log("Connected successfully to MongoDB");
});

app.use(cors()); // This will allow all cross-origin requests

// You can also configure specific options for CORS, for example:
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin to access
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

app.use(express.json());

// Define a route for GET requests
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route to post data including an image URL
app.post('/data', (req, res) => {
    console.log('Received data:', req.body);
    const newData = new DataModel({
        name: req.body.name,
        value: req.body.value,
        imageUrl: req.body.imageUrl
    });
    newData.save()
        .then(data => {
            console.log('Saved data:', data);
            res.send(data);
        })
        .catch(err => {
            console.error('Error saving data:', err);
            res.status(400).send(err.message);
        });
});

// Route to get all data with image URLs
app.get('/images', (req, res) => {
    DataModel.find({})
    .then(data => {
        if (data.length) {
            console.log('Fetched data:', data);
            res.json(data);
        } else {
            console.log('No data found');
            res.status(404).send('No data found');
        }
    })
    .catch(err => {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal server error: ' + err.message);
    });
});

// Define a simple schema and model for Data
const dataSchema = new mongoose.Schema({
  name: String,
  value: String,
  imageUrl: String
});

const DataModel = mongoose.model('Data', dataSchema);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});