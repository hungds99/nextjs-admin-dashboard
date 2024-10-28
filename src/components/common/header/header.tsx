'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {
  title?: string;
  backLink?: string;
  actions?: React.ReactNode[];
  primaryAction?: React.ReactNode;
}

export const Header = ({ title, backLink, actions = [], primaryAction }: HeaderProps) => {
  return (
    <header className='flex items-center justify-between py-4 bg-background'>
      <div className='flex items-center'>
        {backLink ? (
          <Link href={backLink} className='mr-4'>
            <Button variant='ghost' size='icon'>
              <ChevronLeft className='h-4 w-4' />
              <span className='sr-only'>Back</span>
            </Button>
          </Link>
        ) : null}
        {title && <h1 className='text-xl font-semibold'>{title}</h1>}
      </div>
      <div className='flex items-center space-x-2'>
        {actions.map((action, index) => (
          <React.Fragment key={index}>{action}</React.Fragment>
        ))}
        {primaryAction}
      </div>
    </header>
  );
};
