import React, { useState } from 'react';

const ContactUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    message: ''
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <button 
        onClick={toggleModal} 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Contact Us
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="name" placeholder="Name" onChange={handleChange} 
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" required />
              <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} 
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" required />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} 
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" required />
              <input type="text" name="country" placeholder="Country" onChange={handleChange} 
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" required />
              <textarea name="message" placeholder="Message" onChange={handleChange} 
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 h-24" required></textarea>
              <div className="flex justify-between">
                <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
                  Submit
                </button>
                <button onClick={toggleModal} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
