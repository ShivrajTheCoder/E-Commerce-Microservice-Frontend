import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RazorpayButton = ({totalPrice,id,or_id}:any): JSX.Element => {
  const router=useRouter();
  useEffect(() => {
    const loadRazorpay = async (): Promise<void> => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: 'rzp_test_sFSldafHF33EGU', // Enter the Key ID generated from the Dashboard
          amount: totalPrice*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: 'INR',
          name: 'Online-Shopping', // Your business name
          description: 'Test Transaction',
          image: 'https://static.vecteezy.com/system/resources/thumbnails/011/401/535/small/online-shopping-trolley-click-and-collect-order-logo-design-template-vector.jpg',
          order_id: id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
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
          await axios.post(`https://localhost:8080/successpayment/${or_id}`,body)
            .then((data) => {
              // Handle the response from the backend if needed
              console.log(data.data,"response from backend");
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

  return <button id="rzp-button1" className='py-2 px-3 bg-green-500 text-white font-bold text-lg rounded-md my-3'>Razorpay</button>;
};

export default RazorpayButton;
