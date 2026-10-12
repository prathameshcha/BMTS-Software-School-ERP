import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting template updates...');
  
  const targetClasses = ['3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
  
  const classes = await prisma.class.findMany();
  console.log(`Found ${classes.length} total classes in DB.`);
  
  let updatedCount = 0;
  for (const c of classes) {
    if (targetClasses.includes(c.name)) {
      await prisma.class.update({
        where: { id: c.id },
        data: { reportCardTemplate: 'KG' },
      });
      console.log(`Updated class ${c.name} template to 'KG'`);
      updatedCount++;
    }
  }
  
  console.log(`Successfully updated ${updatedCount} classes.`);
}

main()
  .catch((err) => {
    console.error('Error updating templates:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
