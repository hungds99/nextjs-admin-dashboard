import { AppContainer } from '@/components/common/app-container';
import { Metadata } from 'next';
import { z } from 'zod';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { taskSchema } from './data/schema';

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.',
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = Array.from({ length: 100 }, () => ({
    id: `TASK-${Math.floor(Math.random() * 10000)}`,
    title: "You can't compress the program without quantifying the open-source SSD pixel!",
    status: ['backlog', 'todo', 'open', 'in progress', 'canceled'][Math.floor(Math.random() * 5)],
    label: ['documentation', 'feature', 'bug'][Math.floor(Math.random() * 3)],
    priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
  }));

  return z.array(taskSchema).parse(data);
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <AppContainer>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
          <p className='text-muted-foreground'>Here&apos;s a list of your tasks for this month!</p>
        </div>
      </div>
      <DataTable data={tasks} columns={columns} />
    </AppContainer>
  );
}
