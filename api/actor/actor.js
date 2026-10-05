const express = require('express'); //Separar rutas para organizacion
const router = express.Router();

const db = require ('../config/conex'); //Script para conexion con base de datos

//CREAR ACTOR -> POST
router.post('/', async function(req, res){

    const name = req.body.name;
    const year = req.body.year;

    const [result] = await db.query('INSERT INTO actores (nombre_completo, anyo_nacimiento) VALUES (?, ?) ', [name, year]);
    res.status(201).json({message: 'Actor creado', id: result.insertId});

});

//MODIFICAR ACTOR

router.put('/:id', async function(req, res){

    const id = req.params.id;

    const name = req.body.name;
    const year = req.body.year;

    await db.query('UPDATE actores SET nombre_completo = ?, anyo_nacimiento = ? WHERE id = ?', [name, year, id]);
    res.json({message: 'Actor modificado'});
});

//BORRAR ACTOR

router.delete('/:id', async function(req,res){

    const id = req.params.id;

    await db.query('DELETE FROM actores WHERE id = ?', [id]);
    res.json({message: 'Actor borrado'});

});

module.exports = router;