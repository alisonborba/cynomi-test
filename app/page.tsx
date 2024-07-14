'use client';

import React, { useState } from 'react';
import { CreateUserForm } from '@/app/components/CreateUserForm';
import { CreateSleepForm } from '@/app/components/CreateSleepForm';
import { Button } from '@/components/ui/button';
import Modal from '@/app/components/Modal';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <Button onClick={openModal}>Add New User</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CreateUserForm onSuccess={closeModal} />
      </Modal>
      <div className="mb-4">
        <CreateSleepForm />
      </div>
    </div>
  );
};

export default HomePage;
