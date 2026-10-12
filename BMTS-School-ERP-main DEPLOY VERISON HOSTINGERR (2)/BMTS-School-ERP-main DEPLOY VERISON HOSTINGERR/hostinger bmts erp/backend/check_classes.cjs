const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkClasses() {
  const classes = await prisma.class.findMany({
    orderBy: { displayOrder: 'asc' }
  });
  console.log(classes.map(c => `Class ${c.name} (order: ${c.displayOrder}, id: ${c.id})`));
}

checkClasses().catch(console.error).finally(() => prisma.$disconnect());
