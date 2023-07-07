import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const RazorpayButton = ({ totalPrice, order_id,or_id }: any): JSX.Element => {
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
          amount: totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: 'INR',
          name: 'Online-Shopping', // Your business name
          description: 'Test Transaction',
          image: 'https://static.vecteezy.com/system/resources/thumbnails/011/401/535/small/online-shopping-trolley-click-and-collect-order-logo-design-template-vector.jpg',
          order_id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler:async function (response: any) {
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
            const data={
              paymentId:response.razorpay_payment_id,
              rzOrderId:response.razorpay_order_id,
              rzSignature:response.razorpay_signature,
            }
            try{  
              const res=await axios.post(`http://localhost:8080/orders/successpayment/${or_id}`,data)
              if(res.status===200){
                router.push("/user/myorders");
              }
            }
            catch(error){
              console.log(error);
            }
          },
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
        rzp1.on('payment.failed', function (response: any) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });

        const button = document.getElementById('rzp-button1') as HTMLButtonElement | null;
        if (button) {
          button.onclick = (e: Event): void => {
            rzp1.open();
            e.preventDefault();
          };
        }
      };
    };

    loadRazorpay();
  }, []);


  return <button id="rzp-button1" className='py-2 px-3 bg-green-500 text-white font-bold text-lg rounded-md my-3'>Razorpay</button>;
};

export default RazorpayButton;
