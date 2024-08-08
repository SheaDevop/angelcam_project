'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const API_ENDPOINT = 'http://localhost:8000/api/login/'

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(API_ENDPOINT, { token });
      if (response.status === 200) {
        router.replace('/camerasList');
      } else {
        setError('Invalid token');
      }
    } catch (error) {
      setError('Error occurred');
    }
  };

  return (
    <div className='flex items-center justify-center bg-black-900'>
      <form onSubmit={handleSubmit} className='bg-white-700'>
        <input
          type="text"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="Enter your personal access token"
        />
        <button type="submit" className='text-white bg-green-500'>Login</button>
        {error && <div className='text-red'>{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;