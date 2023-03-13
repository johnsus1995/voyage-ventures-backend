import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY)

    // Verify payload
    if (!decoded.userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    // Verify audience and issuer
    if (decoded.aud !== 'myapp' || decoded.iss !== 'myapp.com') {
      return res.status(401).json({ message: 'Invalid token audience or issuer' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);

    // Handle common errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }

    // Handle other errors
    res.status(500).json({ message: 'Server error' });
  }
};

export default verifyToken;
