import axios from 'axios';

export interface User {
  name: string;
  gender: string;
}

interface UserResponse {
  sleeps: { date: string; duration: number }[];
  _count: any;
  gender: string;
  id: number;
  name: string;
}

interface CreateSleepInput {
  userId: string;
  duration: number;
  date: string;
}

export const createUser = async (user: User): Promise<UserResponse> => {
  const response = await axios.post('/api/createUser', user);
  return response.data;
};

export const getUsers = async (): Promise<UserResponse[]> => {
  const response = await axios.get('/api/getUsers');
  return response.data;
};

export const createSleep = async (sleep: CreateSleepInput) => {
  const response = await axios.post('/api/createSleep', sleep);
  return response.data;
};
