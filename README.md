# quests

A minimalist todo app as a list of quest, composed by steps.

## dev

### Prisma

Add into `.env.local` your development `DATABASE_URL` environment variable pointing to a `psql` database.

`DATABASE_URL=postgres://<user>:<password>@localhost:5432/quests`

run :

`npx prisma generate`
`npx prisma db push`

### Github OAuth

Add into `.env.local` your development `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`. See https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

`GITHUB_CLIENT_ID="<github client id>"`
`GITHUB_CLIENT_SECRET="<github client password>"`
