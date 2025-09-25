const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    console.log("isAuth - Cookies from client:", req.cookies); // Debug log

    const token = req.cookies.token; // ✅ correct (req.cookies not req.cookie)
    if (!token) {
      console.log("isAuth - No token found in cookies"); // Debug log
      return res.status(401).json({ message: "Token not found" });
    }

    console.log("isAuth - Token found:", token.substring(0, 20) + "..."); // Debug log
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("isAuth - Token decoded successfully:", decoded); // Debug log

    req.userId = decoded.userId; // ✅ match the payload key

    next();
  } catch (err) {
    console.error("isAuth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = isAuth;
