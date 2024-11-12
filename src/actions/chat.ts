import { db } from '@/db';
import { chatTable, messageTable, voteTable } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function saveChat({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string;
  title: string;
}) {
  try {
    return await db.insert(chatTable).values({
      id,
      createdAt: new Date(),
      userId,
      title,
    });
  } catch (error) {
    console.error('Failed to save chat in database');
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    await db.delete(voteTable).where(eq(voteTable.chatId, id));
    await db.delete(messageTable).where(eq(messageTable.chatId, id));

    return await db.delete(chatTable).where(eq(chatTable.id, id));
  } catch (error) {
    console.error('Failed to delete chat by id from database');
    throw error;
  }
}

export async function getChatsByUserId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(chatTable)
      .where(eq(chatTable.userId, id))
      .orderBy(desc(chatTable.createdAt));
  } catch (error) {
    console.error('Failed to get chats by user from database');
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const [selectedChat] = await db.select().from(chatTable).where(eq(chatTable.id, id));
    return selectedChat;
  } catch (error) {
    console.error('Failed to get chat by id from database');
    throw error;
  }
}
