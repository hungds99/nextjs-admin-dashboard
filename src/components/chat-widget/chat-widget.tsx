'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useChat } from 'ai/react';
import { MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    body: {
      is_test: true,
    },
    initialMessages: [
      {
        id: '1',
        content: '👋 Hi! I am Acme AI, ask me anything about Acme!',
        role: 'assistant',
      },
      {
        id: '2',
        content: 'By the way, you can create a chatbot like me for your website! 🤓',
        role: 'assistant',
      },
    ],
  });

  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <Button
        onClick={toggleChat}
        className='rounded-full w-12 h-12 flex items-center justify-center'
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className='h-6 w-6' /> : <MessageCircle className='h-6 w-6' />}
      </Button>
      {isOpen && (
        <Card className='absolute bottom-16 right-0 w-80 sm:w-96'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0'>
            <div className='flex items-center space-x-2'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src='https://i.pravatar.cc/100' />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className='font-semibold'>Acme AI</div>
            </div>
            <Button variant='ghost' size='icon' onClick={() => setIsOpen(false)}>
              <X className='h-4 w-4' />
              <span className='sr-only'>Close chat</span>
            </Button>
          </CardHeader>
          <CardContent className='space-y-4 h-[500px] overflow-y-auto'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 text-slate-600 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src='https://i.pravatar.cc/100' />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`flex-1 rounded-lg px-4 py-2 text-sm ${
                    message.role === 'user' ? 'bg-blue-100' : 'bg-slate-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter className='flex flex-col space-y-4'>
            <div className='flex gap-2 w-full pt-4'>
              <Button variant='outline' className='flex-1 text-xs'>
                What is Chatbase?
              </Button>
              <Button variant='outline' className='flex-1 text-xs'>
                How do I add data?
              </Button>
            </div>
            <div className='flex w-full items-center space-x-2'>
              <Input
                placeholder='Message...'
                className='flex-1'
                value={input}
                onChange={handleInputChange}
                onKeyUp={handleKeyPress}
                disabled={isLoading}
              />
              <Button size='icon' onClick={handleSubmit} disabled={isLoading}>
                <Send className='h-4 w-4' />
                <span className='sr-only'>Send message</span>
              </Button>
            </div>
            <p className='text-xs text-center text-muted-foreground'>
              By chatting, you agree to our{' '}
              <a href='#' className='underline underline-offset-2'>
                privacy policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
