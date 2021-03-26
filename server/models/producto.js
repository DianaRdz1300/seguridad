const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");
const Usuario = require("./usuario");

const Negocio = require("./negocio");
let Schema = mongoose.Schema;

let productoSchema = new Schema({
    marca: {
        type: String,
    },


    nombre: {
        type: String,
    },
    cdb: {
        type: String,
        required: [true, " ingresa el codigo de barra"],
    },
    tiendas: [{
        required: false,
        _id: 0,
        precio: Number,
        oferta: { type: Boolean },
        inventario: Number,
        negocio: {
            type: Schema.Types.ObjectId,
            ref: "Negocio",
        },
    }, ],
    descripcion: {
        type: String,
        required: [true, "Por favor ingresa la descripcion"],
    },
    alias: {
        type: String,
    },
    img: {
        type: String,
        default: "noImage.jpeg",
    },
    estatus: {
        type: Boolean,
        default: true,
    },
    cantidad: {
        type: String,
    },
    elementos: {
        type: String,
    },
    departamento: {
        type: String,
    },
    seccion: {
        type: String,
    },
    producto: {
        type: String,
    },
    comentarios:[{
        required: false,
        _idUsuario: {type: Schema.Types.ObjectId, ref:'Usuario'},
        username: String,
        texto: String,
        calificacion: Number,
        fecha: Date
    }]
});

productoSchema.plugin(uniquevalidator, {
    message: "{PATH} Debe ser unico y diferente",
});

module.exports = mongoose.model("Producto", productoSchema);