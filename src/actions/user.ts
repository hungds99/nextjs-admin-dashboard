'use server';

import { db } from '@/lib/kysely';
import { User } from '@/schema/user';

export async function getUsers() {
  let users: User[] = [];

  try {
    users = (await db
      .selectFrom('users')
      .selectAll()
      .where('deleted_at', 'is', null)
      .execute()) as User[];
  } catch (error) {
    console.error('Error fetching users', error);
    throw new Error('Error fetching users');
  }

  return users;
}

export async function getUser(id: string) {
  let user: User | undefined = undefined;

  try {
    user = (await db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .executeTakeFirst()) as User;
  } catch (error) {
    console.error('Error fetching user', error);
    throw new Error('Error fetching user');
  }

  return user;
}

export async function createUser(user: User) {
  try {
    await db.insertInto('users').values(user).executeTakeFirst();
  } catch (error) {
    console.error('Error creating user', error);
    throw new Error('Error creating user');
  }
}

export async function updateUser(id: string, user: any) {
  try {
    await db.updateTable('users').set(user).where('id', '=', id).executeTakeFirst();
  } catch (error) {
    console.error('Error updating user', error);
    throw new Error('Error updating user');
  }
}
