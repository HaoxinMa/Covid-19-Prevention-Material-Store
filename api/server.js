const path = require("path");
const fs = require("fs");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middleWares = jsonServer.defaults();
server.use(jsonServer.bodyParser);
server.use(middleWares);

// get data from db.json
const getUsersDb = () => {
  // parse json format to object
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "users.json"), "UTF-8")
  );
};

const isUserExisted = email => (
  //findIndex returns -1 if there is no match
  getUsersDb().users.findIndex(user => user.email === email) !== -1);

const isAuthenticated = ({ email, password }) => (
  //findIndex returns -1 if there is no match
  getUsersDb().users.findIndex(user => user.email === email && user.password === password) !== -1);

// create token
const SECRET = "TROJANFIGHTON";
const expiresIn = "1h";
const createToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn });
};

// login api
server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  // return JWT when the email and password match
  if (isAuthenticated({ email, password })) {
    const user = getUsersDb().users.find(
      user => user.email === email && user.password === password
    );
    const { username, type } = user;
    const jwToken = createToken({ username, type, email });
    return res.status(200).json(jwToken);
  } else {
    const status = 401;
    const message = "Incorrect email or password";
    return res.status(status).json({ status, message });
  }
});

// register api
server.post("/auth/register", (req, res) => {
  const { email, password, username, type } = req.body;

  // check if the user has existed
  if (isUserExisted(email)) {
    const status = 401;
    const message = "This email has been registed!";
    return res.status(status).json({ status, message });
  }

  // writeFile
  fs.readFile(path.join(__dirname, "users.json"), (err, _data) => {
    if (err) {
      const status = 401;
      const message = err;
      return res.status(status).json({ status, message });
    }
    const data = JSON.parse(_data.toString());
    const last_item_id = data.users[data.users.length - 1].id;
    data.users.push({ id: last_item_id + 1, email, password, username, type });
    fs.writeFile(
      path.join(__dirname, "users.json"),
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });

  const jwToken = createToken({ username, type, email });
  res.status(200).json(jwToken);
});

/**
JWT is recommended to be stored in HTTP header, the format is:
Authorization: Bearer <JWT>
*/

// middleware: verify token
server.use("/carts", (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    const verifyToken = token =>
      jwt.verify(token, SECRET, (err, decode) => decode !== undefined ? decode : err);
    const verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error token is revoked";
    res.status(status).json({ status, message });
  }
});

server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running");
});
