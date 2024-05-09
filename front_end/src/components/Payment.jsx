import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Payment() {
    const navigate = useNavigate();
    const query = useQuery();
    const name = query.get('name');
    const amount = query.get('amount');
    const service = query.get('service')
    const description = JSON.parse(decodeURIComponent(query.get('description') || '[]'));

    const handleGoBack = () => {
        navigate(-1);  // Navigates back to the previous page
    };

    const handleSendData = () => {
        fetch('http://localhost:8080/process-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({ service,name, amount, description})
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Payment was successful!');
                navigate('/home');  // Redirect to the home page
            } else {
                alert('Payment was not successful.');
                window.location.reload();  // Reloads the current page to retry or review the payment details
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Payment failed due to a network error.');
            window.location.reload();  // Reloads the current page to retry or review the payment details
        });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-xl font-bold mb-4">Payment Details</h1>
                <p className="text-gray-700 mb-2"><strong>Service Name:</strong> {service}</p>
                <p className="text-gray-700 mb-2"><strong>User Name:</strong> {name}</p>
                <p className="text-gray-700 mb-2"><strong>Amount:</strong> ₹{amount}</p>
                <div>
                    <strong>Description:</strong>
                    <ul>
                        {description.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-between mt-4">
                    <button onClick={handleGoBack} className="bg-red-300 hover:bg-red-400 text-black  py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Go Back
                    </button>
                    <button onClick={handleSendData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Send Data
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
