import {
  Controller,
  Get,
  Param,
  UseFilters,
  UseInterceptors,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/shared/filters/http.exception-filter";
import { ResponseInterceptor } from "src/shared/interceptors/response-interceptor";
import { PlaceService } from "./places.service";
import { PlacesResponse } from "src/shared/response/place.response";

@ApiTags("Place")
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
@Controller("place")
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiResponse({
    status: 200,
    description: "Created claim response",
    type: PlacesResponse,
  })
  @Get("/")
  async getAll(): Promise<PlacesResponse> {
    const places = await this.placeService.getAll();

    // map places to response object
    return {
      places: places.map((place) => ({
        name: place.displayed_what,
        address: place.displayed_where,
        website: place.addresses[0].contacts.find(
          (el) => el.contact_type === "url"
        ).url,
        phoneNumber: place.addresses[0].contacts.find(
          (el) => el.contact_type === "phone"
        ).phone_number,
      })),
    };
  }

  @Get("/search")
  async search(): Promise<PlacesResponse> {
    const places = await this.placeService.getAll();

    return {
      places: places.map((place) => ({
        name: place.displayed_what,
        address: place.displayed_where,
        website: place.addresses[0].contacts.find(
          (el) => el.contact_type === "url"
        ).url,
        phoneNumber: place.addresses[0].contacts.find(
          (el) => el.contact_type === "phone"
        ).phone_number,
      })),
    };
  }

  @Get("/:id")
  async getOne(@Param("id") id: string) {
    return await this.placeService.getOne(id);
  }
}
