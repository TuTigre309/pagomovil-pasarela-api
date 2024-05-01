import axios from "axios";
import https from 'https'
import * as crypto from "crypto"

export function encryptDt(data) {
    const secretKey = process.env.SECRET_KEY;
    const iv = process.env.IV;
  
    const text = JSON.stringify(data);
    const cipher = crypto.createCipheriv('aes-128-cbc', secretKey, iv);
  
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
  
    return encrypted;
}

export function decryptDt(encryptedData) {
    const secretKey = process.env.SECRET_KEY;
    const iv = process.env.IV;
  
    const decipher = crypto.createDecipheriv('aes-128-cbc', secretKey, iv);
  
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
  
    return JSON.parse(decrypted);
}

export async function DebitoTDC(dt) {
    const url_dev = process.env.URL_DEV + '/Cobranzas/rs/cd'
    const url_prod = process.env.URL_PROD + '/cd'

    const encryptedDt = encryptDt(dt)

    const url = process.env.IS_DEV ? url_dev : url_prod
    const data = {
        hs: process.env.HS,
        dt: encryptedDt
    }

    const response = await axios.post(url, data)
    .then( (response) => {
      if (response.status === 400 || response.status === 500) return badResponse(response.status,response.data)

    })
    .catch( (error) => {
      return {error:true, message:error.message}
    });

    return response
}

export async function cobroC2P(dt) {
  const url_dev = process.env.URL_DEV + '/c2p'
  const url_prod = process.env.URL_PROD + '/c2p'

  const encryptedDt = encryptDt(dt)

  const url = process.env.IS_DEV ? url_dev : url_prod
  const data = {
      hs: process.env.HS,
      dt: encryptedDt
  }

  const response = await axios.post(url, data,{ httpsAgent })
  .then( (response) => {
    if (response.status === 400 || response.status === 500) return badResponse(response.status,response.data)
  })
  .catch( (error) => {
    return {error:true, message:error}
  });

  return response
}

export async function VerificacionPagoMovilP2C(dt) {
  const url_dev = process.env.URL_DEV + '/verifyP2C';
  const url_prod = process.env.URL_PROD + '/verifyP2C';

  const headers = {
    'Content-Type': 'application/json',
  };

  const encryptedDt = encryptDt(dt);

  const url = process.env.IS_DEV ? url_dev : url_prod;
  const data = {
    hs: process.env.HS,
    dt: encryptedDt
  };

  const options = {
    method: 'POST',
    headers,
    agent: new https.Agent({
      rejectUnauthorized: false
    })
  };

  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(decryptDt(JSON.parse(responseData).response));
        } else {
          reject({
            status: res.statusCode,
            error: decryptDt(JSON.parse(responseData).response)
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({
        error: error.message
      });
    });

    try{
      req.write(JSON.stringify(data))
    } catch (error) {
      req.write({error})
    }
    
    req.end();
  });
}
