import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from './Modal';
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
    dispatch(addEmployee({ ...formData }));
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">HRnet</h1>
      <Link to="/employees" className="text-blue-500 hover:underline mb-4 block">
        Voir les employés actuels
      </Link>
      <h2 className="text-2xl font-semibold mb-4">Créer un employé</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        <div>
          <label htmlFor="firstName" className="block mb-1">Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-1">Nom</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="block mb-1">Date de naissance</label>
          <DatePicker
            selected={formData.dateOfBirth}
            onChange={(date) => handleDateChange('dateOfBirth', date)}
            className="w-full border rounded px-3 py-2"
            dateFormat="MM/dd/yyyy"
            required
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block mb-1">Date de début</label>
          <DatePicker
            selected={formData.startDate}
            onChange={(date) => handleDateChange('startDate', date)}
            className="w-full border rounded px-3 py-2"
            dateFormat="MM/dd/yyyy"
            required
          />
        </div>
        <fieldset className="border p-4 rounded">
          <legend className="text-lg font-medium">Adresse</legend>
          <div>
            <label htmlFor="street" className="block mb-1">Rue</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block mb-1">Ville</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block mb-1">État</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              {states.map((state) => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="zipCode" className="block mb-1">Code postal</label>
            <input
              type="number"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </fieldset>
        <div>
          <label htmlFor="department" className="block mb-1">Département</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option>Ventes</option>
            <option>Marketing</option>
            <option>Ingénierie</option>
            <option>Ressources humaines</option>
            <option>Juridique</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enregistrer
        </button>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>Employé créé !</p>
      </Modal>
    </div>
  );
};

export default CreateEmployee;