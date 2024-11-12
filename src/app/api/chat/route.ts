import { getChatById, saveChat } from '@/actions/chat';
import { generateTitleFromUserMessage } from '@/app/actions';
import { getMostRecentUserMessage } from '@/lib/message';
import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';

export async function POST(req: Request) {
  const { messages, is_test, id, userId } = await req.json();
  console.log('is_test : ', is_test);

  console.log('messages: ', messages);

  const coreMessages = convertToCoreMessages(messages);
  console.log('coreMessages: ', coreMessages);
  const userMessage = getMostRecentUserMessage(coreMessages);
  console.log('userMessage: ', userMessage);

  if (!userMessage) {
    return new Response('No user message found', { status: 400 });
  }

  const chat = await getChatById({ id });

  if (!chat) {
    const title = await generateTitleFromUserMessage({ message: userMessage });
    await saveChat({ id, userId, title });
  }

  const result = await streamText({
    model: openai('gpt-4o-2024-08-06'),
    messages,
  });

  return result.toDataStreamResponse();
}
