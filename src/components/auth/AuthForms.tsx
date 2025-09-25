import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { showSuccess, showError } from '@/utils/toast'; // Assuming you have these toast utilities

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForms: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Placeholder for actual authentication logic
      if (type === 'login') {
        console.log('Attempting login with:', email, password);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        showSuccess('Logged in successfully!');
        navigate('/dashboard');
      } else {
        console.log('Attempting registration with:', email, password);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        showSuccess('Registered successfully! Please log in.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Auth error:', error);
      showError(`Failed to ${type}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {type === 'login' ? 'Login to Polaris AI' : 'Register for Polaris AI'}
          </CardTitle>
          <CardDescription className="text-center">
            {type === 'login' ? 'Enter your credentials below' : 'Create your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Loading...' : (type === 'login' ? 'Login' : 'Register')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {type === 'login' ? (
              <>
                Don't have an account?{' '}
                <Link to="/register" className="underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/login" className="underline">
                  Login
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForms;