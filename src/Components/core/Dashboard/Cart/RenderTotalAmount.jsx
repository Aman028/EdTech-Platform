import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../Common/IconBtn";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
import { loadStripe } from "@stripe/stripe-js";

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = async () => {
    const courses = cart.map((course) => course._id);

    const stripe = await loadStripe(
      "pk_test_51PjmIaJSRpFRPQuFlDHIhb59TMpfCUpmIalssUsaD5dRdwmMF8VZ6UCCZliuQNU2DWcfUTqoKFuhtkOWDBZ49cyM00U43CAOpB"
     
    );
    const body = {
      products: cart,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:4000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };
  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  );
};

export default RenderTotalAmount;
