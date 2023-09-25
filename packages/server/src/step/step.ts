import { authenticated } from "@/src/authenticated";
import prisma from "@/src/prisma";
import Elysia, { t } from "elysia";
import { Step, StepInput } from "@/prisma/generated/typebox";

export const step = (app: Elysia) =>
  app
    .use(authenticated)
    .get(
      "/quest/:questId/steps",
      async ({ session, params: { questId } }) => {
        const steps = await prisma.step.findMany({
          where: {
            quest: {
              id: questId,
              user: {
                id: session.user.userId,
              },
            },
          },
        });

        return steps;
      },
      {
        response: t.Array(t.Omit(Step, ["quest"])),
      }
    )
    .get(
      "/quest/:questId/step/:id",
      async ({ session, params: { questId, id } }) => {
        const step = await prisma.step.findUniqueOrThrow({
          where: {
            id,
            quest: {
              id: questId,
              user: {
                id: session.user.userId,
              },
            },
          },
        });

        return step;
      },
      {
        response: t.Omit(Step, ["quest"]),
      }
    )
    .post(
      "/quest/:questId/step",
      async ({ session, body, params: { questId } }) => {
        const step = await prisma.step.create({
          data: {
            ...body,
            quest: {
              connect: {
                id: questId,
                user: {
                  id: session.userId.id,
                },
              },
            },
          },
        });

        return step;
      },
      {
        body: t.Omit(StepInput, ["id", "quest", "quest_id"]),
        response: t.Omit(Step, ["quest"]),
      }
    )
    .post(
      "/quest/:questId/step/:id",
      async ({ session, body, params: { questId, id } }) => {
        const step = await prisma.step.update({
          where: {
            id,
            quest: {
              id: questId,
              user: {
                id: session.userId.id,
              },
            },
          },
          data: body,
        });

        return step;
      },
      {
        body: t.Omit(StepInput, ["id", "quest", "quest_id"]),
        response: t.Omit(Step, ["quest"]),
      }
    )
    .delete(
      "/quest/:questId/step/:id",
      async ({ session, params: { questId, id } }) => {
        const step = await prisma.step.delete({
          where: {
            id,
            quest: {
              id: questId,
              user: {
                id: session.userId.id,
              },
            },
          },
        });
        return step;
      },
      {
        response: t.Omit(Step, ["quest"]),
      }
    );
