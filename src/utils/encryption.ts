import * as scryptPbkdf from 'scrypt-pbkdf'


export const encryptPassword = async (password: string, salt: string): Promise<string> => {
  const derivedKeyLength = 32  // in bytes
  const key = await scryptPbkdf.scrypt(password, salt, derivedKeyLength)  // key is an ArrayBuffer  
  const buf = Buffer.from(key).toString('base64');

  return buf;
}
