import { ApiProperty } from "@nestjs/swagger";

export class PlaceItem {
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
}

export class PlacesResponse {
  @ApiProperty({
    description: "Places",
    type: [PlaceItem],
  })
  places: PlaceItem[];
}
