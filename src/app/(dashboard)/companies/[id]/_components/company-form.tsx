'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Company, companySchema } from '@/schema/company';
import { zodResolver } from '@hookform/resolvers/zod';
import { User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CompanyFormProps {
  company?: Company;
}

const formSchema = companySchema.pick({
  name: true,
  overview: true,
  potential_type: true,
  address: true,
  country: true,
  email_domain: true,
  phone: true,
  matching_criteria: true,
  facebook_url: true,
  linkedin_url: true,
  logo_path: true,
  origin_logo_url: true,
  website: true,
});

const POTENTIAL_TYPES = [
  { value: 1, label: 'Investor' },
  { value: 2, label: 'Buyer' },
] as const;

export default function CompanyForm({ company }: CompanyFormProps) {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(company?.origin_logo_url || '');
  const navigation = useRouter();

  const form = useForm<Company>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company?.name || '',
      overview: company?.overview || '',
      potential_type: company?.potential_type || 0,
      address: company?.address || '',
      country: company?.country || '',
      email_domain: company?.email_domain || '',
      phone: company?.phone || '',
      matching_criteria: company?.matching_criteria || '',
      facebook_url: company?.facebook_url || '',
      linkedin_url: company?.linkedin_url || '',
      logo_path: company?.logo_path || '',
      origin_logo_url: company?.origin_logo_url || '',
      website: company?.website || '',
    },
  });

  const onSubmit = async (values: Company) => {
    const id = company?.id;
    if (!id) return;

    toast('Company information has been updated successfully.');

    form.reset({}, { keepValues: true });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoUrl(company?.origin_logo_url || '');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='logo_path'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <div className='flex space-x-4'>
                      <div className='w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center'>
                        {logoUrl ? (
                          <Image
                            width={96}
                            height={96}
                            src={logoUrl}
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
                            onChange={handleLogoUpload}
                            disabled
                          />
                          <Button variant='outline' size='sm' disabled onClick={handleRemoveLogo}>
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
                    <Input placeholder='Company Name' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='overview'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Company overview' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex gap-4'>
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder='123 Main St' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder='USA' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='flex gap-4'>
              <FormField
                control={form.control}
                name='email_domain'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Email Domain</FormLabel>
                    <FormControl>
                      <Input placeholder='example.com' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder='(+84) 321939213' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='potential_type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Potential Type</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select potential type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {POTENTIAL_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value.toString()}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='matching_criteria'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matching Criteria</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Criteria' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='flex gap-4'>
              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder='https://example.com' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='origin_logo_url'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Origin Logo URL</FormLabel>
                    <FormControl>
                      <Input placeholder='https://example.com/logo.png' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='facebook_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook URL</FormLabel>
                  <FormControl>
                    <Input placeholder='https://facebook.com' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='linkedin_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn URL</FormLabel>
                  <FormControl>
                    <Input placeholder='https://linkedin.com' {...field} />
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
