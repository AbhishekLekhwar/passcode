import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] bg-gradient-to-b from-purple-100 to-white p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-purple-800 mb-6">About PassCode</h1>
        <p className="text-xl text-gray-700 mb-8">
          🔐 Introducing PassCode – My Personal Password Manager Project! 💻✨
        </p>
        <p className="text-xl text-gray-700 mb-8">
          I’ve been working on PassCode, a simple yet secure password manager that helps users safely store their passwords, mapped to their respective websites.
        </p>
        <ul className="text-xl text-gray-700 mb-8 list-disc list-inside">
          <li>🔹 Data is currently stored locally</li>
          <li>🔹 Passwords are encrypted for enhanced security</li>
          <li>🔹 I’m actively working on transforming it into a full-stack application using Node.js and Express</li>
          <li>🔹 In the next phase, I plan to store data in MongoDB, making it scalable and cloud-ready</li>
        </ul>
        <p className="text-xl text-gray-700 mb-8">
          This project has been a great opportunity to explore:
        </p>
        <ul className="text-xl text-gray-700 mb-8 list-disc list-inside">
          <li>✅ Data encryption techniques</li>
          <li>✅ Secure local storage</li>
          <li>✅ Backend development with Node.js & Express</li>
          <li>✅ Integration with MongoDB for persistent storage</li>
        </ul>
        <p className="text-xl text-gray-700 mb-8">
          It’s been a rewarding experience so far, and I’m excited to keep improving it! 🚀
        </p>
        <p className="text-xl text-gray-700 mb-8">
          I’d love to connect with others passionate about security, backend development, or full-stack projects! 🙌
        </p>
      </div>
    </div>
  );
};

export default About;
