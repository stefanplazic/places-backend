import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
} from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { HTTP_STATUS_DICT } from "../status-codes";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly _logger: Logger
  ) {}

  catch(error: Error, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    let errorMessages = [error.message];
    let logMessages = [error.message];
    let status = 500;

    if (error instanceof HttpException) {
      status = error.getStatus();
      const responseMessage = (error.getResponse() as Record<string, string>)
        .message;
      if (Array.isArray(responseMessage)) {
        errorMessages = responseMessage;
      } else {
        errorMessages = [responseMessage];
      }
      logMessages = errorMessages;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessages = ["We are currently experiencing technical difficulties"];
    }

    const message = HTTP_STATUS_DICT[status];
    this._logger.error({
      context: HttpExceptionFilter.name,
      message: logMessages,
      body: request.body,
      query: request.query,
      url: request.url,
      method: request.method,
      headers: request.headers,
      stack: error.stack,
    });

    response.status(status).json({
      data: [],
      error: errorMessages,
      message: message,
    });
  }
}
