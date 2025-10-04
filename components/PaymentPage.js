"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setCurrentUser] = useState(null) // Initialize state as null
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true) // Add loading state
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const getData = async () => {
            setLoading(true); // Set loading to true when fetching starts
            try {
                let u = await fetchuser(username);
                setCurrentUser(u);
                let dbpayments = await fetchpayments(username);
                setPayments(dbpayments);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
            setLoading(false); // Set loading to false when fetching is done
        };
        getData();
    }, [username]);

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast('Thanks for your donation!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            // Use router.replace to remove query params from URL without reloading
            router.replace(`/${username}`);
        }
    }, [username, router, searchParams]);

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const pay = async (amount) => {
        if (!currentUser || !currentUser.razorpayid) {
            toast.error('Creator Razorpay ID is not configured.');
            return;
        }
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid,
            "amount": amount,
            "currency": "INR",
            "name": "FanFund",
            "description": "Test Transaction",
            "image": "/logo.png", // Make sure you have a logo in your public folder
            "order_id": orderId,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                "name": paymentform.name,
                "email": "supporter@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "FanFund Corporate Office"
            },
            "theme": {
                "color": "#8A2BE2" // A nice purple color
            }
        }

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }
    
    // Show a loading screen while data is being fetched
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-white text-2xl">
                Loading creator profile...
            </div>
        );
    }

    return (
        <>
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full relative'>
                <img className='object-cover w-full h-48 md:h-[350px]' src={currentUser?.coverpic || 'https://placehold.co/1200x350/1a1a1a/ffffff?text=Cover+Image'} alt="Cover Picture" />
                <div className='absolute -bottom-20 right-1/2 translate-x-1/2 border-white overflow-hidden border-2 rounded-full size-36'>
                    <img className='rounded-full object-cover size-36' width={128} height={128} src={currentUser?.profilepic || 'https://placehold.co/128x128/1a1a1a/ffffff?text=Avatar'} alt="Profile Picture" />
                </div>
            </div>
            <div className="info flex justify-center items-center my-24 mb-32 flex-col gap-2">
                <div className='font-bold text-lg'>
                    @{username}
                </div>
                <div className='text-slate-400'>
                    I am the creator of shinchan and doreamon
                </div>
                <div className='text-slate-400'>
                    {payments.length} Payments . ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>

                <div className="payment flex gap-3 w-[90%] md:w-[80%] mt-11 flex-col md:flex-row">
                    <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-6 md:p-10">
                        <h2 className='text-2xl font-bold my-5'>Top Supporters</h2>
                        <ul className='mx-5 text-lg space-y-4'>
                            {payments.length === 0 && <li>Be the first to support!</li>}
                            {payments.map((p, i) => (
                                <li key={i} className='flex gap-3 items-center'>
                                    <img width={33} src="/avatar.gif" alt="user avatar" className="rounded-full" />
                                    <span>
                                        {p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message "{p.message}"
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-6 md:p-10">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className='flex gap-2 flex-col'>
                            <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                            <input onChange={handleChange} value={paymentform.amount} name="amount" type="number" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-slate-600 disabled:from-purple-100" disabled={!paymentform.name || !paymentform.message || !paymentform.amount}>
                                Pay
                            </button>
                        </div>
                        <div className='flex flex-col md:flex-row gap-2 mt-5'>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
