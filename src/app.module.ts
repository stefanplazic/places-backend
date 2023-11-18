import { Module } from "@nestjs/common";
import { WinstonModule, utilities } from "nest-winston";
import * as winston from "winston";
import { PlaceModule } from "./api/places/places.module";

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike("places", {
              prettyPrint: true,
            })
          ),
        }),
      ],
    }),
    PlaceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
