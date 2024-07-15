'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email?: string;
  id?: string;
}

const ProtectedPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } 
  }, []);

  if (user) {
    return (
      <>
        <p>Welcome, {user.email}</p>
        <button onClick={() => {
          localStorage.removeItem('user');
          setUser(null);
        }}>Sign out</button>
      </>
    );
  }

 
  return (
    <>
      <p>You are not signed in</p>
      <button onClick={() => router.push('http://localhost:4000/google')} className='cursor-pointer'>Sign in</button>
    </>
  );
};

export default ProtectedPage;
