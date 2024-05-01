import app from './app';
import serverless from 'serverless-http'; // Importa serverless-http
import { connectToDatabase, handler as databaseHandler } from './database'; // Importa el handler de la base de datos

// Verifica si estamos corriendo en un entorno de AWS Lambda
const isRunningOnLambda = !!process.env.LAMBDA_TASK_ROOT;

// Si no estamos en Lambda, inicia el servidor como de costumbre
if (!isRunningOnLambda) {
  const port = process.env.PORT || 443;
  
  connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server listening to https://localhost:${port}/`);
      });
  })
} else {
  // Para Lambda, utiliza el handler de la base de datos para manejar las solicitudes
  exports.handler = async (event, context) => {
    // Asegúrate de que la conexión a la base de datos esté lista antes de manejar la solicitud
    await databaseHandler(event, context);
    // Luego, pasa el control a serverless-http para manejar la solicitud de Express
    return serverless(app)(event, context);
  };
}
