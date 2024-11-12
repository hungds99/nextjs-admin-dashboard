import { db } from '@/db';
import { User, userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getUser(id: string) {
  try {
    const [user] = await db.select().from(userTable).where(eq(userTable.id, id));
    return user;
  } catch (error) {
    console.error('Failed to get user from database');
    throw error;
  }
}

export async function createUser(data: User) {
  try {
    return await db.insert(userTable).values({ ...data });
  } catch (error) {
    console.error('Failed to create user in database');
    throw error;
  }
}

export async function getUsers() {
  try {
    return await db.select().from(userTable);
  } catch (error) {
    console.error('Failed to get users from database');
    throw error;
  }
}
