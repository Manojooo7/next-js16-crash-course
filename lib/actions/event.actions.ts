"use server"

import EventModel from '@/database/event.model';
import connectDB from "@/lib/mongodb";

export const getSimilarEventBySlug = async(slug: String) =>{
    try {
        await connectDB;

        const event = await EventModel.findOne({slug: slug});

        return EventModel.find({_id: {$ne: event._id}, tags: {$in : event.tags}})

    } catch (error) {
        console.log("Faild to get similar event");
        return []
    }
}