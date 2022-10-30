require("dotenv").config();
const express = require('express');
const db      = require('./queries')
const app     = express();
const port    = process.env.DEV_PORT;


app.use(express.json()); //allows parsing of json data
app.use(express.urlencoded({extended: false})); //allows parsing of form data


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/players', db.getPlayers)
app.get('/players/:id', db.getPlayerById)
app.post('/players', db.createPlayer)
app.put('/players/:id', db.updatePlayer)
app.delete('/players/:id', db.deletePlayer)



//sets up server to listen on wanted port
app.listen(port, function(error){   
    if(error) {
        console.log('something went wrong', error) 
    } else {
        console.log('server is listening')
    }
});



  