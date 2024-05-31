import { HttpError } from 'shared/errors/HttpError';

export class NotFoundResource extends HttpError {
  constructor (description?: string) {
    super(404, 'The requested resource was not found in the database.', description);
  }
}
