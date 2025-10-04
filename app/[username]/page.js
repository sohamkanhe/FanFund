import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'

const UsernamePage = async ({ params }) => {
  // Directly check for the user in the database at the top level
  await connectDb();
  const user = await User.findOne({ username: params.username });

  // If no user is found, show the 404 page
  if (!user) {
    return notFound();
  }

  // Convert the Mongoose document to a plain, serializable object
  const userObj = JSON.parse(JSON.stringify(user.toObject({ flattenObjectIds: true })));

  return (
    <>
      {/* Pass the plain user object as a prop */}
      <PaymentPage username={params.username} currentUser={userObj} />
    </>
  )
}

export default UsernamePage;

// This function generates the page title
export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - FanFund`,
  }
}
