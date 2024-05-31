export class HttpError extends Error {
  public status: number;
  public description?: string;

  constructor (status: number, message: string, description?: string) {
    super();
    this.status = status;
    this.message = message;
    this.description = description;
  }
}
