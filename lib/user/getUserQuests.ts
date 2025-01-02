import prisma from "@/prisma/prisma";

export const getUserQuests = async (user: { id: string }) =>
  prisma.quest.findMany({
    where: {
      user: {
        id: user.id,
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
