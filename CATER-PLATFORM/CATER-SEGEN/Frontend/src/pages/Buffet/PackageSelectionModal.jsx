import React, { useState } from 'react';
import Modal from 'react-modal';

const PackageSelectionModal = ({ isOpen, closeModal, handlePackageChange, activePackages, formData }) => {
  const [selectedPackage, setSelectedPackage] = useState(formData.packageName);

  const handleChange = (e) => {
    setSelectedPackage(e.target.value);
  };

  const handleSubmit = () => {
    handlePackageChange(selectedPackage);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} ariaHideApp={false}>
      <h2>Select Package</h2>
      <div>
        {['Silver Package', 'Gold Package', 'Diamond Package', 'Cocktail Package'].map((packageName) => {
          const isActive = activePackages().find((pack) => pack.name === packageName);
          let message = '';
          if (isActive) {
            message = `Minimum no. of pax - ${isActive.minGuests}`;
          } else {
            message = `Minimum ${packageName === 'Silver Package' ? '0' : packageName === 'Gold Package' ? '500' : '1000'} pax`;
          }
          return (
            <label key={packageName}>
              <input
                type="radio"
                name="packageName"
                value={packageName}
                onChange={handleChange}
                checked={selectedPackage === packageName}
              />
              <span>{packageName}</span>
              {!isActive && <span className="text-red-500 ml-2">{message}</span>}
            </label>
          );
        })}
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={closeModal}>Cancel</button>
    </Modal>
  );
};

export default PackageSelectionModal;
