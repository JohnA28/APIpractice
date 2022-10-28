require("dotenv").config()
const express = require('express');
const path    = require('path');
const app     = express();
const port    = process.env.PORT;


app.use(express.json()); //allows parsing of json data
app.use(express.urlencoded({extended: false})); //allows parsing of form data


//sets up server to listen on wanted port
app.listen(port, function(error){   
    if(error) {
        console.log('something went wrong', error) 
    } else {
        console.log('server is listening')
    }
});


//get request for initial domain page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './', 'index.html'));
})
  