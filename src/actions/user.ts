import { db } from '@/lib/kysely';
import { User } from '@/schema';

export async function getUsers() {
  let users: User[] = [];

  try {
    users = await db.selectFrom('users').selectAll().where('deleted_at', 'is', null).execute();
  } catch (error) {
    console.error('Error fetching users', error);
    throw new Error('Error fetching users');
  }

  return users;
}
