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
import { PlaceItem, PlacesResponse } from "src/shared/response/place.response";

@ApiTags("Place")
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
@Controller("place")
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiResponse({
    status: 200,
    description: "Found places",
    type: PlacesResponse,
  })
  @Get("/")
  async getAll(): Promise<PlacesResponse> {
    const places = await this.placeService.getAll();

    return {
      places: places.map((place) => ({
        id: place.local_entry_id,
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

  @ApiResponse({
    status: 200,
    description: "Found places",
    type: PlacesResponse,
  })
  @Get("/search/:term")
  async search(@Param("term") term: string): Promise<PlacesResponse> {
    const places = await this.placeService.search(term);

    return {
      places: places.map((place) => ({
        id: place.local_entry_id,
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

  @ApiResponse({
    status: 200,
    description: "Found place",
    type: PlaceItem,
  })
  @Get("/:id")
  async getOne(@Param("id") id: string): Promise<PlaceItem> {
    const { result, workingHours } = await this.placeService.getOne(id);

    return {
      id: result.local_entry_id,
      name: result.displayed_what,
      address: result.displayed_where,
      website: result.addresses[0].contacts.find(
        (el) => el.contact_type === "url"
      ).url,
      phoneNumber: result.addresses[0].contacts.find(
        (el) => el.contact_type === "phone"
      ).phone_number,
      workingHours,
    };
  }
}
