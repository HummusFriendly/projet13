import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const CustomSelect = ({ id, name, value, options, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (value) => {
    onChange({ target: { name, value } });
    setIsOpen(false);
    setSearch('');
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  console.log('Options:', options);
  console.log('Filtered options:', filteredOptions);

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          id={id}
          value={isOpen ? search : options.find((opt) => opt.value === value)?.label || ''}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          aria-autocomplete="list"
          aria-controls={`${id}-listbox`}
          aria-expanded={isOpen}
        />
        <button
          type="button"
          onClick={toggleOpen}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <ul
          id={`${id}-listbox`}
          className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1 transition-opacity duration-200"
          role="listbox"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="px-4 py-2 hover:bg-light-gray cursor-pointer transition-colors duration-150"
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">Aucun résultat</li>
          )}
        </ul>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default CustomSelect;