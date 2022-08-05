import _ from 'lodash';
import jwtToken from 'jsonwebtoken';

const jwtSecret = _.get(process.env, 'JWT_SECRET');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signAccessToken = (payload: any, always = false) =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  jwtToken.sign(payload, jwtSecret!, { ...(!always && { expiresIn: '3h' }) });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyAccessToken = async (token: string): Promise<any> =>
  new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    jwtToken.verify(token, jwtSecret!, (err, decoded) => {
      if (err) resolve(false);

      resolve(decoded);
    });
  });
