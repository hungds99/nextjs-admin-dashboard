import { db } from '@/db';
import { Message, messageTable } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';

export async function saveMessages({ messages }: { messages: Array<Message> }) {
  try {
    return await db.insert(messageTable).values(messages);
  } catch (error) {
    console.error('Failed to save messages in database', error);
    throw error;
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(messageTable)
      .where(eq(messageTable.chatId, id))
      .orderBy(asc(messageTable.createdAt));
  } catch (error) {
    console.error('Failed to get messages by chat id from database', error);
    throw error;
  }
}
