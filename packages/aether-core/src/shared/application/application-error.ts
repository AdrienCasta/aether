export default class ApplicationError extends Error {
  public readonly name = "ApplicationError"
  constructor(message: string) {
    super(message)
  }
}
