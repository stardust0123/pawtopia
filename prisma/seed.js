const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Cat Bed Deluxe",
      description: "Cozy round cat bed with soft filling and a removable cover. Designed to cradle your cat for maximum comfort, it features a plush faux-fur lining that retains warmth and soothes anxious pets. The removable cover is machine-washable for easy cleaning and long-lasting freshness. A non-slip bottom keeps the bed in place during play, while the raised edges provide a secure headrest for naps. Available in multiple colors to match your home decor.",
      price: 19.99,
      imageUrl: "/images/products/cat-bed.jpg",
      category: "Accessories",
    },
    {
      name: "Premium Cat Clothes Collection",
      description: "Stylish and comfortable clothing sets for your feline friend. Perfect for keeping your cat warm during chilly weather. Includes adorable designs that your cat will love. Made from soft, breathable fabric with adjustable straps for a perfect fit.",
      price: 24.99,
      imageUrl: "/images/products/cat-clothes.jpg",
      category: "Clothing",
    },
    {
      name: "Gourmet Cat Food Premium",
      description: "High-quality nutritious cat food packed with essential vitamins and minerals. Formulated with real chicken and fish to support your cat's health and vitality. Improves coat shine, digestive health, and overall wellness. Perfect for cats of all ages.",
      price: 12.99,
      imageUrl: "/images/products/cat-food.jpg",
      category: "Food",
    },
    {
      name: "Organic Cat Nutrition Mix",
      description: "Natural organic cat food blend with grain-free formula. Contains premium proteins and probiotics for optimal digestion. Free from artificial additives and preservatives. Supports healthy weight management and immune system.",
      price: 14.49,
      imageUrl: "/images/products/cat-food-2.jpg",
      category: "Food",
    },

    {
      name: "Multi-Level Cat House Tower",
      description: "Spacious cat house tower with multiple levels and cozy hideouts. Designed for cats to climb, play, and rest. Features scratching posts and comfortable lounging areas. Durable construction with non-slip base for safety and stability.",
      price: 49.99,
      imageUrl: "/images/products/cat-house.jpg",
      category: "Furniture",
    },
    {
      name: "Interactive Cat Toy Ball",
      description: "Fun and engaging interactive toy ball designed to keep your cat entertained for hours. Encourages natural hunting instincts and promotes active play. Equipped with bells and crinkle sounds. Safe and durable materials for long-lasting play.",
      price: 8.99,
      imageUrl: "/images/products/cat-toy.jpg",
      category: "Toys",
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("✅ Product data created!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
