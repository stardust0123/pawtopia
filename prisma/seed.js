const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Cat Bed",
      description: "Soft and cozy bed for cats",
      price: 39.99,
      imageUrl: "/images/cat-bed.jpg",
      category: "Bedding",
    },
    {
      name: "Cat Toy",
      description: "Fun toy to keep your cat active",
      price: 9.99,
      imageUrl: "/images/cat-toy.jpg",
      category: "Toys",
    },
    {
      name: "Cat Food",
      description: "Healthy and tasty cat food",
      price: 19.99,
      imageUrl: "/images/cat-food.jpg",
      category: "Food",
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("Seed data created!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
