import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PlaceConfigService } from "./places-config.service";
import axios from "axios";

@Injectable()
export class PlaceService {
  constructor(
    @Inject(PlaceConfigService)
    private readonly placeConfigService: PlaceConfigService
  ) {}

  async getAll() {
    const placeOneId = "ohGSnJtMIC5nPfYRi_HTAg";
    const placeTwoId = "GXvPAor1ifNfpF0U5PTG0w";

    try {
      const places = await Promise.all([
        axios.get(`${this.placeConfigService.upstreamBaseUrl}/${placeOneId}`),
        axios.get(`${this.placeConfigService.upstreamBaseUrl}/${placeTwoId}`),
      ]);

      return [places[0].data, places[1].data];
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: string) {
    try {
      const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
        new Date(0, 0, i + 1)
          .toLocaleDateString("en-US", { weekday: "long" })
          .toLowerCase()
      );

      const workingHours = Object.fromEntries(
        daysOfWeek.map((day) => [day, []])
      );
      const result = (
        await axios.get(`${this.placeConfigService.upstreamBaseUrl}/${id}`)
      ).data;
      // map opening hours to correct format
      const days = result.opening_hours.days;

      for (const day in days)
        workingHours[day].push(
          ...days[day].map((el) => `${el.start}-${el.end}`)
        );

      return workingHours;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404)
          throw new NotFoundException(`Place with id: ${id} not found`);
      }
      throw error;
    }
  }
}
