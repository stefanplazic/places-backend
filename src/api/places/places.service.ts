import { Inject, Injectable } from "@nestjs/common";
import { PlaceConfigService } from "./places-config.service";
import axios from "axios";

@Injectable()
export class PlaceService {
  constructor(
    @Inject(PlaceConfigService)
    private readonly placeConfigService: PlaceConfigService
  ) {}

  async getAll() {
    const places = await axios.get(
      `${this.placeConfigService.upstreamBaseUrl}/GXvPAor1ifNfpF0U5PTG0w`
    );
    console.log(
      `${this.placeConfigService.upstreamBaseUrl}/GXvPAor1ifNfpF0U5PTG0w`
    );
    console.log({ places });
    return places.data;
  }
}
