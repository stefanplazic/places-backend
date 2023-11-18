import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class WorkingHours {
  @ApiProperty({ example: "Monday working hours", description: "11:30-14:00" })
  monday: string;

  @ApiProperty({ example: "Tuesday working hours", description: "11:30-14:00" })
  tuesday: string;

  @ApiProperty({
    example: "Wednesday working hours",
    description: "11:30-14:00",
  })
  wednesday: string;

  @ApiProperty({
    example: "Thursday working hours",
    description: "11:30-14:00",
  })
  thursday: string;

  @ApiProperty({ example: "Friday working hours", description: "11:30-14:00" })
  friday: string;

  @ApiProperty({
    example: "Saturday working hours",
    description: "11:30-14:00",
  })
  saturday: string;

  @ApiProperty({ example: "Sunday working hours", description: "11:30-14:00" })
  sunday: string;
}

export class PlaceItem {
  @ApiProperty({
    example: "ohGSnJtMIC5nPfYRi_HTAg",
    description: "Id of the place",
  })
  id: string;

  @ApiProperty({ example: "Casa Ferlin", description: "Name of the place" })
  name: string;

  @ApiProperty({
    example: "Stampfenbachstrasse 38, 8006 Zürich",
    description: "Address of the place",
  })
  address: string;

  @ApiProperty({
    example: "cafemarche.ch",
    description: "website of the place",
  })
  website: string;

  @ApiProperty({
    example: "0273211181",
    description: "Phone number of the place",
  })
  phoneNumber: string;

  @ApiProperty({
    description: "Working hours",
    type: WorkingHours,
  })
  @IsOptional()
  workingHours?: WorkingHours;
}

export class PlacesResponse {
  @ApiProperty({
    description: "Places",
    type: [PlaceItem],
  })
  places: PlaceItem[];
}
