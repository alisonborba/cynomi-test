'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createSleep, getUsers } from '@/lib/api';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  userId: z.string().min(1, {
    message: 'User is required.',
  }),
  duration: z.preprocess(
    (v) => (v === '' ? undefined : Number(v)),
    z
      .number()
      .min(1, {
        message: 'Duration must be at least 1 hour.',
      })
      .max(24, {
        message: 'Duration must be up to 24 hours.',
      })
  ),
  date: z.string().min(1, {
    message: 'Date is required.',
  }),
});

export function CreateSleepForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);
  }, []);

  const { data: users } = useQuery({
    queryKey: ['getUsers'],
    queryFn: getUsers,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
      duration: undefined,
      date: '',
    },
  });

  const mutation = useMutation({
    mutationFn: createSleep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
      router.push('/list');
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      userId: values.userId,
      duration: values.duration,
      date: values.date,
    });
  }

  return (
    <Form {...form}>
      <h1 className="text-center">Add New Sleep Entry</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (hours)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter sleep duration"
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Select date"
                  max={currentDate}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
