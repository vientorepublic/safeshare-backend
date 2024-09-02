import axios from 'axios';
import { ICaptchaData, ICaptchaResponse } from 'src/types';

const secretKey = process.env.RECAPTCHA_SECRET;

export class recaptcha {
  public async verify(token: string, ip: string): Promise<ICaptchaData> {
    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', token);
    params.append('remoteip', ip);
    const res = await axios.get<ICaptchaResponse>(
      'https://www.google.com/recaptcha/api/siteverify',
      { params },
    );
    return res.data;
  }
}
