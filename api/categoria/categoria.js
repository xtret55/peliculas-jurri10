const express = require('express');
const router = express.Router();

const db = require('../config/conex');

router.get('/', async function (req, res){

    const [categorias] = await db.query('SELECT * FROM categorias');

    for (const categoria of categorias) {
        const [peliculas] = await db.query('SELECT * FROM peliculas WHERE categoria_id = ?', [categoria.id]);

        for (const pelicula of peliculas) {
            const [actores] = await db.query('SELECT actores.* FROM actores JOIN peliculas_actores ON actores.id = peliculas_actores.actor_id WHERE peliculas_actores.pelicula_id = ?', [pelicula.id]);
            pelicula.actores = actores;
        }

        categoria.peliculas = peliculas;
    }

    res.json(categorias);
});

module.exports = router;
