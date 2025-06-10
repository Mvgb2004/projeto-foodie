export class TokenExpiredError extends Error {
  constructor() {
    super('Token expirado, peça novamente.');
  }
}
