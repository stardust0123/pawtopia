const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const hotels = [
    {
      name: "Cozy Cat Inn",
      location: "Hanoi, Vietnam",
      pricePerNight: 35.0,
      description: "A comfortable cat hotel with private playrooms.",
      imageUrl: "/images/hotels/cozy-cat-inn.jpg",
      contact: "contact@cozycat.vn",
    },
    {
      name: "Whisker Retreat",
      location: "Ho Chi Minh City, Vietnam",
      pricePerNight: 42.5,
      description: "Luxury cat boarding with daily grooming and treats.",
      imageUrl: "/images/hotels/whisker-retreat.jpg",
      contact: "info@whiskerretreat.vn",
    },
  ];

  for (const hotel of hotels) {
    await prisma.hotel.create({ data: hotel });
  }

  console.log("✅ Hotel data created!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
