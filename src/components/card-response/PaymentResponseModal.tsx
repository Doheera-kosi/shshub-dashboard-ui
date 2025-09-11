import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Printer } from 'lucide-react';

interface PaymentResponseModalProps {
  onClose: () => void;
  success: boolean;
  paymentDetails?: {
    userIndex: string;
    transactionAmount: number;
    total: number;
    paymentMethod: string;
    referenceId: string;
  };
}

const PaymentResponseModal: React.FC<PaymentResponseModalProps> = ({
  onClose,
  success,
  paymentDetails,
}) => {
  const router = useRouter();

  const handleProceed = () => {
    router.push('/admissions');
  };
  if (success && paymentDetails) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Payment Successful!</h2>
          <div className="border-b border-dashed border-gray-300 mb-4"></div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Receipt</h3>
            <div className="space-y-2">
              <p><strong>Index Number:</strong> {paymentDetails.userIndex}</p>
              <p><strong>Transaction Amount:</strong> GHS {paymentDetails.transactionAmount.toFixed(2)}</p>
              <p><strong>Total:</strong> GHS {paymentDetails.total.toFixed(2)}</p>
              <p><strong>Payment Method:</strong> {paymentDetails.paymentMethod}</p>
              <p><strong>Reference ID:</strong> {paymentDetails.referenceId}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => console.log('Downloading receipt...')}
              className="bg-gray-400 flex justify-center items-center text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Download Receipt <Printer className="text-white ml-2" size={20} />
            </button>
            <button
              onClick={handleProceed}
              className="bg-blue-500 flex justify-center items-center text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Proceed <ArrowRight className="text-white ml-2" size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
        <p>Unfortunately, your payment could not be processed. Please try again.</p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              // Logic to try again can be handled by the parent component
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentResponseModal;