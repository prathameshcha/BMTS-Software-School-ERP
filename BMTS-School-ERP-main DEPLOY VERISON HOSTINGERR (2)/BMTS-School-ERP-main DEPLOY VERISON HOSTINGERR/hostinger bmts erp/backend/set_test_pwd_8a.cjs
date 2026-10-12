const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function setTeacher8aPassword() {
  const hash = await bcrypt.hash('Teacher@123', 10);
  const teacherUser = await prisma.user.findFirst({ where: { username: 'teacher_8a' } });
  if (teacherUser) {
    await prisma.user.update({
      where: { id: teacherUser.id },
      data: { passwordHash: hash }
    });
    console.log('teacher_8a password updated to Teacher@123');
  }
}

setTeacher8aPassword().catch(console.error).finally(() => prisma.$disconnect());
