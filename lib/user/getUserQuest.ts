import prisma from "@/prisma/prisma";

export const getUserQuest = async (user: { userId: string }, questId: string) =>
  prisma.quest.findUniqueOrThrow({
    where: {
      id: questId,
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
  });
