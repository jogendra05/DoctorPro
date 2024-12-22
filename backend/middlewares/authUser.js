import jwt from "jsonwebtoken";

// User authentication middleware
const userAuth = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      res.json({ success: false, message: "Not authorized Login again" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default userAuth;
