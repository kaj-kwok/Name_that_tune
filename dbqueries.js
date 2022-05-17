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
      console.log("data returning from Userquery", data.rows[0])
      if (data.rows[0] === undefined) {
        return
      } else {
        return data.rows[0]
      }

    })
}

//function to add user to database
const addUsertoDatabase = (user) => {
  return db.query(`INSERT INTO users (email, name, streak, max_streak) VALUES ($1, $2, $3, $4) RETURNING*;`, [user.name, user.email, 0, 0])
    .then(data => {
      console.log('user added')
      return data.rows[0]
    })
}

// get user id by email
// insert into game (user_id, completed, score)

// const getUserByEmail = function (db, email) {
//   return db.query(`
//     SELECT id 
//     FROM users
//     WHERE email = ${email};
//   `)
//     .then((data) => {
//       console.log("data in get user query", data)
//       return data;

//     })
// }

// const insertUserIntoGame = function(db, user_id, completed, score) {
//   return db.query(`

//   `)

// }

module.exports = { getUserByEmail, addUsertoDatabase }