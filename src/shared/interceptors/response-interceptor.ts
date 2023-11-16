import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { HTTP_STATUS_DICT } from "src/shared/status-codes";

export interface Response {
  data: unknown;
  error: string[];
  message: string;
}

type ResponseData = unknown & { dontIntercept?: boolean };

export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response | unknown> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse();
    return next
      .handle()
      .pipe(
        map((data) =>
          ResponseInterceptor.transformResponse(
            data,
            res.statusCode as unknown as number
          )
        )
      );
  }

  static transformResponse(
    data: ResponseData,
    statusCode: number
  ): unknown | Response {
    // only transform the response if indicated
    if (data?.dontIntercept) {
      delete data.dontIntercept;
      return data;
    }
    return {
      data: data || [],
      error: [],
      message: HTTP_STATUS_DICT[statusCode],
    };
  }
}
