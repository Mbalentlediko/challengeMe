import express from 'express'
import path from 'path'
import { connection as db } from './config/index.js'

const app = express()
const port = +process.env.port
const router = express.Router()

app.use(router,
    express.static('./static'),
   express.json(),
   express.urlencoded({
       extended:true
   }))

   router.get("^/$|/eShop", (req, res) => {
    res.status(200).sendFile(path.resolve("./static/html/index.html"));
  });
  router.get("/users", (req, res) => {
    try {
      const strQry = `
              select userName, userSurname, age, emailAdd
              from Users
              where userID = 1;
              `;
      db.query(strQry, (err, results) => {
        if (err) throw new Error(`Unable to fetch  users`);
        res.json({
          status: res.statusCode,
          results,
        });
      })
    } catch (e) {
        res.json({
          status: 404,
          msg: e.message,
        });
      }
    })
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    })
  