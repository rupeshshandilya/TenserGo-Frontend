import { useEffect } from 'react';
import { useRouter } from 'next/router';

const SignIn: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/callback/google&response_type=code&scope=email`;
  }, []);

  return <p>Redirecting to Google...</p>;
};

export default SignIn;
