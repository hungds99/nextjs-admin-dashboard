import { db } from '@/db';
import { voteTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: string;
  messageId: string;
  type: 'up' | 'down';
}) {
  try {
    const [existingVote] = await db
      .select()
      .from(voteTable)
      .where(and(eq(voteTable.messageId, messageId)));

    if (existingVote) {
      return await db
        .update(voteTable)
        .set({ isUpvoted: type === 'up' ? true : false })
        .where(and(eq(voteTable.messageId, messageId), eq(voteTable.chatId, chatId)));
    } else {
      return await db.insert(voteTable).values({
        chatId,
        messageId,
        isUpvoted: type === 'up' ? true : false,
      });
    }
  } catch (error) {
    console.error('Failed to upvote message in database', error);
    throw error;
  }
}

export async function getVotesByChatId({ id }: { id: string }) {
  try {
    return await db.select().from(voteTable).where(eq(voteTable.chatId, id));
  } catch (error) {
    console.error('Failed to get votes by chat id from database', error);
    throw error;
  }
}
