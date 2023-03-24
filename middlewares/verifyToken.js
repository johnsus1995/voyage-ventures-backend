import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    let headers = req.headers["authorization"]
    let token = headers.split(" ")[1];
    // return

    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decodedData?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
