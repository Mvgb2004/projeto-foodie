const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const dishes = [
    {
      name: "Pizza Margherita",
      description: "Pizza clássica com molho de tomate, muçarela e manjericão fresco",
      category: "PIZZA",
      price: 34.90,
    },
    {
      name: "Cheeseburger Artesanal",
      description: "Hambúrguer artesanal com queijo cheddar, alface, tomate e molho da casa",
      category: "BURGER",
      price: 28.50,
    },
    {
      name: "Sanduíche Natural",
      description: "Sanduíche leve com frango desfiado, cenoura ralada e pão integral",
      category: "SANDWICH",
      price: 19.90,
    },
    {
      name: "Salada Caesar",
      description: "Salada de alface romana, frango grelhado, croutons e molho Caesar",
      category: "SALAD",
      price: 22.00,
    },
    {
      name: "Brownie com Sorvete",
      description: "Brownie de chocolate servido com bola de sorvete de creme",
      category: "DESSERT",
      price: 17.00,
    },
    {
      name: "Suco de Laranja Natural",
      description: "Suco fresco de laranja, sem açúcar adicionado",
      category: "DRINK",
      price: 8.50,
    },
  ];

  for (const dish of dishes) {
    await prisma.dishes.create({ data: dish });
  }

  console.log("Seed de pratos finalizado.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
