import jwt from "jsonwebtoken";


 const generateAccessToken = async (id,role,) => {
  const token = await jwt.sign(
    { id,role},
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
}

 const generateRefreshToken = async (id,role) => {
   const token = await jwt.sign(
    { id,role},
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
}
 
    
export{generateAccessToken,generateRefreshToken}