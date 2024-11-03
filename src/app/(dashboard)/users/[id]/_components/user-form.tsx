'use client';

import { updateUser } from '@/actions/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User, userSchema } from '@/schema/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
interface UserFormProps {
  user?: User;
}

const formSchema = userSchema.pick({
  name: true,
  position: true,
  phone: true,
  email: true,
});

export default function UserForm({ user }: UserFormProps) {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);
  const navigation = useRouter();

  const form = useForm<User>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: user?.avatar || '',
      name: user?.name || '',
      email: user?.email || '',
      position: user?.position || '',
      phone: user?.phone || '',
    },
  });

  const onSubmit = async (values: User) => {
    const id = user?.id;
    if (!id) return;

    await updateUser(id, values);

    toast('User information has been updated successfully.');

    form.reset({}, { keepValues: true });
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(user?.avatar || null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='avatar'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <div className='flex space-x-4'>
                      <div className='w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center'>
                        {avatar ? (
                          <Image
                            width={96}
                            height={96}
                            src={avatar}
                            alt='Profile'
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <UserIcon className='w-12 h-12 text-muted-foreground' />
                        )}
                      </div>
                      <Input type='hidden' {...field} />
                      <div className='flex items-center'>
                        <div className='flex flex-col space-y-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            disabled
                            onClick={() => document.getElementById('photo-upload')?.click()}
                          >
                            Upload Photo
                          </Button>
                          <input
                            id='photo-upload'
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={handleAvatarUpload}
                            disabled
                          />
                          <Button
                            variant='outline'
                            size='sm'
                            // disabled={!avatar}
                            disabled
                            onClick={handleRemoveAvatar}
                          >
                            Remove Photo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Jenifer Yoon' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='position'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder='CEO' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder='(+84) 321939213' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled placeholder='jeniferyoon@gilsaglobal.com' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <button ref={submitButtonRef} className='hidden' type='submit'>
              Submit
            </button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <div className='flex space-x-2'>
          <Button variant={'outline'} onClick={() => navigation.back()}>
            Cancel
          </Button>
          <Button
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
            onClick={() => submitButtonRef.current?.click()}
          >
            {form.formState.isSubmitting ? 'Saving' : 'Save'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
