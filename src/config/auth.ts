export default {
  secret: process.env.TOKEN_SECRET ?? 'secret',
  expiresIn: '7d',
};
