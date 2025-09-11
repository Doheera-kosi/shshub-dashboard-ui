'use client';

import { useState } from 'react';
import Image from 'next/image';
import PaymentResponseModal from '@/components/card-response/PaymentResponseModal';
import Loader from '@/components/Loader';

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('VISA Card');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const paymentOptions = [
    { name: 'VISA Card', logo: '/visa-card-logo.png' },
    { name: 'Mastercard', logo: '/mastercard-logo.png' },
    { name: 'MTN MoMo', logo: '/logo-de-mtn-money.png' },
    { name: 'Telecash', logo: '/telecel-cash-1.jpg' },
    { name: 'AirtelTigo Money', logo: '/airteltigo-money-logo.png' },
  ];

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newErrors: Record<string, string> = {};
    let firstErrorId: string | null = null;

    Array.from(formData.entries()).forEach(([name, value]) => {
      if (!value) {
        newErrors[name] = 'This field is required';
        if (!firstErrorId) {
          firstErrorId = name;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (firstErrorId) {
        const errorElement = document.getElementById(firstErrorId);
        if (errorElement) {
          errorElement.focus();
        }
      }
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Simulate a network request
    setTimeout(() => {
      if (selectedPayment === 'VISA Card') {
        setPaymentSuccess(true);
      } else {
        setPaymentSuccess(false);
      }
      setIsModalOpen(true);
      setIsLoading(false);
    }, 2000);
  };

  const renderForm = () => {
    switch (selectedPayment) {
      case 'VISA Card':
      case 'Mastercard':
        return (
          <form className="space-y-8 w-full" onSubmit={handlePayment} noValidate>
            <div className="relative">
              <input type="text" id="cardNumber" name="cardNumber" required className={`block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 ${errors.cardNumber ? 'focus:border-red-500' : 'focus:border-blue-600'} peer`} placeholder=" " />
              <label htmlFor="cardNumber" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">Card Number</label>
              {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="flex space-x-4">
              <div className="relative w-1/2">
                <input type="text" id="expiryDate" name="expiryDate" required className={`block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 ${errors.expiryDate ? 'focus:border-red-500' : 'focus:border-blue-600'} peer`} placeholder="MM/YY" />
                <label htmlFor="expiryDate" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">Expiry Date</label>
                {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
              </div>
              <div className="relative w-1/2">
                <input type="text" id="cvv" name="cvv" required className={`block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 ${errors.cvv ? 'focus:border-red-500' : 'focus:border-blue-600'} peer`} placeholder=" " />
                <label htmlFor="cvv" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">CVV</label>
                {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
              </div>
            </div>
            <div className="relative">
              <input type="text" id="cardholderName" name="cardholderName" required className={`block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border ${errors.cardholderName ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 ${errors.cardholderName ? 'focus:border-red-500' : 'focus:border-blue-600'} peer`} placeholder=" " />
              <label htmlFor="cardholderName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">Cardholder Name</label>
              {errors.cardholderName && <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>}
            </div>
            <button type="submit" className="w-full bg-gray-400 text-white py-3 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105">Pay Now</button>
          </form>
        );
      case 'MTN MoMo':
      case 'Telecash':
      case 'AirtelTigo Money':
        return (
          <form className="space-y-8 w-full" onSubmit={handlePayment} noValidate>
            <div className="relative">
                <input type="text" id="phoneNumber" name="phoneNumber" required className={`block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 ${errors.phoneNumber ? 'focus:border-red-500' : 'focus:border-blue-600'} peer`} placeholder=" " />
                <label htmlFor="phoneNumber" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">Phone Number</label>
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>
            <div className="relative">
                <input type="password" id="pin" name="pin" required className={`block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border ${errors.pin ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 ${errors.pin ? 'focus:border-red-500' : 'focus:border-blue-600'} peer`} placeholder=" " />
                <label htmlFor="pin" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">Transaction PIN</label>
                {errors.pin && <p className="text-red-500 text-xs mt-1">{errors.pin}</p>}
            </div>
            <button type="submit" className="w-full bg-gray-400 text-white py-3 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105">Pay Now</button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
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
            {isLoading && <Loader />}
            {isModalOpen && (
              <PaymentResponseModal
                onClose={() => setIsModalOpen(false)}
                success={paymentSuccess}
                paymentDetails={
                  paymentSuccess
                    ? {
                        userIndex: '12345',
                        transactionAmount: 100.0,
                        total: 110.0,
                        paymentMethod: selectedPayment,
                        referenceId: 'REF123456789',
                      }
                    : undefined
                }
              />
            )}
        </div>
  );
};

export default PaymentPage;