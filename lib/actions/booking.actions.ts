"use server"

import { BookingModel } from "@/database";
import connectDB from "../mongodb";

export const createBookings = async({eventId, slug, email}: {eventId:string, slug:string, email: string}) =>{
    try {
        await connectDB();

        await BookingModel.create({eventId, slug, email});
        return {success: true}
    } catch (error) {
        console.log("Create booking failed", error);
        return {success: false}
    }
}