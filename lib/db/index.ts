import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Database connection string
const connectionString = process.env.DATABASE_URL || 'postgres://kanban_user:kanban_password@localhost:5432/kanban_board';

// Create postgres client
const client = postgres(connectionString);

// Create drizzle instance
export const db = drizzle(client, { schema });

// Export schema for use in other files
export * from './schema';
