// src/prisma.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Export as default so you can just `import prisma from "../prisma"`
export default prisma;
