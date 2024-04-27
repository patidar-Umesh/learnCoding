import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector.js";
// import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../store/slices/courseSlice.js";
import { resetCart } from "../../store/slices/cartSlice.js";


const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    console.log('29 line',token, courses, userDetails);
    try{
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        console.log("script load", res);

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
        {courses},
        {
            Authorization: `Bearer ${token}`,
        })
        
        console.log("line nu 47", );
        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.data);
        }
        // console.log('key', process.env.RAZORPAY_KEY_ID );
        console.log("Order Response", orderResponse);

        //options 
        const options = {
            key: 'rzp_test_CaBrhFdCLitP6E',
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"LearnCoding",
            description: "Thank You for Purchasing the Course",
            // image:rzpLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                //send successful mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount,token );
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        //failed payment
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })

    }
    catch(error) {
        console.log("Payment Api Error....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        const res = await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
        console.log("email  res", res);

    }
    catch(error) {
        console.log("Payment success mail Error", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })
        console.log("verify payment res", response);

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, you are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("Payment verify Error....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}