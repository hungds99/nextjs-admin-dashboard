'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useState } from 'react';

export default function CompanyForm() {
  const [logo, setLogo] = useState<string | null>(null);
  const [summary, setSummary] = useState('This summary is auto-filled');

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
  };

  return (
    <Card className='w-full mx-auto'>
      <CardContent className='p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <div className='flex justify-between space-x-5'>
              <div className='w-2/3 border rounded-lg mb-4 h-40 flex items-center justify-center bg-gray-50'>
                {logo ? (
                  <Image
                    width={200}
                    height={200}
                    src={logo}
                    alt='Company Logo'
                    className='max-h-full max-w-full object-contain'
                  />
                ) : (
                  <div className='text-gray-400'>No logo uploaded</div>
                )}
              </div>
              <div className='w-1/3 flex justify-center items-center'>
                <div className='flex flex-col space-y-2'>
                  <Button
                    variant='outline'
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    Upload Logo
                  </Button>
                  <input
                    id='logo-upload'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleLogoUpload}
                  />
                  <Button variant='outline' onClick={handleRemoveLogo} disabled={!logo}>
                    Remove Logo
                  </Button>
                </div>
              </div>
            </div>
            <div className='mt-6'>
              <Label htmlFor='summary'>Summary</Label>
              <Textarea
                id='summary'
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className='h-28 resize-none'
              />
              <div className='text-sm text-gray-500 mt-1'>(0/100)</div>
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='company-name'>Company Name</Label>
              <Input id='company-name' placeholder='KILSA Global Pte., Ltd.' />
            </div>
            <div>
              <Label htmlFor='address'>Address</Label>
              <Input id='address' placeholder='1 Finlayson Green' />
            </div>
            <div>
              <Label htmlFor='country'>Country</Label>
              <Input id='country' placeholder='Singapore' />
            </div>
            <div>
              <Label htmlFor='website'>Website</Label>
              <Input id='website' placeholder='https://kilsaglobal.com' />
            </div>
            <div>
              <Label htmlFor='phone'>Phone Number</Label>
              <Input id='phone' placeholder='+65 0000 0000' />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  );
}
