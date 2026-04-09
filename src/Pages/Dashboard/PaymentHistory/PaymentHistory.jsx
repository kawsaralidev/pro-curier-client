import React from "react";
import UseAuth from "../../../hooks/useAuth";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    keepPreviousData: false,
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });
  if (isPending) {
    return "....loading";
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
      <table className="table w-full">
        {/* Table Head */}
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Parcel ID</th>
            <th>Transaction ID</th>
            <th>Amount (৳)</th>
            <th>Method</th>
            <th>Paid At</th>
            <th>Status</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {payments?.map((payment, index) => (
            <tr key={payment.transactionId}>
              <td className="text-blue-600">{index + 1}</td>

              {/* ✅ EMAIL */}
              <td className="text-sm text-gray-700">{payment.email}</td>

              <td className="font-mono text-xs text-cyan-600">
                {payment.parcel_id}
              </td>

              <td className="font-mono text-xs text-blue-600">
                {payment.transactionId}
              </td>

              <td className="font-semibold text-green-600">
                ৳{payment.amount}
              </td>

              <td className="capitalize text-lime-500">
                {payment.paymentMethod}
              </td>

              <td className="text-sm text-yellow-500">
                {new Date(payment.paid_at).toLocaleString()}
              </td>

              <td>
                <span className="badge badge-success">Paid</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {payments?.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No payment history found
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
