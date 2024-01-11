import prisma from "@/prisma/prisma";

export const getUserQuests = async (user: { userId: string }) =>
  prisma.quest.findMany({
    where: {
      user: {
        id: user.userId,
      },
    },
    include: {
      steps: {
        orderBy: {
          index: "asc",
        },
      },
    },
    orderBy: {
      index: "asc",
    },
  });
