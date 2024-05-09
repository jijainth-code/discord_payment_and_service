import React, { useEffect, useState } from 'react';

function Invoice() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/fetch-payments')
            .then(response => response.json())
            .then(data => {
                // Sort data by timestamp descending
                const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setInvoices(sortedData);
            })
            .catch(error => console.error('Error fetching payments:', error));
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl font-bold text-center my-5">Invoices</h1>
            <div className="flex flex-wrap justify-center items-center gap-4 p-4">
                {invoices.map((invoice, index) => (
                    <div key={index} className="bg-white p-5 border border-gray-300 rounded-lg shadow-md w-full max-w-sm">
                        <h2 className="text-xl font-semibold">{invoice.service}</h2>
                        <p><strong>UserName:</strong> {invoice.name}</p>
                        <p><strong>Amount:</strong> ₹{invoice.amount}</p>
                        <div>
                            <strong>Description:</strong>
                            <ul className="list-disc list-inside">
                                {invoice.description.map((item, idx) => <li key={idx}>{item}</li>)}
                            </ul>
                        </div>
                        <p><strong>Timestamp:</strong> {new Date(invoice.timestamp).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Invoice;
