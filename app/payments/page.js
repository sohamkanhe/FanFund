import { authOptions } from "@/auth.config";
import { fetchAllPayments } from "@/actions/useractions"; // Using the new function
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'

const Payments = async () => {
  const session = await getServerSession(authOptions);

  // If there's no session, redirect to the login page
  if (!session) {
    redirect('/login');
  }

  // Fetch all payments for the logged-in user
  const payments = await fetchAllPayments(session.user.username);

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Payments</h1>
      
      <div className="bg-white/5 border border-white/10 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-white/10">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                From
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Message
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {payments.map((p) => (
              <tr key={p._id}>
                <td className="px-6 py-4 whitespace-nowrap">{p.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{p.message}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap font-bold">₹{p.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && (
          <div className="p-6 text-center text-gray-400">
            You haven't received any payments yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;

export const metadata = {
    title: "Your Payments - FanFund",
};
