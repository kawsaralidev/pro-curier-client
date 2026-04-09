import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import UseTrackingLogger from "../../../hooks/useTrackingLogger";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = UseAuth();
  const { parcelId } = useParams();
  console.log(parcelId);
  const axiosSecure = UseAxiosSecure();
  const { logTracking } = UseTrackingLogger();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
    enabled: !!parcelId, // extra safety
  });

  console.log(parcelInfo);
  if (isPending) {
    return "....loading";
  }
  const amount = parcelInfo?.cost;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!elements || !stripe) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    //step-1 validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);
      //step-2 create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      // step-3 confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded");
          const transactionId = result.paymentIntent.id;
          //step-4 mark parcel paid also
          const paymentData = {
            parcelId,
            email: user.email,
            amount,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
          };
          const paymentResponse = await axiosSecure.post(
            "/payments",
            paymentData,
          );
          if (paymentResponse.data.insertedId) {
            Swal.fire({
              title: "Payment Successful ",
              html: `
    <p><strong>Transaction ID:</strong> ${transactionId}</p>
    <p>Redirecting to My Parcels...</p>
  `,
              icon: "success",
              timer: 2500,
              showConfirmButton: false,
            }).then(async () => {
              await logTracking({
                tracking_id: parcelInfo.tracking_id,
                status: "payment_done",
                details: `Paid by ${user.displayName}`,
                updated_by: user.email,
              });

              navigate("/dashboard/myParcels");
            });
          }
        }
      }
      console.log("res form intent", res);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="card space-y-4 p-6 bg-white shadow-md max-w-md mx-auto"
      >
        <CardElement className="p-2 border text-amber-500 rounded"></CardElement>
        <button
          type="submit"
          className="btn btn-error mt-4 w-full"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
