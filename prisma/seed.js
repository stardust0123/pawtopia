const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data (order matters due to foreign keys)
  await prisma.pharmacyProduct.deleteMany();
  await prisma.pharmacy.deleteMany();
  await prisma.product.deleteMany();

  // --- Products ---
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "Cat Bed",
        description: "Soft and cozy bed for cats",
        price: 39.99,
        imageUrl: "/images/cat-bed.jpg",
        category: "Bedding",
      },
    }),
    prisma.product.create({
      data: {
        name: "Cat Toy",
        description: "Fun toy to keep your cat active",
        price: 9.99,
        imageUrl: "/images/cat-toy.jpg",
        category: "Toys",
      },
    }),
    prisma.product.create({
      data: {
        name: "Cat Food",
        description: "Healthy and tasty cat food",
        price: 19.99,
        imageUrl: "/images/cat-food.jpg",
        category: "Food",
      },
    }),
    prisma.product.create({
      data: {
        name: "Flea Drops",
        description: "Effective flea prevention treatment for cats",
        price: 24.99,
        imageUrl: "/images/flea-drops.jpg",
        category: "Medicine",
      },
    }),
    prisma.product.create({
      data: {
        name: "Cat Vitamins",
        description: "Daily vitamin supplement for healthy cats",
        price: 14.99,
        imageUrl: "/images/cat-vitamins.jpg",
        category: "Supplements",
      },
    }),
    prisma.product.create({
      data: {
        name: "Dental Treats",
        description: "Crunchy treats that clean teeth and freshen breath",
        price: 12.99,
        imageUrl: "/images/dental-treats.jpg",
        category: "Dental",
      },
    }),
  ]);

  const [catBed, catToy, catFood, fleaDrops, catVitamins, dentalTreats] = products;

  // --- Pharmacies ---
  const pharmacies = await Promise.all([
    prisma.pharmacy.create({
      data: {
        name: "PurrCare Pharmacy",
        address: "123 Meow Street, District 1, Ho Chi Minh City",
        latitude: 10.7769,
        longitude: 106.7009,
        phone: "+84 28 1234 5678",
        hours: "Mon-Fri 8:00 AM - 8:00 PM, Sat 9:00 AM - 5:00 PM",
        services: ["prescriptions", "supplements", "vaccines", "flea treatment"],
        imageUrl: "/images/pharmacy-1.jpg",
      },
    }),
    prisma.pharmacy.create({
      data: {
        name: "Whiskers Wellness",
        address: "456 Cat Lane, District 3, Ho Chi Minh City",
        latitude: 10.7834,
        longitude: 106.6869,
        phone: "+84 28 2345 6789",
        hours: "Mon-Sat 9:00 AM - 7:00 PM",
        services: ["prescriptions", "supplements", "grooming care", "dental care"],
        imageUrl: "/images/pharmacy-2.jpg",
      },
    }),
    prisma.pharmacy.create({
      data: {
        name: "Pawsome Meds",
        address: "789 Feline Ave, District 7, Ho Chi Minh City",
        latitude: 10.7295,
        longitude: 106.7218,
        phone: "+84 28 3456 7890",
        hours: "Mon-Sun 8:00 AM - 10:00 PM",
        services: ["prescriptions", "vaccines", "emergency meds", "supplements"],
        imageUrl: "/images/pharmacy-3.jpg",
      },
    }),
    prisma.pharmacy.create({
      data: {
        name: "CatRx Dispensary",
        address: "321 Kitten Blvd, Binh Thanh District, Ho Chi Minh City",
        latitude: 10.8011,
        longitude: 106.7102,
        phone: "+84 28 4567 8901",
        hours: "Mon-Fri 7:30 AM - 6:30 PM",
        services: ["prescriptions", "compounding", "supplements", "wound care"],
        imageUrl: "/images/pharmacy-4.jpg",
      },
    }),
    prisma.pharmacy.create({
      data: {
        name: "Meow Medicine Hub",
        address: "555 Tabby Road, Thu Duc City, Ho Chi Minh City",
        latitude: 10.8442,
        longitude: 106.7631,
        phone: "+84 28 5678 9012",
        hours: "Mon-Sat 8:00 AM - 9:00 PM, Sun 10:00 AM - 4:00 PM",
        services: ["vaccines", "flea treatment", "dental care", "supplements"],
        imageUrl: "/images/pharmacy-5.jpg",
      },
    }),
    prisma.pharmacy.create({
      data: {
        name: "FurEver Health",
        address: "888 Paw Print Street, District 2, Ho Chi Minh City",
        latitude: 10.7868,
        longitude: 106.7500,
        phone: "+84 28 6789 0123",
        hours: "Mon-Sun 9:00 AM - 8:00 PM",
        services: ["prescriptions", "supplements", "vaccines", "grooming care", "emergency meds"],
        imageUrl: "/images/pharmacy-6.jpg",
      },
    }),
  ]);

  const [purrCare, whiskers, pawsome, catRx, meowHub, furEver] = pharmacies;

  // --- PharmacyProduct (which pharmacy sells which products) ---
  await prisma.pharmacyProduct.createMany({
    data: [
      // PurrCare Pharmacy — sells flea drops, vitamins, cat food
      { pharmacyId: purrCare.id, productId: fleaDrops.id, price: 22.99, inStock: true },
      { pharmacyId: purrCare.id, productId: catVitamins.id, price: 14.99, inStock: true },
      { pharmacyId: purrCare.id, productId: catFood.id, price: 18.49, inStock: true },

      // Whiskers Wellness — sells dental treats, vitamins, cat bed
      { pharmacyId: whiskers.id, productId: dentalTreats.id, price: 11.99, inStock: true },
      { pharmacyId: whiskers.id, productId: catVitamins.id, price: 15.49, inStock: true },
      { pharmacyId: whiskers.id, productId: catBed.id, price: 37.99, inStock: false },

      // Pawsome Meds — sells flea drops, vitamins, cat food, cat toy
      { pharmacyId: pawsome.id, productId: fleaDrops.id, price: 24.99, inStock: true },
      { pharmacyId: pawsome.id, productId: catVitamins.id, price: 13.99, inStock: true },
      { pharmacyId: pawsome.id, productId: catFood.id, price: 19.99, inStock: true },
      { pharmacyId: pawsome.id, productId: catToy.id, price: 8.99, inStock: true },

      // CatRx Dispensary — sells flea drops, dental treats
      { pharmacyId: catRx.id, productId: fleaDrops.id, price: 23.49, inStock: true },
      { pharmacyId: catRx.id, productId: dentalTreats.id, price: 12.99, inStock: true },

      // Meow Medicine Hub — sells vitamins, dental treats, flea drops, cat toy
      { pharmacyId: meowHub.id, productId: catVitamins.id, price: 14.49, inStock: true },
      { pharmacyId: meowHub.id, productId: dentalTreats.id, price: 13.49, inStock: false },
      { pharmacyId: meowHub.id, productId: fleaDrops.id, price: 25.99, inStock: true },
      { pharmacyId: meowHub.id, productId: catToy.id, price: 9.99, inStock: true },

      // FurEver Health — sells all products
      { pharmacyId: furEver.id, productId: catBed.id, price: 38.99, inStock: true },
      { pharmacyId: furEver.id, productId: catToy.id, price: 9.49, inStock: true },
      { pharmacyId: furEver.id, productId: catFood.id, price: 17.99, inStock: true },
      { pharmacyId: furEver.id, productId: fleaDrops.id, price: 21.99, inStock: true },
      { pharmacyId: furEver.id, productId: catVitamins.id, price: 13.99, inStock: true },
      { pharmacyId: furEver.id, productId: dentalTreats.id, price: 11.49, inStock: true },
    ],
  });

  console.log("Seed data created!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
