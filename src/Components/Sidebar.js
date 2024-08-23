import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-screen bg-gray-800 text-white">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        My App
      </div>
      <nav className="flex-grow mt-2">
        <ul>
          <li className="p-4 hover:bg-gray-700 transition duration-300 cursor-pointer">
            Dashboard
          </li>
          <li className="p-4 hover:bg-gray-700 transition duration-300 cursor-pointer">
            Account
          </li>
          <li className="p-4 hover:bg-gray-700 transition duration-300 cursor-pointer">
            Contact
          </li>
          <li className="p-4 hover:bg-gray-700 transition duration-300 cursor-pointer">
            Feedback
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 text-center text-sm">
        <p>© 2024 My App</p>
      </div>
    </div>
  );
};

export default Sidebar;
