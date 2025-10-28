import {v2 as cloudinary} from 'cloudinary';
import { EventModel } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {

        await connectDB();

        const fromData = await req.formData();
        
        let event;

        try {
            event = Object.fromEntries(fromData.entries())
        } catch (error) {
            return NextResponse.json(
                {
                    message: "Invalid JSON data format", 
                },
                {
                    status: 400
                }
            )
        }

        const file = fromData.get('image') as File;

        if(!file){
            return NextResponse.json(
                {
                    message: "Event Image is required"
                },
                {
                    status: 400
                }
            )
        }

        let tags = JSON.parse(fromData.get('tags') as string);
        let agenda = JSON.parse(fromData.get('agenda') as string);

        const arrayBuffer = await file.arrayBuffer();

        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'event'}, (error, result)=>{
                if(error) return reject(error);
                resolve(result);
            }).end(buffer);
        })

        event.image = (uploadResult as {secure_url: string}).secure_url;

        const createdEvent = await EventModel.create({...event, tags: tags, agenda: agenda});

        return NextResponse.json(
            {
                message: "Event created successfully",
                event: createdEvent,
            },
            {
                status: 201,
            }
        )
        
    } catch (e) {
        console.log("Something went wrong: " + e);
        return NextResponse.json(
            {
                message: "Event creation failed", 
                error: e instanceof Error ? e.message : "Unknown",
            },
            {
                status: 500
            }
        );
    }
}

export async function GET(){
    try {

        await connectDB();

        const events = await EventModel.find().sort({createdAt: - 1});
        
        return NextResponse.json({
            message: "Events fetched successfullt",
            events
        },{status: 200}) 
        
    } catch (e) {
        return NextResponse.json({
            message: "Failed to get events",
            error: e instanceof Error ? e.message : "Unknown"
        }, {status: 500})
    }
}

