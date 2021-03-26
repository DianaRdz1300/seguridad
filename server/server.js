/* jshint esversion: 8 */
require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
//habilita CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, token"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

//// Log a Archivo

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
   // render the error page
  res.status(err.status || 500);
  res.render('error');
  });

////

////////////////////////  Configuración para Morgan y creación del stream node.log
loggerHTTP = require('morgan');
var fs = require('fs'); var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/node.log', {flags : 'a'});
app.use(loggerHTTP({stream: log_file}));
app.use(loggerHTTP('dev'));
/////////////////////////


// error handler
app.use(function (err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// Escribimos el error
log_file.write(err.stack)

// render the error page
res.status(err.status || 500);
res.render('error');
});



//parse application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse formato a application/json
app.use(bodyParser.json({ limit: "10mb", extended: true }));
//archivo agrupador de indices
app.use("/api", require("./routes/index"));
//conector a la db

// mongoose.connect(
//   "mongodb+srv://zaza1:OM945kWYtSdBNQCY@cluster0-21svm.mongodb.net/test?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err, resp) => {
//     if (err) throw err;

//     console.log("Base de datos ONLINE");
//   }
// );
mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
},
(err, resp) => {
  if (err) throw err;

  console.log('Base de Datos Online <3 ');
});

//puerto que escucha
app.listen(process.env.PORT);
console.log("Escuchando por el Puerto <3 " + process.env.PORT);
