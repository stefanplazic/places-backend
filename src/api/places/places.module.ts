import { Module } from "@nestjs/common";
import { PlaceController } from "./places.controller";
import { PlaceService } from "./places.service";
import { PlaceConfigService } from "./places-config.service";

@Module({
  providers: [PlaceService, PlaceConfigService],
  controllers: [PlaceController],
  imports: [],
})
export class PlaceModule {}
