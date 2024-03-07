 
import React, { useState } from 'react';
import { addData } from '../services/api';

const PopupForm = ({ isOpen, onClose, onAddData }) => {
  const [formData, setFormData] = useState([{ name: '', phoneNumber: '', email: '', hobbies: '' }]);

  const handleInputChange = (e) => {
    const {name,value}=e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  };

  const handleSave = async () => {
    try {
      const response = await addData(formData);
      onAddData(response.savedData);  
    
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div className='w-full flex justify-center items-center'>
  <div className="form-container w-full sm:w-[50%] md:w-[40%] lg:w-[30%] grid gap-6 mb-6 md:grid-cols-1">
    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-black' htmlFor="name">Name:</label>
    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="text" id="name" name="name" onChange={handleInputChange} />

    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-black' htmlFor="phoneNumber">Phone Number:</label>
    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="text" id="phoneNumber" name="phoneNumber" onChange={handleInputChange} />

    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-black' htmlFor="email">Email:</label>
    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="text" id="email" name="email" onChange={handleInputChange} />

    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-black' htmlFor="hobbies">Hobbies:</label>
    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="text" id="hobbies" name="hobbies" onChange={handleInputChange} />

    <div className="flex justify-center">
      <button className='rounded-lg text-sm px-5 py-2.5 me-2 mb-2 font-medium bg-green-400 hover:bg-green-300 text-white hover:text-black' onClick={handleSave}>Save</button>
      <button className='rounded-lg text-sm px-4 py-2 me-2 mb-2 font-medium border-2 hover:border-gray-300 border-gray-200' onClick={onClose}>Cancel</button>
    </div>
  </div>
</div>

  );
};

export default PopupForm;
