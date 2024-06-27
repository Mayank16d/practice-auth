'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


function Page() {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Handle form submission
  const handleLogin = async (e:any) => {
    e.preventDefault(); // Prevent the form from submitting traditionally

    try {
        const response = await axios.post('api/signIn', {
          email,
          password,
        });
  
        const token = response.data.token;
        console.table([response, token]);
  
        localStorage.setItem('authToken', token);
        console.log('Login successful');
  
        // Redirect to the home page with token and success flag
       if(response.data.success){
        router.replace("/")
       }
      } catch (error) {
        console.error('Login failed', error);
        // Optionally, handle login failure (e.g., show an error message)
      }
    };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-10 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Page;