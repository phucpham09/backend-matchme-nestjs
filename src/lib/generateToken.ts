import * as bcrypt from 'bcrypt';

export const generateToken = async (passwordHash: string): Promise<string> => {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(passwordHash, saltOrRounds);
  return hash;
};
