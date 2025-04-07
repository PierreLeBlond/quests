# quests

A minimalist todo app as a list of quest, composed by steps.

## development

### Prisma

Add into `.env.local` your development `DATABASE_URL` environment variable pointing to a `psql` database.

`DATABASE_URL=postgres://<user>:<password>@localhost:5432/quests`

run :

`npx prisma generate`
`npx prisma db push`

### Github OAuth

Add into `.env.local` your development `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.
See https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

`GITHUB_CLIENT_ID="<github client id>"`
`GITHUB_CLIENT_SECRET="<github client password>"`

## Deployment

You'll need to provide several environment variables :

- DATABASE_URL : `psql` database url
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET
- NEXT_PUBLIC_BASE_PATH

And some github secrets :

- FTP_SERVER
- FTP_USERNAME
- FTP_PASSWORD

Then run :

`npx prisma generate`

Though we'd better generate prisma files within github deploy action.

commit & push to remote.

If necessary, update db schema on remote server :

`npx prisma migrate deploy`
