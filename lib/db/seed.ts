import { db } from './index';
import { columns, tasks } from './schema';

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Insert default columns
    const insertedColumns = await db.insert(columns).values([
      { title: 'To Do', order: 0 },
      { title: 'In Progress', order: 1 },
      { title: 'Done', order: 2 },
    ]).returning();

    console.log('✅ Columns created:', insertedColumns);

    // Insert sample tasks
    const sampleTasks = [
      {
        title: 'Set up project structure',
        description: 'Initialize the Next.js project with TypeScript and Tailwind CSS',
        columnId: insertedColumns[0].id,
        order: 0,
        priority: 'high',
        status: 'todo',
        assignee: 'Developer',
      },
      {
        title: 'Design database schema',
        description: 'Create the database schema for columns and tasks',
        columnId: insertedColumns[0].id,
        order: 1,
        priority: 'high',
        status: 'todo',
        assignee: 'Developer',
      },
      {
        title: 'Implement drag and drop',
        description: 'Add drag and drop functionality for tasks between columns',
        columnId: insertedColumns[1].id,
        order: 0,
        priority: 'medium',
        status: 'in_progress',
        assignee: 'Developer',
      },
      {
        title: 'Add authentication',
        description: 'Implement user authentication and authorization',
        columnId: insertedColumns[2].id,
        order: 0,
        priority: 'low',
        status: 'done',
        assignee: 'Developer',
        isCompleted: true,
      },
    ];

    const insertedTasks = await db.insert(tasks).values(sampleTasks).returning();
    console.log('✅ Sample tasks created:', insertedTasks);

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seed };
