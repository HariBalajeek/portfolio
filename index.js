const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const User = require('./models/user');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/yourdbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/views')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            area: req.body.area
        });

        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
        res.send('User registered successfully!');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error registering user');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
