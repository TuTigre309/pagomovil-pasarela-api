// Importaciones al principio del archivo
import app from './app.js';
import serverless from 'serverless-http';
import { connectToDatabase, handler as databaseHandler } from './database.js';

// Declaración de variables y funciones
const isRunningOnLambda = !!process.env.LAMBDA_TASK_ROOT;
let lambdaHandler;

// Lógica condicional para determinar el entorno de ejecución
if (!isRunningOnLambda) {
  const port = process.env.PORT || 443;
  
  connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server listening to https://localhost:${port}/`);
      });
  });
} else {
  // Definición del handler para Lambda
  lambdaHandler = async (event, context) => {
    await databaseHandler(event, context);
    return serverless(app)(event, context);
  };
}

// Exportación al final del archivo, en el nivel superior
export { lambdaHandler as handler };
