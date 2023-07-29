import GenericError from "./GenericError";

class DatabaseError extends GenericError {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = "AuthError";
  }
}

export default DatabaseError;
