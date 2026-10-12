const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function setTeacherTestPassword() {
  const hash = await bcrypt.hash('Teacher@123', 10);
  const teacherUser = await prisma.user.findFirst({ where: { username: 'teacher_1st' } });
  if (teacherUser) {
    await prisma.user.update({
      where: { id: teacherUser.id },
      data: { passwordHash: hash }
    });
    console.log('teacher_1st password updated to Teacher@123');
  }
}

setTeacherTestPassword().catch(console.error).finally(() => prisma.$disconnect());
