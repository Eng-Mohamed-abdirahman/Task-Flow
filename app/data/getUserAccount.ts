import { prisma } from "@/prisma/prisma";

export const getUserAccount = async (userId: string) => {
  const user = await prisma.account.findFirst({
    where: {  userId },
  });
  return user;
};
