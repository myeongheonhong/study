import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const sign = (email: string) => {
  if (!process.env.JWT_SECRET_KEY) return '';

  const payload = {
    email: email,
  };

  return jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '2h',
  });
};

const verify = (token: string) => {
  if (!process.env.JWT_SECRET_KEY) return;

  let decoded = null;
  try {
    decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
    return {
      ok: true,
    };
  } catch (err: any) {
    return {
      // ok: false,
      // message: err.message,
    };
  }
};

const refresh = () => {
  if (!process.env.JWT_SECRET_KEY) return '';

  return jsonwebtoken.sign({}, process.env.JWT_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '14d',
  });
};

const refreshVerify = async (token: string, userId: string) => {
  if (!process.env.JWT_SECRET_KEY) return '';

  // const getAsync = promisify(redisClient.get).bind(redisClient);
  // try {
  //   const data = await getAsync(userId); // refresh token 가져오기
  //   if (token === data) {
  //     try {
  //       jwt.verify(token, secret);
  //       return true;
  //     } catch (err) {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // } catch (err) {
  //   return false;
  // }
};

const jwtMiddleware = {
  sign,
  verify,
  refresh,
  refreshVerify,
};

export default jwtMiddleware;
