const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function testTeacher() {
  const user = await prisma.user.findFirst({
    where: { username: 'teacher_8a' }
  });
  console.log('Has passwordHash:', !!user.passwordHash);
  
  const testPasswords = ['password123', 'teacher123', 'admin123', 'Teacher@123', '12345678', 'password', 'teacher_8a', 'Teacher@2025', 'Teacher@2026', 'Password@123'];
  for (const p of testPasswords) {
    const isMatch = await bcrypt.compare(p, user.passwordHash);
    if (isMatch) {
      console.log('Password matched:', p);
      return;
    }
  }
  console.log('No common password matched.');
}

testTeacher().catch(console.error).finally(() => prisma.$disconnect());
