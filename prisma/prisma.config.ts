import type { PrismaConfig } from "@prisma/client";

const config: PrismaConfig = {
  schema: {
    kind: "singleFile",
    filePath: "./prisma/schema.prisma",
  },
};

export default config;
