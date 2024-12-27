import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tiers = [
  { name: 'Bronze', requiredPoints: 0 },
  { name: 'Silver', requiredPoints: 100 },
  { name: 'Gold', requiredPoints: 300 },
  { name: 'Platinum', requiredPoints: 1000 },
  { name: 'Diamond', requiredPoints: 2500 },
];

const tempProducts = [
  {
    name: 'Product 1',
    description: 'Description 1',
    price: 100,
    stock: 10,
    isVirtual: false,
    imageUrl: 'https://via.placeholder.com/450',
  },
  {
    name: 'Product 2',
    description: 'Description 2',
    price: 200,
    stock: 20,
    isVirtual: false,
    imageUrl: 'https://via.placeholder.com/450',
  },
  {
    name: 'Product 3',
    description: 'Description 3',
    price: 300,
    stock: 30,
    isVirtual: false,
    imageUrl: 'https://via.placeholder.com/450',
  },
  {
    name: 'Product 4',
    description: 'Description 4',
    price: 400,
    stock: 40,
    isVirtual: false,
    imageUrl: 'https://via.placeholder.com/450',
  },
  {
    name: 'Product 5',
    description: 'Description 5',
    price: 500,
    stock: 50,
    isVirtual: false,
    imageUrl: 'https://via.placeholder.com/450',
  },
];

const main = async () => {
  for (const tier of tiers) {
    await prisma.tier.upsert({
      where: { name: tier.name },
      update: {},
      create: {
        name: tier.name,
        requiredPoints: tier.requiredPoints,
      },
    });
  }

  for (const product of tempProducts) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        isVirtual: product.isVirtual,
        imageUrl: product.imageUrl,
      },
    });
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
