import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
