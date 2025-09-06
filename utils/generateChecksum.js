
import crypto from "crypto"
const generateChecksum=(data, secretKey)=> {
  return crypto.createHmac("sha256", secretKey).update(data).digest("hex");
}

export{generateChecksum}