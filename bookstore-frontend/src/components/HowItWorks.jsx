// src/HowItWorks.js
import React from 'react';
import { FaUserPlus, FaBookOpen, FaCheckCircle } from 'react-icons/fa';

const HowItWorks = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <p className="mb-12">Follow the steps as listed below to post your ads into the website.</p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-yellow-400 text-white text-2xl">
              <FaUserPlus />
            </div>
            <h3 className="text-xl font-semibold">Create Account</h3>
            <p className="text-gray-600">First create your account which requires details (name, email, phone number, etc).</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-purple-400 text-white text-2xl">
              <FaBookOpen />
            </div>
            <h3 className="text-xl font-semibold">Post Your Ads</h3>
            <p className="text-gray-600">Now you can post your ads by adding the description of the book.</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-400 text-white text-2xl">
              <FaCheckCircle />
            </div>
            <h3 className="text-xl font-semibold">You're Done</h3>
            <p className="text-gray-600">Finally you are done. Your account is created and ad is uploaded.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
