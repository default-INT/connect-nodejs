import { HttpError } from 'shared/errors/HttpError';

export class UnauthorizedError extends HttpError {
  constructor (description?: string) {
    super(401, 'Unauthorized', description);
  }
}
