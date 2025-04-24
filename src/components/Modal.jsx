import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-off-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <div className="text-center">{children}</div>
        <button
          onClick={onClose}
          className="mt-6 bg-accent-gold text-white px-6 py-3 rounded-lg shadow-md hover:bg-emerald-green w-full"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;