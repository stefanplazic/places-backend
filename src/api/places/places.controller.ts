import { Controller, Get, UseFilters, UseInterceptors } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/shared/filters/http.exception-filter";
import { ResponseInterceptor } from "src/shared/interceptors/response-interceptor";
import { PlaceService } from "./places.service";

@ApiTags("Place")
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
@Controller("place")
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiResponse({
    status: 200,
    description: "Created claim response",
    // type: CreateClaimResponse,
  })
  @Get("/")
  async getAll() {
    return await this.placeService.getAll();
  }
}
