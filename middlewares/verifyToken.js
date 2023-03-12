import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token);

  const test =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhcmtAZ21haWwuY29tIiwiaWQiOiI2NDBkYWYzZDA0ZTBjNTBmMTE5ZjA2ZDgiLCJpYXQiOjE2Nzg2MjQ3ODZ9.Jx3wtLHGiMMOqCeeLz9SPNgeyU98J56xYnKHqOMyXhY"
  
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(
    token,
    "08b0f215247a1d78a6598bf83616f9e3303fa3d48220a8f5c5a5a5dd5b2f5d5",
    function (err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });

      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    }
  );
}

export default verifyToken;
/**
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJlbWFpbCI6ImxhcmFAZ21haWwuY29tIiwiaWQiOiI2M2RlOGVlZGI4YWI0MmRkYjc2ZTQyOWMiLCJpYXQiOjE2Nzg2MTk2MTV9.
cU2W8O743qV7RiCg2Fo2v3Yev-yUoBWy0XHaFGbzKJs"
 */
