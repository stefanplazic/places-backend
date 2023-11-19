import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PlaceConfigService } from "./places-config.service";
import axios from "axios";
import { generateDaysOfWeek } from "src/shared/util/helpers";

interface WorkingHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

@Injectable()
export class PlaceService {
  placeIds = ["ohGSnJtMIC5nPfYRi_HTAg", "GXvPAor1ifNfpF0U5PTG0w"];

  constructor(
    @Inject(PlaceConfigService)
    private readonly placeConfigService: PlaceConfigService
  ) {}

  async getAll() {
    try {
      const places = await Promise.all(
        this.placeIds.map(async (placeId) =>
          axios.get(`${this.placeConfigService.upstreamBaseUrl}/${placeId}`)
        )
      );

      return [places[0].data, places[1].data];
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: string) {
    if (!this.placeIds.includes(id))
      throw new NotFoundException(`There is no place with place id: ${id}`);

    const workingHours: WorkingHours = generateDaysOfWeek();

    const result = (
      await axios.get(`${this.placeConfigService.upstreamBaseUrl}/${id}`)
    ).data;

    // map opening hours to correct format
    const days = result.opening_hours.days;

    for (const day in days)
      workingHours[day] = days[day]
        .map((el) => `${el.start}-${el.end}`)
        .join("\n");

    return { result, workingHours };
  }

  async search(term: string) {
    const result = await Promise.all(
      this.placeIds.map(async (placeId) =>
        axios.get(`${this.placeConfigService.upstreamBaseUrl}/${placeId}`)
      )
    );

    const places = [result[0].data, result[1].data];

    // search and return the correct entries
    const foundPlaces = places.filter((place) => {
      const name: string = place.displayed_what.toLowerCase();
      const address: string = place.displayed_where.toLowerCase();

      return (
        name.includes(term.toLowerCase()) ||
        address.includes(term.toLowerCase())
      );
    });

    return foundPlaces;
  }
}
