import Elysia, { t } from "elysia";
import { authenticated } from "@/src/authenticated";
import prisma from "@/src/prisma";
import { Quest, QuestInput } from "@/prisma/generated/typebox";

const reorder = (userId: string, from: number, to: number) =>
  prisma.quest.updateMany({
    where: {
      user: {
        id: userId,
      },
      index: {
        gt: from,
        lt: to,
      },
    },
    data: {
      index: {
        increment: from < to ? 1 : -1,
      },
    },
  });

export const questPlugin = (app: Elysia) =>
  app
    .use(authenticated)
    .get(
      "/quests",
      async ({ session }) => {
        const quests = await prisma.quest.findMany({
          where: {
            user: {
              id: session.user.userId,
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

        return quests;
      },
      {
        response: t.Array(t.Omit(Quest, ["user"])),
      },
    )
    .get(
      "/quest/:questId",
      async ({ session, params: { questId } }) => {
        const quest = await prisma.quest.findUniqueOrThrow({
          where: {
            id: questId,
            user: {
              id: session.user.userId,
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

        return quest;
      },
      {
        response: t.Omit(Quest, ["user"]),
      },
    )
    .post(
      "/quest",
      async ({ session, body: { name, index } }) => {
        const { 1: quest } = await prisma.$transaction([
          reorder(session.user.userId, -1, 0),
          prisma.quest.create({
            data: {
              name,
              index,
              user: {
                connect: {
                  id: session.user.userId,
                },
              },
            },
          }),
        ]);

        return quest;
      },
      {
        body: t.Omit(QuestInput, ["id", "user", "steps", "user_id"]),
        response: t.Omit(Quest, ["user", "steps"]),
      },
    )
    .post(
      "/quest/:questId",
      async ({ session, body, params: { questId } }) => {
        const quest = await prisma.quest.update({
          where: {
            id: questId,
            user: {
              id: session.user.userId,
            },
          },
          data: body,
        });

        return quest;
      },
      {
        body: t.Omit(QuestInput, ["id", "user", "steps", "user_id"]),
        response: t.Omit(Quest, ["user", "steps"]),
      },
    )
    .delete(
      "/quest/:questId",
      async ({ session, params: { questId } }) => {
        const quest = await prisma.quest.delete({
          where: {
            id: questId,
            user: {
              id: session.user.userId,
            },
          },
        });
        return quest;
      },
      {
        response: t.Omit(Quest, ["user", "steps"]),
      },
    );
