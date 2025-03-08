const jwt = require("jsonwebtoken");
const { ClientError } = require("../../utils/err/errors");
const useragent = require("useragent");

const { connectDB } = require("../../controllers/utils");
// const nano = require('nano')('http://admin:1234@127.0.0.1:5984');

const authenticateToken = async (req, res, next) => {
  try {
    const { userId, inputValue } = req.params;

    if (userId || inputValue) {
      console.log("entro en con userId e authenticateToken", { userId, inputValue });
    }
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new ClientError("Authorization token missing", 401);
    }

    console.log("entro en tokern", { userId, inputValue });

    const decodedToken = jwt.verify(token, "your-secret-key"); // TODO: Move secret to env vars

    // console.log('decodedToken', decodedToken)
    // console.log("token", token);

    // const decodedToken = jwt.verify(
    //   token,
    //   "your-secret-key"
    // );

    // console.log("decodedToken", decodedToken);

    const query = {
      selector: {
        // "_id": decodedToken.userId,
        _id: decodedToken.userId,
        // "user": decodedToken.user,
        // "isverified": true
      },
    };

    let db_account = await connectDB(`db_accounts`);
    const resp = await db_account.find(query);

    // console.log("resp", resp);

    if (resp.docs.length == 0) {
      throw new ClientError("User not found", 404);
    }

    const user = resp.docs[0];

    // if (user.token_login !== token) {
    //   return res.status(409).send({ message: 'Session has been logged out on another device' });
    // }

    // delete user.avatar;
    // delete user.banner;

    // req.user = decodedToken;
    req.user = user;

    next();
  } catch (error) {
    console.log("Invalid token: ", error);
    return res.status(501).send("Invalid token");
  }
};

module.exports = { authenticateToken: authenticateToken };

const detectIAMMiddleware = (req, res, next, iam) => {
  const method = req.method;
  const reqPath = req.path;

  console.log("method:", method);
  console.log("route:", reqPath);

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
