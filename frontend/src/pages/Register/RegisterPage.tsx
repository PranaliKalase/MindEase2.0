import React from 'react';
import { LoginPage } from '../Login/LoginPage';

export const RegisterPage: React.FC = () => {
  return <LoginPage initialMode="signup" />;
};
