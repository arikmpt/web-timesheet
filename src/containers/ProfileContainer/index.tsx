'use client';

import { ComboBox } from '@/components/commons/combo-box';
import FormInput from '@/components/commons/form-input';
import FormTextArea from '@/components/commons/form-text-area';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormLabel } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { updateProfile } from '@/lib/api/profile';
import { getCountries } from '@/lib/api/ref';
import { useProfileStore } from '@/lib/store/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useForm, UseFormSetError } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  APIDefaultErrors,
  getErrorMessage,
  getRhfErrorKeys,
  setRhfError,
} from '@/lib/api/types';
import { DatePicker } from '@/components/commons/date-picker';
import { format } from 'date-fns';

const formSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  placeOfBirth: z.string().nullable(),
  address: z.string().nullable(),
  countryCode: z.string().nullable(),
  contactNumber: z.string().nullable(),
  birthOfDate: z.date().nullable(),
});

const handleAPIErrors = (
  setError: UseFormSetError<z.infer<typeof formSchema>>,
  errorResponse?: APIDefaultErrors
) => {
  const { errors, message } = errorResponse ?? {};

  if (!errors && !message) {
    return;
  }

  if (errors) {
    const errorKeys = getRhfErrorKeys<z.infer<typeof formSchema>>([
      'firstName',
      'lastName',
      'contactNumber',
      'address',
      'countryCode',
      'placeOfBirth',
      'birthOfDate',
    ]);

    setRhfError(setError, errorKeys, errors);
    return getErrorMessage(errorKeys, errors) ?? message;
  }

  if (message) {
    return message;
  }
};

export default function ProfileContainer() {
  const { profile, setProfile } = useProfileStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const countryCode = form.watch('countryCode');
  const birthOfDate = form.watch('birthOfDate')
    ? new Date(form.watch('birthOfDate') ?? '')
    : new Date();

  useEffect(() => {
    if (profile) {
      form.reset({
        ...profile,
        birthOfDate:
          typeof profile.birthOfDate === 'string'
            ? new Date(profile.birthOfDate)
            : profile.birthOfDate,
      });
    }
  }, [form, profile]);

  const { data, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    enabled: true,
  });

  const countries = useMemo(
    () =>
      data?.countries.flatMap((country) => ({
        label: country.name,
        value: country.dialCode,
      })) ?? [],
    [data?.countries]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: ({ profile }) => {
      setProfile(profile);
      toast.success('Success!', {
        description: 'Successfully updated profile',
        position: 'top-right',
      });
    },
    onError: (err: APIDefaultErrors = {}) => {
      const title =
        handleAPIErrors(form.setError, err) ?? 'Failed to update profile';
      toast.error('Error!', {
        description: title,
        position: 'top-right',
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      ...values,
      birthOfDate: format(values.birthOfDate ?? new Date(), 'yyyy-MM-dd'),
    });
  };

  const isDisabled = isLoading || isPending;

  return (
    <div className='flex flex-1 flex-col gap-4 p-4'>
      <h1 className='text-xl font-medium'>Profile</h1>
      <div className='flex gap-4'>
        <Card className='w-1/2'>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label>Email</Label>
                <span>{profile?.user.email ?? '-'}</span>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label>First Name</Label>
                <span>{profile?.firstName ?? '-'}</span>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label>Last Name</Label>
                <span>{profile?.lastName ?? '-'}</span>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label>Country Code</Label>
                <span>{profile?.countryCode ?? '-'}</span>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label>Contact Number</Label>
                <span>{profile?.contactNumber ?? '-'}</span>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label>Birth of Date</Label>
                <span>
                  {profile?.birthOfDate
                    ? format(profile?.birthOfDate, 'PPP')
                    : '-'}
                </span>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label>Place of Birth</Label>
                <span>{profile?.placeOfBirth ?? '-'}</span>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label>Address</Label>
                <span>{profile?.address ?? '-'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-1/2'>
            <Card className='w-full'>
              <CardHeader>
                <CardTitle>Update Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid w-full items-center gap-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <FormInput
                      control={form.control}
                      name={'firstName'}
                      label={'First Name'}
                      type={'text'}
                      disabled={isDisabled}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <FormInput
                      control={form.control}
                      name={'lastName'}
                      label={'Last Name'}
                      type={'text'}
                      disabled={isDisabled}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <FormLabel>{'Select Country'}</FormLabel>
                    <ComboBox
                      options={countries}
                      value={countryCode ?? ''}
                      disabled={isDisabled}
                      onChange={(v) => form.setValue('countryCode', v)}
                      placeholder={'Please select country'}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <FormInput
                      control={form.control}
                      name={'contactNumber'}
                      label={'Contact Number'}
                      type={'text'}
                      disabled={isDisabled}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <FormLabel>{'Birth of Date'}</FormLabel>
                    <DatePicker
                      date={birthOfDate}
                      onSelect={(date) => {
                        if (date) {
                          form.setValue('birthOfDate', date);
                        }
                      }}
                      captionLayout={'dropdown'}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <FormInput
                      control={form.control}
                      name={'placeOfBirth'}
                      label={'Place of Birth'}
                      type={'text'}
                      disabled={isDisabled}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <FormTextArea
                      control={form.control}
                      name={'address'}
                      label={'Address'}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className='flex justify-end'>
                <Button type='submit' disabled={isDisabled}>
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
