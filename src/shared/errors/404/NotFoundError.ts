import { HttpError } from '../HttpError';

export class NotFoundError extends HttpError {
  constructor (description?: string) {
    super(404, 'Not Found', description);
  }
}
