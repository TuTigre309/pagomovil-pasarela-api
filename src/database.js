import mongoose from "mongoose";
import * as initialSetup from './libs/initialSetup';

let cachedDb = null; // Variable para almacenar la conexión de la base de datos

export async function connectToDatabase() {
  if (cachedDb) {
    console.log('Usando conexión existente a MongoDB.');
    return cachedDb;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log('DB connected');
    cachedDb = db; // Almacena la conexión de la base de datos para reutilizarla
    await initialSetup.createApiKey(); // Inicializa tu configuración
    return db;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export async function handler(context) {
  context.callbackWaitsForEmptyEventLoop = false; // Evita que Lambda espere a que el event loop esté vacío

  await connectToDatabase(); // Conecta a la base de datos
}