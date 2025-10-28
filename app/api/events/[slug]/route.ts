import EventModel from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type RouteParamas = {
    params: Promise<{
        slug: string
    }>;
};


export async function GET(
    req: NextRequest, 
    {params}: RouteParamas
){
    try {
        
        await connectDB();

        const {slug} = await params;

        if(!slug || typeof slug !== 'string' || slug.trim() === ''){
            return NextResponse.json({
                message: "Invalid or missing slug parameter",
            },{status: 400})
        }

        const sanitizingSlug = slug.toLowerCase();

        const event = await EventModel.findOne({slug: sanitizingSlug}).lean();

        if(!event){
            return NextResponse.json({
                meassage: `Event with slug ${sanitizingSlug} is not found`
            },{status: 400})
        }

        return NextResponse.json({
            message: "Event fetched successfully",
            event
        },{status: 200})

    } catch (e) {

        if(process.env.NODE_ENV === 'development'){
            console.error("Erroe fetching event by slug: ", e)
        }

        if(e instanceof Error){
            if(e.message.includes("MONGODB_URI")){
                return NextResponse.json({
                    message: "Database configuration error"
                },{status: 500})
            }
        }

        return NextResponse.json({
            message: "Failed to fetch event",
            error: e instanceof Error ? e.message : "Unknown"
        })
    }
}