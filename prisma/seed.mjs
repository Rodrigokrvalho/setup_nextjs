import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const crypt = await hash('123456', 8);

  await prisma.user.create({
    data: {
      name: 'Admin',
      password: crypt,
      email: 'admin@admin.com',
    }
  });

  console.log('Seed completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });