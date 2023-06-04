import axios from 'axios';
import { useEffect } from 'react';

const RazorpayButton = (): JSX.Element => {
  useEffect(() => {
    const loadRazorpay = async (): Promise<void> => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: 'rzp_test_Xl6m3LJjUmLNas', // Enter the Key ID generated from the Dashboard
          amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: 'INR',
          name: 'Ecommerce', // Your business name
          description: 'Test Transaction',
          image: 'https://example.com/your_logo',
          order_id: 'order_LxlS9IbTcb1kxK', // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
          prefill: {
            name: 'Gaurav Kumar', // Your customer's name
            email: 'gaurav.kumar@example.com',
            contact: '9548743479', // Provide the customer's phone number for better conversion rates
          },
          notes: {
            address: 'Razorpay Corporate Office',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp1 = new (window as any).Razorpay(options);
        const button = document.getElementById('rzp-button1') as HTMLButtonElement | null;
        if (button) {
          button.onclick = (e: Event): void => {
            rzp1.open();
            e.preventDefault();
          };
        }

        rzp1.on('payment.success',async (response: any) => {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };
          const body=JSON.stringify(paymentData);
          // Send the paymentData to your backend API
          await axios.post('/api/payment-success',body)
            .then((data) => {
              // Handle the response from the backend if needed
              console.log(data);
            })
            .catch((error) => {
              // Handle any error that occurs during the API request
              console.error(error);
            });
        });
      };
    };

    loadRazorpay();
  }, []);

  return <button id="rzp-button1">Pay</button>;
};

export default RazorpayButton;
