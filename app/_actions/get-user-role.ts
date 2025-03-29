import { db } from "../_lib/prisma"

export async function getUserRole(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true }
  })

  return user?.role
} 