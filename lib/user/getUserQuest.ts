import prisma from "@/prisma/prisma";

export const getUserQuest = async (user: { id: string }, questId: string) =>
  prisma.quest.findUniqueOrThrow({
    where: {
      id: questId,
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
  });
