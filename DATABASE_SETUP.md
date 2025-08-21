# Database Setup Guide

This project uses PostgreSQL with Drizzle ORM for data management.

## Prerequisites

- Docker and Docker Compose installed
- Node.js and npm

## Quick Start

1. **Start the PostgreSQL database:**
   ```bash
   docker-compose up -d
   ```

2. **Generate database migrations:**
   ```bash
   npm run db:generate
   ```

3. **Apply migrations to create tables:**
   ```bash
   npm run db:migrate
   ```

4. **Seed the database with initial data:**
   ```bash
   npm run db:seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Database Schema

### Tables

#### `columns`
- `id` - Primary key
- `title` - Column title (e.g., "To Do", "In Progress", "Done")
- `order` - Display order
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

#### `tasks`
- `id` - Primary key
- `title` - Task title
- `description` - Task description (optional)
- `columnId` - Foreign key to columns table
- `order` - Display order within column
- `priority` - Task priority (low, medium, high)
- `status` - Task status (todo, in_progress, done)
- `assignee` - Task assignee (optional)
- `dueDate` - Due date (optional)
- `isCompleted` - Completion status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Available Scripts

- `npm run db:generate` - Generate new migrations based on schema changes
- `npm run db:migrate` - Apply pending migrations to the database
- `npm run db:studio` - Open Drizzle Studio for database management
- `npm run db:seed` - Populate database with sample data

## Environment Variables

The database connection uses the following environment variable (optional):
- `DATABASE_URL` - PostgreSQL connection string

If not provided, it defaults to: `postgres://kanban_user:kanban_password@localhost:5432/kanban_board`

## Database Management

### Using Drizzle Studio

To view and manage your database through a web interface:

```bash
npm run db:studio
```

This will open Drizzle Studio at `http://localhost:4983`

### Manual Database Access

Connect to the PostgreSQL database directly:

```bash
docker exec -it kanban-postgres psql -U kanban_user -d kanban_board
```

## Troubleshooting

### Database Connection Issues

1. Ensure Docker is running
2. Check if the PostgreSQL container is healthy:
   ```bash
   docker-compose ps
   ```

3. View container logs:
   ```bash
   docker-compose logs postgres
   ```

### Migration Issues

1. If you get migration conflicts, you may need to reset the database:
   ```bash
   docker-compose down -v
   docker-compose up -d
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

2. Check migration status:
   ```bash
   npx drizzle-kit introspect
   ```

## Development Workflow

1. Make changes to the schema in `lib/db/schema.ts`
2. Generate new migrations: `npm run db:generate`
3. Apply migrations: `npm run db:migrate`
4. Update seed data if needed: `npm run db:seed`
5. Test your changes

## Production Deployment

For production, make sure to:

1. Use a proper PostgreSQL instance (not Docker)
2. Set the `DATABASE_URL` environment variable
3. Run migrations before starting the application
4. Consider using connection pooling for better performance
