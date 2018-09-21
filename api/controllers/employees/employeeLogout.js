const jwt = require('jsonwebtoken');

const keys = require('../../../config/keys');


const employeeLogout = (req, res) => {
  // pull the restaurant ID off the token in the headers
  const { restaurant } = jwt.verify(req.headers.authorization.slice(7), keys.secretOrKey);

  // remove all user information from the payload
  const payload = {
    restaurant,
    id: null,
    pin: null,
    role: {
      admin: null,
      manager: null
    }
  };

  // sign a new token with the new payload
  const token = `Bearer ${jwt.sign(payload, keys.secretOrKey)}`;

  // send back the token
  res.status(200).json({ token });
};

module.exports = { employeeLogout };
