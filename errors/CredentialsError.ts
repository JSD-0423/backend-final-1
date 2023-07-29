import GenericError from "./GenericError";

class CredentialsError extends GenericError {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = "AuthError";
  }
}

export default CredentialsError;
