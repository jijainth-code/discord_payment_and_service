import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function CardComponent() {
    const [amount, setAmount] = useState(0); // Default to 0 before data is loaded
    const [description, setDescription] = useState(['Choose a option above to display service description']);
    const [options, setOptions] = useState({}); // Store options from backend
    const [selectedOptionKey, setSelectedOptionKey] = useState(''); // Track the selected option key
    const [name, setName] = useState('');

    const navigate = useNavigate(); // Instantiate the useNavigate hook

    useEffect(() => {
        fetch('http://localhost:8080/get-options')
            .then(response => response.json())
            .then(data => {
                setOptions(data);
            })
            .catch(error => console.error('Error fetching options:', error));
    }, []);

    function handleOptionChange(event) {
        const optionKey = event.target.value;
        const option = options[optionKey];
        if (option) {
            setDescription(option.description);
            setAmount(parseInt(option.amount));
            setSelectedOptionKey(optionKey); // Update the selected option key
        } else {
            setDescription([]);
            setAmount(0);
            setSelectedOptionKey(''); // Clear the selected option key
        }
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (name.trim() && amount !== 0 && selectedOptionKey) {
            const descriptionString = encodeURIComponent(JSON.stringify(description));
            navigate(`/payment?name=${encodeURIComponent(name)}&amount=${amount}&description=${descriptionString}&service=${encodeURIComponent(selectedOptionKey)}`);
        } else {
            alert('Please fill out all required fields.');
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Amount
                    </label>
                    <p>₹{amount.toLocaleString()}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Services
                    </label>
                    <select onChange={handleOptionChange} required className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value="">Select an Option</option>
                        {Object.keys(options).map(key => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                    </label>
                    <ul className="bg-gray-100 p-2 list-disc list-inside">
                        {description.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Your Name
                        <span className="text-gray-400"> (e.g Discord name)</span>
                    </label>
                    <input type="text" value={name} onChange={handleNameChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Proceed
                </button>
            </div>
        </div>
    );
}

export default CardComponent;
