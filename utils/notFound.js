const res = require("express/lib/response");

const notFound = (notFoundObj, status = 404, msg) => {
  if (notFoundObj) {
    return res.status(status).send(msg);
  }
};

module.exports = notFound;
