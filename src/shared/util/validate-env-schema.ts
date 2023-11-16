import { ClassConstructor, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

export function validateEnvSchema<T>(
  cls: ClassConstructor<T>,
  obj: Record<string, unknown> = process.env
): T {
  const validatedConfig = plainToInstance(cls, obj, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig as Record<string, unknown>, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
