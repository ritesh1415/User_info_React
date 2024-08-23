import React from 'react';
import Sidebar from './Components/Sidebar';
import Table from './Components/Table';

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-6 bg-gray-100">
        <Table />
      </main>
    </div>
  );
};

export default App;
