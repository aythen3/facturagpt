const jwt = require("jsonwebtoken");
const { ClientError } = require("../../utils/err/errors");
const useragent = require('useragent');


const { connectDB } = require("../../controllers/utils");
// const nano = require('nano')('http://admin:1234@127.0.0.1:5984');



const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new ClientError("Authorization token missing", 401);
    }

    const decodedToken = jwt.verify(
      token,
      "keySecret156754asdas897fav45646xz4c65z899sa4fa654fas65f4sa65sadasf"
    );


    const query = {
      "selector": {
        "_id": decodedToken._id,
        "user": decodedToken.user,
        "isverified": true
      }
    };

    let db_account = await connectDB(`db_account`)
    const resp = await db_account.find(query)

    if (resp.docs.length == 0) {
      throw new ClientError("User not found", 404);
    }

    const user = resp.docs[0]

   


    if (user.token_login !== token) {

      const db_log = await connectDB('db_log')
      const agent = useragent.parse(req.headers['user-agent']);
      const browser = agent.family;         
      const version = agent.toVersion();  
      const osFamily = agent.os.family; 
      const osVersion  = agent.os.toVersion();   
  
      await db_log.insert({
        name: 'Acceso detectado',
        status: 200,
        browser: browser,
        version: version,
        system: osFamily,
        version: osVersion,
        type: 'login',
        createdat: new Date()
      });

      return res.status(409).send({ message: 'Session has been logged out on another device' });
    }

    delete user.avatar;
    delete user.banner;


    req.user = user;

    // Comprobamos si el token contiene la variable `iam`
    if (decodedToken.iam) {
      // Si la variable `iam` es true, se permite continuar, pero agregamos la verificación de método y ruta
      detectIAMMiddleware(req, res, next, decodedToken.iam);
    } else {
      next();
    }


    // next();
  } catch (error) {
    console.log("Invalid token: ", error);
    return res.status(501).send("Invalid token");
  }
};



module.exports = { authenticateToken: authenticateToken };



const detectIAMMiddleware = (req, res, next, iam) => {
  const method = req.method;
  const reqPath = req.path;

  console.log('method:', method);
  console.log('route:', reqPath);

  // if (iam === true) {
  //   // Verificar si la ruta y el método están permitidos en el archivo JSON
  //   const route = allowedRoutes.find(
  //     (r) => r.path === reqPath && r.method === method
  //   );

  //   if (route) {
  //     console.log('Ruta permitida:', route.description);
  //     return next(); // Si la ruta está permitida, continuamos
  //   } else {
  //     return res.status(405).send({ message: `Ruta ${reqPath} con el método ${method} no está permitida.` });
  //   }
  // } else {
  //   return res.status(409).send({ message: 'No tienes permisos para realizar esta acción.' });
  // }
};








// const connectDB = async (tableName) => {
//   let db
//   try {
//     await nano.db.get(tableName);
//     db = nano.db.use(tableName);
//     return db
//   } catch (error) {
//     if (error.statusCode === 404) {
//       try {
//         await nano.db.create(tableName);
//         db = nano.db.use(tableName);
//         console.log('Base de datos creada:', tableName);
//         return db
//       } catch (createError) {
//         console.log('Error al crear la base de datos:', createError);
//         throw createError;
//       }
//     } else {
//       console.log('Error al obtener información de la base de datos:', error);
//       throw error;
//     }
//   }
// }





