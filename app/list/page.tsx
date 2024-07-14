'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUsers } from '@/lib/api';
import { ChartComponent } from './ChartComponent';

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState('');
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['getUsers'],
    queryFn: getUsers,
  });

  if (usersLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Entries</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <React.Fragment key={user.id}>
              <TableRow onClick={() => setSelectedUser(user.id.toString())}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user._count.sleeps}</TableCell>
              </TableRow>
              {selectedUser === user.id.toString() && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <ChartComponent sleepData={user.sleeps} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
