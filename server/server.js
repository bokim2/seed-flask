//Our npm commands: 
// npm init -y
// npm i react react-dom
// npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react  
// npm i -D style-loader file-loader css-loader sass-loader sass
// npm install webpack-dev-server --save-dev
// npm i -D webpack webpack-cli
// npm install --save-dev html-webpack-plugin
// npx webpack serve
// npm install nodemon
//npm install express
//npm install node-fetch
// npm install react-router react-router-dom pg
// npm install -D source-map-loader
// npm install cors
// npm install moment --save


const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const db = require("./db/index.js");

// const morgan = require('morgan');
const app = express();
// const apiRouter = require('./routes.api');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, '../client')));

//GET all flasks and join table - new
app.get("/api/flasksall/:id", async(req, res)=>{
  try{
    const results = await db.query("SELECT * FROM flasks f full outer JOIN samples s ON f.id = s.flask_id LEFT JOIN cell_banks c ON f.cell_bank = c.cell_bank WHERE id = $1 ORDER BY f.id DESC ", [req.params.id]);
    // LEFT OUTER JOIN cell_bank ON flasks.cell_bank=cell_bank.cell_bank ORDER BY flasks.id
    console.log(results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        flasks: results.rows
      }
    })
  } catch(err){ 
    console.log(err)
  }
})

//GET all flasks and join table - new
app.get("/api/flasks", async(req, res)=>{
  try{
    const results = await db.query("SELECT * FROM flasks f full outer JOIN samples s ON f.id = s.flask_id LEFT JOIN cell_banks c ON f.cell_bank = c.cell_bank ORDER BY f.id DESC");
    // LEFT OUTER JOIN cell_bank ON flasks.cell_bank=cell_bank.cell_bank ORDER BY flasks.id
    console.log(results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        flasks: results.rows
      }
    })
  } catch(err){ 
    console.log(err)
  }
})

// //GET all flasks
// app.get("/api/flasks", async(req, res)=>{
//   try{
//     const results = await db.query("SELECT * FROM flasks ORDER BY id DESC");
//     // LEFT OUTER JOIN cell_bank ON flasks.cell_bank=cell_bank.cell_bank ORDER BY flasks.id
//     console.log(results);
//     res.status(200).json({
//       status: "success",
//       results: results.rows.length,
//       data: {
//         flasks: results.rows
//       }
//     })
//   } catch(err){ 
//     console.log(err)
//   }
// })

//GET one flask
app.get("/api/flasks/:id", async(req, res)=>{
  try{
    const results = await db.query("select * from flasks WHERE id = $1", [req.params.id]);
    console.log('results of getting one flask', results.rows[0]);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        flasks: results.rows[0]
      }
    })
  } catch(err){ 
    console.log(err)
  }
})

//CREATE a flask
app.post("/api/flasks", async(req, res)=>{
  try{
    console.log('made it into create a flask server')
    const results = await db.query("INSERT INTO flasks (cell_bank, inoculum_ul, media_ml) values ($1, $2, $3) returning *", [req.body.cell_bank, req.body.inoculum_ul, req.body.media_ml]);
    console.log('create flask results', results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        flasks: results.rows[0]
      }
    })
  } catch(err){ 
    console.log(err)
  }
})

//take a timepoint
app.post("/api/flasks/:id", async(req, res)=>{
  try{
    console.log('in update flask server')
    let date = new Date()
    const results = await db.query("INSERT INTO samples (end_date, od600, completed, time_since_inoc, flask_id) values ($1, $2, $3, $4, $5) returning *", [req.body.end_date, req.body.od600, req.body.completed, req.body.time_since_inoc, req.body.flask_id]);
    // const results = await db.query("INSERT INTO samples cell_bank=$1, inoculum_ul=$2, media_ml=$3, end_date=$4, completed=$5, od600=$6 WHERE id=$7 returning *", [req.body.cell_bank, req.body.inoculum_ul, req.body.media_ml, date, req.body.completed, req.body.od600, req.params.id]);
    console.log(results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        flasks: results.rows[0]
      }
    })
  } catch(err){ 
    console.log(err)
  }
})

// //UPDATE a flask
// app.put("/api/flasks/:id", async(req, res)=>{
//   try{
//     console.log('in update flask server')
//     let date = new Date()
//     const results = await db.query("UPDATE flasks SET cell_bank=$1, inoculum_ul=$2, media_ml=$3, end_date=$4, completed=$5, od600=$6 WHERE id=$7 returning *", [req.body.cell_bank, req.body.inoculum_ul, req.body.media_ml, date, req.body.completed, req.body.od600, req.params.id]);
//     console.log(results);
//     res.status(200).json({
//       status: "success",
//       results: results.rows.length,
//       data: {
//         flasks: results.rows[0]
//       }
//     })
//   } catch(err){ 
//     console.log(err)
//   }
// })

//DELETE a flask
app.delete("/api/flasks/:id", async(req, res)=>{
  try{
    const sample =  db.query("DELETE FROM samples WHERE flask_id = $1", [req.params.id]);
    const results =  db.query("DELETE FROM flasks WHERE id = $1", [req.params.id]);
    console.log(results);
    res.status(204).json({
      status: "success"
    })
  } catch(err){ 
    console.log(err)
  }
})





//define route handlers
// app.use('/api', apiRouter);

// statically serve everything in the build folder on the route '/build'
// app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
app.get('/test', (req, res) => {
  console.log("testing at /test");
  return res.send("hi");
});

// app.get('/', (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, '../index.html'));
// });

/* global err handler */
app.use((err, req, res, next) => {
  const defaultErr = {
      log: 'express error handler caught global err handler',
      status: 500,
      message: {err: 'global error handler'}
  }
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(3000); //listens on port 3000 -> http://localhost:3000/
// modules.exports = app;
