"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const GoogleCallback = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      const code = query.get('code');

      if (code) {
        fetch('/api/auth/google/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.id) {  
              localStorage.setItem('user', JSON.stringify(data)); 
              localStorage.setItem('userId', data.id); 
              router.replace('/'); 
            } else {
              throw new Error('Login unsuccessful');
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        router.replace('/login'); 
      }
    }
  }, []);

  return null; 
};

export default GoogleCallback;
