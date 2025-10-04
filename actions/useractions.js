"use server"
import connectDb from "@/db/connectDb"
import User from "@/models/User"
import Payment from "@/models/Payment"
import Razorpay from "razorpay"

// This function fetches a single user by username
export const fetchuser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

// This function fetches all users from the database
export const fetchAllUsers = async () => {
    await connectDb();
    const users = await User.find({}, { email: 0, razorpayid: 0, razorpaysecret: 0, createdAt: 0, updatedAt: 0 }); // Exclude sensitive fields
    return users.map(user => user.toObject({ flattenObjectIds: true }));
}

// This function searches for users based on a query
export const searchUsers = async (query) => {
    if (!query) {
        return [];
    }
    await connectDb();
    const users = await User.find(
        {
            $or: [
                { username: { $regex: `^${query}`, $options: 'i' } }, // Case-insensitive search
                { name: { $regex: `^${query}`, $options: 'i' } }
            ]
        },
        { email: 0, razorpayid: 0, razorpaysecret: 0, createdAt: 0, updatedAt: 0 } // Exclude sensitive fields
    ).limit(10); // Limit to 10 results for performance
    return users.map(user => user.toObject({ flattenObjectIds: true }));
};


// This function fetches only the top 10 payments for the public page
export const fetchpayments = async (username) => {
    await connectDb()
    // Find top 10 payments sorted by decreasing order of amount
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean()
    return p
}

// NEW FUNCTION: This fetches ALL payments for the private payments page
export const fetchAllPayments = async (username) => {
    await connectDb()
    // Find all payments sorted by decreasing order of amount
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
    return p
}

// This function initiates a Razorpay payment
export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()
    let user = await User.findOne({ username: to_username })
    const secret = user.razorpaysecret
    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    // Create a payment object which shows pending payment
    await Payment.create({ oid: x.id, amount: amount / 100, to_user: to_username, name: paymentform.name, message: paymentform.message })
    return x
}

// This function updates a user's profile
export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)

    // If the username is being updated, check if the new username is available
    if (ndata.username !== oldusername) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }
        await User.updateOne({ email: ndata.email }, ndata)
        // Now update all the usernames in the payments table
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })

    } else {
        await User.updateOne({ email: ndata.email }, ndata)
    }
}
