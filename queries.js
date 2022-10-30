const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})


//will retrieve everyone's name and rank
const getPlayers = (request, response) => {
    pool.query('SELECT * FROM stack ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }



  //will retrieve specific person's name and rank
  const getPlayerById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM stack WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  //will add a person's name and rank
  const createPlayer = (request, response) => {
    const { name, rank } = request.body
  
    pool.query('INSERT INTO stack (name, rank) VALUES ($1, $2) RETURNING *', [name, rank], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

  //will update player's name and rank
  const updatePlayer = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, rank } = request.body
  
    pool.query(
      'UPDATE stack SET name = $1, rank = $2 WHERE id = $3',
      [name, rank, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Player modified with ID: ${id}`)
      }
    )
  }


  //will delete player fron db
  const deletePlayer = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM stack WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Player deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
  }