import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

// Columns table - represents the different columns in the Kanban board (e.g., Todo, In Progress, Done)
export const columns = pgTable('columns', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tasks table - represents individual tasks in the Kanban board
export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  columnId: integer('column_id').references(() => columns.id, { onDelete: 'cascade' }).notNull(),
  order: integer('order').notNull().default(0),
  priority: text('priority').default('medium'), // low, medium, high
  status: text('status').default('todo'), // todo, in_progress, done
  assignee: text('assignee'),
  dueDate: timestamp('due_date'),
  isCompleted: boolean('is_completed').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Types for TypeScript
export type Column = typeof columns.$inferSelect;
export type NewColumn = typeof columns.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
