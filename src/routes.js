const routes = require("express").Router();

const authMiddleware = require("./app/middleware/auth");

const SessionController = require("./app/controllers/SessionController");
const UserController = require("./app/controllers/UserController");
const Test = require("./app/controllers/TestController");

routes.get("/user", UserController.index);
routes.post("/user", UserController.store);
routes.post("/user/autenticate", UserController.autenticate);


routes.get("/sessions", SessionController.index);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);
routes.get("/teste", Test.index);

routes.get("/dashboard", (req, res) => {
  return res.status(200).send();
});

module.exports = routes;
