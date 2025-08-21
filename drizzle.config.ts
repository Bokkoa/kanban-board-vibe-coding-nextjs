import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'kanban_user',
    password: 'kanban_password',
    database: 'kanban_board',
  },
} satisfies Config;
