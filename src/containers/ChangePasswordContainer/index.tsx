'use client';

import FormInput from '@/components/commons/form-input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { changePassword } from '@/lib/api/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.confirmPassword === values.newPassword;
    },
    {
      message: 'Password not match',
      path: ['confirmPassword'],
    }
  );

export default function ChangePasswordContainer() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: ({ message }) => {
      toast.success('Success!', {
        description: message,
        position: 'top-right',
      });
    },
    onError: (err) => {
      toast.error('Success!', {
        description: err.message,
        position: 'top-right',
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <div className='flex flex-1 flex-col gap-4 p-4'>
      <h1 className='text-xl font-medium'>Change Password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-1/4'>
          <Card>
            <CardHeader>
              <CardTitle>Change Your Password</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <FormInput
                    control={form.control}
                    name={'oldPassword'}
                    label={'Old Password'}
                    type={'password'}
                    disabled={isPending}
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <FormInput
                    control={form.control}
                    name={'newPassword'}
                    label={'New Password'}
                    type={'password'}
                    disabled={isPending}
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <FormInput
                    control={form.control}
                    name={'confirmPassword'}
                    label={'Confirm Password'}
                    type={'password'}
                    disabled={isPending}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button type='submit' disabled={isPending}>
                Submit
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
