const { Pool } = require("pg");

let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

const db = new Pool(dbParams);

db.connect(() => {
  console.log(`connected to db ${process.env.DB_PORT}`);
});

//function to retrieve the userid based on email
const getUserByEmail = (email) => {
  return db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then(data => {
      if (data.rows[0] === undefined) {
        return false
      } else {
        return data.rows[0]
      }

    })
    .catch(err => console.log("getUser error", err))
}

//function to add user to database
const addUsertoDatabase = (user) => {
  return db.query(`INSERT INTO users (email, name, streak, max_streak) VALUES ($1, $2, $3, $4) RETURNING*;`, [user.email, user.name, 0, 0])
    .then(data => {
      console.log('user added')
      return data.rows[0]
    })
    .catch(err => console.log("addUser error", err))
}

// function to insert game data
const insertGameInfo = (user_id, completed, score) => {
  return db.query(`INSERT INTO games (user_id, completed, score) VALUES ($1, $2, $3) RETURNING*;`, [user_id, completed, score])
    .then(data => {
      console.log('game info inserted')
      return data.rows[0]
    })
    .catch(err => console.log("insert user to game error", err))
}

//function to check if currently on streak
const checkCurrentStreak = (user_id, streak, max_streak, completed) => {
  console.log(streak)
  if (completed === true) {
    return db.query(`SELECT * FROM games WHERE user_id = $1 ORDER BY id DESC LIMIT 1;`, [user_id])
      .then(data => {
        if (data.rows[0].completed === true) {
          const value = streak + 1
          console.log("newvalue", value)
          db.query(`UPDATE users SET streak = $1 WHERE id = $2 RETURNING*;`, [value, user_id])
            .then(data => {
              console.log("data after updating streak", data.rows);
              if (data.rows[0].streak > max_streak) {
                db.query(`UPDATE users SET max_streak = $1 WHERE id = $2;`, [data.rows[0].streak, user_id])
              }
            })
            .catch(err => console.log(err))
        }
        if (data.rows[0].completed === false) {
          db.query(`UPDATE users SET streak = $1 WHERE id = $2 RETURNING*;`, [1, user_id])
            .then(data => {
              if (data.rows[0].streak > max_streak) {
                db.query(`UPDATE users SET max_streak = $1 WHERE id = $2;`, [data.rows[0].streak, user_id])
              }
            })
            .catch(err => console.log(err))
        }
      })
  }
  if (completed === false) {
    db.query(`UPDATE users SET streak = $1 WHERE id = $2 RETURNING*;`, [0, user_id])
      .then(data => {
      }).catch(err => console.log(err))
  }
}

//function to retrieve basic stats
const retrieveStats = (email) => {
  return db.query(`SELECT games.id, score, completed FROM users JOIN games ON users.id = games.user_id WHERE users.email = $1;`, [email])
    .then(data => data.rows)
    .catch(err => console.log(err))
}

//function to retrieve leaderboard
const retrieveLeaderboard = () => {
  return db.query('SELECT SUM(score), users.name FROM users LEFT JOIN games ON users.id = games.user_id GROUP BY users.id ORDER BY SUM DESC NULLS LAST LIMIT 3;')
    .then(data => data.rows)
    .catch(err => console.log(err))
}

module.exports = { getUserByEmail, addUsertoDatabase, insertGameInfo, checkCurrentStreak, retrieveStats, retrieveLeaderboard }