/* jshint esversion: 8 */

//PUERTO
process.env.PORT = process.env.PORT || 3000;

//firma de JWT
process.env.SEED = process.env.SEED || "firma-super-secreta";

//EXPIRE TIME JWT
process.env.CAD_TOKEN = process.env.CAD_TOKEN || "3h";

//conexion a la db
let urlDB;

if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/ecommerce";
} else {
    urlDB = "mongodb+srv://admin:admin@cluster0-aokp5.mongodb.net/ecommerce";
}


process.env.URLDB = urlDB;