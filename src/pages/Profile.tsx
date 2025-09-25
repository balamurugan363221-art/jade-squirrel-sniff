"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UserCircle2 } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
        <p className="text-muted-foreground">User data not available.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <UserCircle2 className="h-16 w-16 mx-auto text-primary mb-2" />
          <CardTitle className="text-3xl">User Profile</CardTitle>
          <CardDescription>View and manage your account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user.email} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" value="John Doe (Placeholder)" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="memberSince">Member Since</Label>
            <Input id="memberSince" type="text" value="January 2023 (Placeholder)" readOnly />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;