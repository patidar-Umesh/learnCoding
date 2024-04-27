import Razorpay from 'razorpay'


// setup razorpay 

export const instance = new Razorpay({
    key_id: `${process.env.RAZORPAY_KEY_ID}`,
    key_secret: `${process.env.RAZORPAY_KEY_SECRET}`
})