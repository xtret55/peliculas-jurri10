const express = require('express'); //Separar rutas para organizacion
const router = express.Router();

const db = require ('../config/conex'); //Script para conexion con base de datos

//BUSCAR PELICULA
router.get('/:id', async function (req, res){

    const id = req.params.id;

    const [result] = await db.query('SELECT * FROM peliculas WHERE id = ?', [id]);
    const [actores] = await db.query('SELECT  * FROM actores JOIN peliculas_actores ON actores.id = peliculas_actores.actor_id WHERE peliculas_actores.pelicula_id = ?', [id]);
    res.json(result[0], actores);  
});

router.get('/', async function (req, res){

    const nombre = req.query.nombre;

    const [result] = await db.query('SELECT * FROM peliculas WHERE nombre_completo LIKE ? LIMIT 1', [nombre]);
    const id = result[0].id;
    const [actores] = await db.query('SELECT  * FROM actores JOIN peliculas_actores ON actores.id = peliculas_actores.actor_id WHERE peliculas_actores.pelicula_id = ?', [id]);

    res.json(result[0], actores);  
});


//CREAR PELICULA

//CREAR PELICULA
router.post('/', async function (req,res) {
    const name = req.body.name;
    const year = req.body.year;
    const actores = req.body.actores;

    const [result] = await db.query('INSERT INTO peliculas (nombre, anyo_publicacion) VALUES (?, ?)', [name, year]);
    const id = result.insertId;

    for (const actorId of actores)  {
        await db.query('INSERT INTO peliculas_actores (pelicula_id, actor_id) VALUES (?, ?)', [id, actorId]);
    }

    res.status(201).json({message: 'Pelicula creada', id: id});
});


//BORRAR PELICULAR

router.delete('/:id', async function(req,res){

    const id = req.params.id;

    const [result] = await db.query('DELETE FROM peliculas WHERE id = ?', [id]);
    res.json({message: 'Pelicula borrada'});
});


//MODIFICAR PELICULA (Nombre, ano, +actor, -actor)

router.put('/:id', async function(req,res){

    const id = req.params.id;

    const name = req.body.name;
    const year = req.body.year;

    const [result] = await db.query('UPDATE peliculas SET nombre = ?, anyo_publicacion = ? WHERE id = ?', [name, year, id]);
    res.json({message: 'Pelicula modificada'});
});

router.post('/:id/actores', async function(req,res){

    const id = req.params.id;

    const actorId = req.body;

    const [result] = await db.query ('INSERT INTO peliculas_actores (pelicula_id, actor_id) VALUES (?,?)', [id, actorId]);
    res.status(201).json({message: 'Actor anadido a pelicula'});

});

router.delete('/:id/actores/:actorId', async function(req,res){

    const id = req.params.id;
    const actorId = req.params.actorId;

    const [result] = await db.query('DELETE FROM peliculas_actores WHERE pelicula_id = ? AND actor_id = ?', [id, actorId]);
    res.json({message: 'Actor quitado de la pelicula'});
});

module.exports = router;