import { customType } from "drizzle-orm/pg-core";

export const normalizedTitle = customType<{ data: string; driverData: string }>(
  {
    dataType() {
      return "text";
    },
    toDriver(value) {
      return value
        .replaceAll(/[^a-zA-Z\d\s]/g, "")
        .replaceAll(" ", "-")
        .toLowerCase();
    },
  },
);
