import { Injectable } from "@nestjs/common";
import { IsNotEmpty } from "class-validator";
import { validateEnvSchema } from "src/shared/util/validate-env-schema";

export class PlaceConfigSchema {
  @IsNotEmpty()
  UPSTREAM_BASE_URL: string;
}

@Injectable()
export class PlaceConfigService {
  private readonly _authConfig: PlaceConfigSchema;

  constructor() {
    this._authConfig = validateEnvSchema(PlaceConfigSchema);
  }

  public get upstreamBaseUrl() {
    return this._authConfig.UPSTREAM_BASE_URL;
  }
}
