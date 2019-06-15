const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require('crypto')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const [schema, token] = authHeader.split(" ");

  //Deve existir a palavra Bearer no Header
  if (!/^Bearer$/i.test(schema))
    return res.status(401).send({ error: 'Token malformatted' })

  if (token.length < 50)
    return res.status(401).send({ error: 'Token malformatted' })

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);    

    /**
     * passa na requisiçao uma public_key no formato md5(id+email)
     */

    req.public_key = generateMD5(decoded.public_key)

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" })
  }  
};

generateMD5 = (string) => {
  return crypto.createHash('md5').update(string).digest('hex')
}