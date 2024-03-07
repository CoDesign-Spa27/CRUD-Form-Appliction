// components/Table.js
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Table = ({ onRowSelect }) => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editedData, setEditedData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    hobbies: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://redpositive-162t.onrender.com/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 const handleUpdate = (id) => {
    const selectedRow = data.find((item) => item._id === id);
    setSelectedRowData(selectedRow);
    setEditedData({
      name: selectedRow.name,
      phoneNumber: selectedRow.phoneNumber,
      email: selectedRow.email,
      hobbies: selectedRow.hobbies,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = await axios.patch(
        `https://redpositive-162t.onrender.com/api/data/${selectedRowData._id}`,
        editedData
      );
     
      fetchData();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating row:', error);
    }
  };


  const handleDelete = async (id) => {
    try {
  
      await axios.delete(`https://redpositive-162t.onrender.com/api/data/${id}`);
       
      fetchData();
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const handleCheckboxChange = (rowId) => {
 
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter((id) => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
      }
    });
  };

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
    <table className="w-full text-sm text-left rtl:text-right ">
      {/* Table headers */}
      <thead className='text-xs uppercase bg-gray-50   dark:text-gray-800'>
        <tr>
          <th scope='col'
          className='px-6 py-3'
          >Select</th>
          <th
          scope='col'
          className='px-6 py-3'
          >ID</th>
          <th
          scope='col'
          className='px-6 py-3'
          >Name</th>
          <th
          scope='col'
          className='px-6 py-3'
          >Phone Number</th>
          <th
          scope='col'
          className='px-6 py-3'
          >Email</th>
          <th
          scope='col'
          className='px-6 py-3'
          >Hobbies</th>
          <th
          scope='col'
          className='px-6 py-3'
          >Action</th>
        </tr>
      </thead>
      {/* Table rows */}
      <tbody>
        {data.map((item) => (
          <tr 
          className='bg-white border-b dark:border-gray-700 hover:bg-gray-200  '
          key={item._id}>
            <td
            className="px-6 py-4"
            >
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(item._id)}
                checked={selectedRows.includes(item._id)}
              />
            </td>
            <td
            className="px-6 py-4"
            
            >{item._id}</td>
            <td
            className="px-6 py-4"
            
            >{item.name}</td>
            <td
            className="px-6 py-4"
            
            >{item.phoneNumber}</td>
            <td
            className="px-6 py-4"
            
            >{item.email}</td>
            <td
            className="px-6 py-4"
            
            >{item.hobbies}</td>
            <td
            className="px-6 py-4"
            
            >
              <button
              className='text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
              onClick={() => handleUpdate(item._id)}>Update</button>
              <button
              className='text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
              onClick={() => handleDelete(item._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {isEditModalOpen && selectedRowData && (
        <div>
             <div className='w-full flex justify-center items-center'>
  <div className="form-container w-full sm:w-[50%] md:w-[40%] lg:w-[30%] grid gap-6 mb-6 md:grid-cols-1">
    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-black' htmlFor="name">Name:</label>
    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="text" id="name" name="name" value={editedData.name} onChange={(e) =>
              setEditedData({ ...editedData, name: e.target.value })
            } />

    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-black' htmlFor="phoneNumber">Phone Number:</label>
    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="text" id="phoneNumber" value={editedData.phoneNumber} name="phoneNumber"  onChange={(e) =>
              setEditedData({ ...editedData, phoneNumber: e.target.value })
            } />

    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-black' htmlFor="email">Email:</label>
    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="text" id="email" value={editedData.email} name="email"   onChange={(e) =>
              setEditedData({ ...editedData, email: e.target.value })
            }/>

    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-black' htmlFor="hobbies">Hobbies:</label>
    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="text" id="hobbies" value={editedData.hobbies} name="hobbies"   onChange={(e) => setEditedData({ ...editedData, hobbies: e.target.value })
            } />

    <div className="flex justify-center">
      <button className='rounded-lg text-sm px-5 py-2.5 me-2 mb-2 font-medium bg-green-400 hover:bg-green-300 text-white hover:text-black'onClick={handleSaveChanges}>Save</button>
      <button className='rounded-lg text-sm px-4 py-2 me-2 mb-2 font-medium border-2 hover:border-gray-300 border-gray-200'  onClick={() => setIsEditModalOpen(false)}>Cancel</button>
    </div>
  </div>
</div>
          
 
        </div>
      )}
    </div>

  );
};

export default Table;
