import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSort, selectFilteredData, addEntry } from '../store/Tableslice.js';
import * as XLSX from 'xlsx';
import { useForm } from 'react-hook-form';
import './Table.css'; 

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false); 
  const entriesPerPage = 10;
  const dispatch = useDispatch();
  const data = useSelector(selectFilteredData);
  const { filter, sortBy, sortOrder } = useSelector(state => state.table);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSort = (header) => {
    const newSortOrder = sortBy === header && sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSort({ sortBy: header, sortOrder: newSortOrder }));
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'data.xlsx');
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(data.length / entriesPerPage);

  const handleClick = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toggleForm = () => setShowForm(!showForm);

  const handleFormSubmit = () => {
    setShowForm(false); 
  };

  return (
    <div className="table-container">
      <div className="table-actions">
        <input
          type="text"
          placeholder="Filter..."
          value={filter}
          onChange={handleFilterChange}
        />
        <button className="download-button" onClick={handleDownload}>Download as Excel</button>
        <button className="toggle-form-button" onClick={toggleForm}>
          {showForm ? 'Back to Data' : 'Personal Information'}
        </button>
      </div>

      {showForm ? (
        <Form onSubmit={handleFormSubmit} />
      ) : (
        <>
          <table>
            <thead>
              <tr>
                {['accountName', 'email', 'phoneNo', 'website', 'industry', 'accountStatus', 'remark'].map((header) => (
                  <th key={header}>
                    <span onClick={() => handleSort(header)}>
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                      {sortBy === header && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                    </span>
                  </th>
                ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map(entry => (
                <tr key={entry.id}>
                  <td data-label="Account Name">{entry.accountName}</td>
                  <td data-label="Email">{entry.email}</td>
                  <td data-label="Phone No">{entry.phoneNo}</td>
                  <td data-label="Website">{entry.website}</td>
                  <td data-label="Industry">{entry.industry}</td>
                  <td data-label="Account Status">{entry.accountStatus}</td>
                  <td data-label="Remark">{entry.remark}</td>
                  <td>
                    <button>View</button>
                    <button>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="pagination-arrow"
            >
              &laquo; Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handleClick(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="pagination-arrow"
            >
              Next &raquo;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Form = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onFormSubmit = (data) => {
    dispatch(addEntry(data));
    onSubmit(); 
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="form">
      <label>
        Account Name:
        <input {...register('accountName', { required: 'Account Name is required' })} />
        {errors.accountName && <p>{errors.accountName.message}</p>}
      </label>
      <label>
        Email:
        <input type="email" {...register('email', { required: 'Email is required' })} />
        {errors.email && <p>{errors.email.message}</p>}
      </label>
      <label>
        Phone No:
        <input {...register('phoneNo', { required: 'Phone No is required' })} />
        {errors.phoneNo && <p>{errors.phoneNo.message}</p>}
      </label>
      <label>
        Website:
        <input {...register('website', { required: 'Website is required' })} />
        {errors.website && <p>{errors.website.message}</p>}
      </label>
      <label>
        Industry:
        <input {...register('industry', { required: 'Industry is required' })} />
        {errors.industry && <p>{errors.industry.message}</p>}
      </label>
      <label>
        Account Status:
        <input {...register('accountStatus', { required: 'Account Status is required' })} />
        {errors.accountStatus && <p>{errors.accountStatus.message}</p>}
      </label>
      <label>
        Remark:
        <input {...register('remark', { required: 'Remark is required' })} />
        {errors.remark && <p>{errors.remark.message}</p>}
      </label>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default Table;
