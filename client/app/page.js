"use client";
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import GlobalApi from './_utils/GlobalApi';

export default function Home() {
  const { user } = useUser();

  useEffect(() => {
    // Redirect to /home when the component mounts
    redirect('/home');
  }, []);

  useEffect(() => {
    if (user && !localStorage.getItem('isLogin')) {
      createUserProfile();
    }
  }, [user]);

  const createUserProfile = async () => {
    if (user) {
      const data = {
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        image: user.imageUrl
      };

      try {
        const res = await GlobalApi.createUser(data);
        console.log(res.data);
        localStorage.setItem('isLogin', 'true');
      } catch (error) {
        console.error("Error creating user profile:", error);
      }
    }
  };

  return null; 
}
