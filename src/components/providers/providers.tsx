'use client';

import { NuqsAdapter } from 'nuqs/adapters/next';
import React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
