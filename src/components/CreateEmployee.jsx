import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from '@hummusfriendly/react-modal';
import CustomSelect from './CustomSelect';
import { addEmployee } from '../store/employeeSlice';
import { states } from '../data/states';

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    department: 'Sales',
    street: '',
    city: '',
    state: 'AL',
    zipCode: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serializedFormData = {
      ...formData,
      dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.toISOString() : null,
      startDate: formData.startDate ? formData.startDate.toISOString() : null,
    };
    dispatch(addEmployee(serializedFormData));
    setIsModalOpen(true);
  };

  const stateOptions = states.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl text-center mb-8 text-gray-800">HRnet</h1>
      <Link to="/employees" className="text-blue-500 hover:text-blue-700 mb-6 block text-lg font-semibold">
        View Current Employees
      </Link>
      <h2 className="text-2xl mb-6 text-center text-gray-800">Create Employee</h2>
      <form onSubmit={handleSubmit} className="bg-off-white p-8 rounded-xl shadow-lg space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-1 font-medium text-gray-800">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1 font-medium text-gray-800">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-white"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dateOfBirth" className="block mb-1 font-medium text-gray-800">Date of Birth</label>
            <DatePicker
              selected={formData.dateOfBirth}
              onChange={(date) => handleDateChange('dateOfBirth', date)}
              className="w-full bg-white"
              dateFormat="MM/dd/yyyy"
              required
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block mb-1 font-medium text-gray-800">Start Date</label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => handleDateChange('startDate', date)}
              className="w-full bg-white"
              dateFormat="MM/dd/yyyy"
              required
            />
          </div>
        </div>
        <fieldset className="bg-white p-6 rounded-lg shadow-md">
          <legend className="text-xl font-semibold text-gray-800">Address</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="street" className="block mb-1 font-medium text-gray-800">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block mb-1 font-medium text-gray-800">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block mb-1 font-medium text-gray-800">State</label>
              <CustomSelect
                id="state"
                name="state"
                value={formData.state}
                options={stateOptions}
                onChange={handleChange}
                placeholder="Select a state"
              />
            </div>
            <div>
              <label htmlFor="zipCode" className="block mb-1 font-medium text-gray-800">Zip Code</label>
              <input
                type="number"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
          </div>
        </fieldset>
        <div>
          <label htmlFor="department" className="block mb-1 font-medium text-gray-800">Department</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full bg-white"
            required
          >
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-accent-gold text-white px-6 py-3 rounded-lg shadow-md hover:bg-emerald-green w-full"
        >
          Save
        </button>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p className="text-lg text-gray-800">Employé créé</p>
      </Modal>
    </div>
  );
};

export default CreateEmployee;