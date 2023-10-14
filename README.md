# quests

A minimalist todo app as a list of quest, composed by steps.

## dev

Install `bun`.

### server

### Prisma

Add into `.env.local` your development `DATABASE_URL` environment variable pointing to a `mysql` database.

`DATABASE_URL='mysql://<user>:<password>@localhost:3306/quests'`

run :

`bunx prisma generate`
`bunx prisma db push`

#### Github OAuth

Add into `.env.local` your development `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`. See https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

`GITHUB_CLIENT_ID="<github client id>"`
`GITHUB_CLIENT_SECRET="<github client password>"`

### client

Add into `.env.local` your development `NEXT_PUBLIC_API_URL` public environment variable pointing to your local running server.

`NEXT_PUBLIC_API_URL='http://localhost:3000/'`
