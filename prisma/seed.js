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

  const products = [
    {
      name: "Cat Bed Deluxe",
      description: "Cozy round cat bed with soft filling and a removable cover. Designed to cradle your cat for maximum comfort, it features a plush faux-fur lining that retains warmth and soothes anxious pets. The removable cover is machine-washable for easy cleaning and long-lasting freshness. A non-slip bottom keeps the bed in place during play, while the raised edges provide a secure headrest for naps. Available in multiple colors to match your home decor.",
      price: 19.99,
      imageUrl: "/images/products/cat-bed.jpg",
      category: "Accessories",
    },
    {
      name: "Tuna Treats Pack",
      description: "Irresistible tuna bites for training and rewards.",
      price: 5.5,
      imageUrl: "/images/products/tuna-treats.jpg",
      category: "Food",
    },
    {
      name: "Feather Wand Toy",
      description: "Interactive feather wand to keep your cat active.",
      price: 7.25,
      imageUrl: "/images/products/feather-wand.jpg",
      category: "Toys",
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("✅ Product data created!");

  console.log("✅ Hotel data created!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
