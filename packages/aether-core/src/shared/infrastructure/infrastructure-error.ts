export class InfrastructureError extends Error {
  public readonly name = "InfrastructureError"
  constructor(message: string) {
    super(message)
  }
}
