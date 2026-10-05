const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/actor', require('./actor/actor'));
app.use('/api/pelicula', require('./pelicula/pelicula'));

const port = 3000;
app.listen(port, function(){
    console.log('API escuchando en http://localhost:' + port);
});