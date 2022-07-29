export enum HttpStatusCode {
    OK = 'OK',
    BAD_REQUEST = 'BAD REQUEST',
    NOT_FOUND = 'RESOURCE NOT FOUND',
    INTERNAL_SERVER = 'INTERNAL SERVER ERROR',
}

export class ServiceError extends Error {
    options
    constructor(name: HttpStatusCode, message: string, options?: any) {
      super(message)
      this.name = name
      this.options = options
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this)
      }
    }
}