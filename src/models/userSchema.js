import mongoose from "mongoose";
const { Schema, Types } = mongoose;

let schema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    photo: {
      type: String,
      default:
        "https://img.freepik.com/fotos-premium/simbolo-icono-usuario-azul-o-elemento-inicio-sesion-social-administrador-sitio-web-concepto-fondo-blanco-ai-3d-generado_1154968-170545.jpg",
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    genre: { type: String, required: true },
    events: [{ type: Types.ObjectId, ref: "events" }],
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

let collection = "users";
let userSchema = mongoose.model(collection, schema);

export default userSchema;
