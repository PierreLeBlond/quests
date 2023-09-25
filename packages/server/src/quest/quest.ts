import { authenticated } from "@/src/authenticated";
import prisma from "@/src/prisma";
import Elysia, { t } from "elysia";
import { Quest, QuestInput } from "@/prisma/generated/typebox";

export const quest = (app: Elysia) =>
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
            steps: true,
          },
          orderBy: {
            index: "asc",
          },
        });

        return quests;
      },
      {
        response: t.Array(t.Omit(Quest, ["user"])),
      }
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
            steps: true,
          },
        });

        return quest;
      },
      {
        response: t.Omit(Quest, ["user"]),
      }
    )
    .post(
      "/quest",
      async ({ session, body }) => {
        const quest = await prisma.quest.create({
          data: {
            ...body,
            user: {
              connect: {
                id: session.user.userId,
              },
            },
          },
        });

        return quest;
      },
      {
        body: t.Omit(QuestInput, ["id", "user", "steps", "user_id"]),
        response: t.Omit(Quest, ["user", "steps"]),
      }
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
      }
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
      }
    );
