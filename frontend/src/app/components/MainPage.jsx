// components/MainPage.js
"use client"
import React, { useState, useEffect } from 'react';
import { fetchData, sendEmail, addData } from '../services/api';
import Table from './Table';
import PopupForm from './PopupForm';

const MainPage = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the backend
    fetchData()
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  
  const handleRowSelect = (rowId) => {
    // Toggle selected rows
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter((id) => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
      }
    });
  };

  const handleSendEmail = () => {
    // Send selected rows data to email
    sendEmail({ selectedRows })
      .then((response) => console.log(response.data.message))
      .catch((error) => console.error('Error sending email:', error));
  };

  const handleOpenPopupForm = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopupForm = () => {
    setIsPopupOpen(false);
  };

  const handleAddData = (newData) => {
  
    setData((prevData) => [...prevData, newData]);
 
  };

  return (
    <div className="container mx-auto p-4">
    <Table data={data} onRowSelect={handleRowSelect} selectedRows={selectedRows} />
  
    <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-4">
      <button
        className="rounded-lg text-sm px-5 py-2.5 me-2 mb-2 font-medium bg-red-300 hover:bg-red-400 text-red-900 hover:text-black"
        onClick={handleSendEmail}
      >
        Send to Email
         
      </button>
      
      <button
        className="rounded-lg text-sm px-5 py-2.5 mb-2 font-medium bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-100"
        onClick={handleOpenPopupForm}
      >
        Add New Data
      </button>

    </div>
 

    {isPopupOpen && <PopupForm isOpen={isPopupOpen} onClose={handleClosePopupForm} onAddData={handleAddData} />}
  </div>
  
  );
};

export default MainPage;
