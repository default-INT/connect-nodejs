import { HttpError } from 'shared/errors/HttpError';

export class ForbiddenError extends HttpError {
  constructor (description?: string) {
    super(403, 'Forbidden', description);
  }
}
