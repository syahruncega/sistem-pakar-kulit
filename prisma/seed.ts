import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcryptjs = require("bcryptjs");

function hasher(text: string) {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(text, salt);
}

const users = [
  {
    email: "syahruncega@gmail.com",
    name: "Syahrun Cega",
    hash: hasher("syahruncega"),
    role: "Admin",
    verified: true,
  },
  {
    email: "user@gmail.com",
    name: "User",
    hash: hasher("user"),
    role: "User",
    verified: true,
  },
];

async function main() {
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
