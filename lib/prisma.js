import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getProducts() {
  return await prisma.product.findMany();
}

export async function getHotels() {
  return await prisma.hotel.findMany();
}

