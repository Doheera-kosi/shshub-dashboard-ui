'use client';

import { useState } from 'react';
import Image from 'next/image';

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('VISA Card');

  const paymentOptions = [
    { name: 'VISA Card', logo: '/visa-card-logo.png' },
    { name: 'Mastercard', logo: '/mastercard-logo.png' },
    { name: 'MTN MoMo', logo: '/logo-de-mtn-money.png' },
    { name: 'Telecash', logo: '/telecel-cash-1.jpg' },
    { name: 'AirtelTigo Money', logo: '/airteltigo-money-logo.png' },
  ];

  const renderForm = () => {
    switch (selectedPayment) {
      case 'VISA Card':
      case 'Mastercard':
        return (
          <form className="space-y-8 w-full">
            <div className="relative">
              <input type="text" id="cardNumber" className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="cardNumber" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">Card Number</label>
            </div>
            <div className="flex space-x-4">
              <div className="relative w-1/2">
                <input type="text" id="expiryDate" className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="MM/YY" />
                <label htmlFor="expiryDate" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">Expiry Date</label>
              </div>
              <div className="relative w-1/2">
                <input type="text" id="cvv" className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="cvv" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">CVV</label>
              </div>
            </div>
            <div className="relative">
              <input type="text" id="cardholderName" className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="cardholderName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">Cardholder Name</label>
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md shadow-md hover:bg-green-700 transition-colors">Pay Now</button>
          </form>
        );
      case 'MTN MoMo':
      case 'Telecash':
      case 'AirtelTigo Money':
        return (
          <form className="space-y-8 w-full">
            <div className="relative">
                <input type="text" id="phoneNumber" className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="phoneNumber" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">Phone Number</label>
            </div>
            <div className="relative">
                <input type="password" id="pin" className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="pin" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">Transaction PIN</label>
            </div>
            <button type="submit" className="w-full bg-gray-400 text-white py-3 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105">Pay Now</button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
        <div className="max-w-7xl mx-auto">
            
            <div className="flex items-center gap-4 mb-6">
                <Image src="/logos/MOE-logo.png" alt="MOE Logo" width={200} height={200} />
            </div>
        </div>
        <div className=" flex items-center justify-center p-4">
            <div className="w-full max-w-6xl h-[80vh] bg-white rounded-2xl shadow-sm flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-1/2 p-8 space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Summary of Charges</h2>
                        <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Main charge</span>
                            <span>GHC 100.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>VAT</span>
                            <span>GHC 10.00</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>GHC 110.00</span>
                        </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
                        <div className="space-y-4">
                        {paymentOptions.map((option) => (
                            <div
                            key={option.name}
                            onClick={() => setSelectedPayment(option.name)}
                            className={`flex items-center justify-between w-full text-left p-4 rounded-full transition-colors cursor-pointer ${selectedPayment === option.name ? 'bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'}`}
                            >
                              <div className="flex items-center">
                                <Image src={option.logo} alt={option.name} width={40} height={40} className="mr-4" />
                                <span>{option.name}</span>
                              </div>
                            <input
                                type="radio"
                                name="payment-option"
                                value={option.name}
                                checked={selectedPayment === option.name}
                                readOnly
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 py-8 px-12 bg-gray-50 border-l border-gray-200 flex justify-center items-center">
                {renderForm()}
                </div>
            </div>
        </div>
    </div>
  );
};

export default PaymentPage;