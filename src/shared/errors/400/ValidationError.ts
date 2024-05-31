import { HttpError } from '../HttpError';

export class ValidationError extends HttpError {
  constructor (description?: string) {
    super(400, 'Validation Error', description);
  }
}
