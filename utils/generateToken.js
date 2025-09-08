import jwt from "jsonwebtoken";


const generateAccessToken = (id, role,) => {
  const token = jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
}

const generateRefreshToken = (id, role) => {
  const token = jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
}
const generateToken = (id) => {
  const token = jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
}



export { generateAccessToken, generateRefreshToken, generateToken }