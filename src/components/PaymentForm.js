import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    // Create payment method
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setIsProcessing(false);
      return;
    }

    // Send payment method id to backend to create a payment intent
    try {
      const response = await axios.post('/api/stripe/create-payment-intent', {
        amount: 1000, // Example amount in cents
        currency: 'usd',
        paymentMethodId: paymentMethod.id,
      });

      // Handle successful payment intent creation
      const { client_secret } = response.data;

      // Confirm payment intent
      const confirmResult = await stripe.confirmCardPayment(client_secret);

      if (confirmResult.error) {
        console.error(confirmResult.error);
      } else if (confirmResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful!');
      }

      setIsProcessing(false);
    } catch (err) {
      console.error('Error in creating payment intent:', err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <CardElement
              options={{
                hidePostalCode: false,
                style: {
                  base: {
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#333',
                    backgroundColor: '#f9f9f9',
                    padding: '10px',
                    borderRadius: '4px',
                    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                    marginBottom: '16px',
                  },
                },
              }}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isProcessing || !stripe}
              className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
