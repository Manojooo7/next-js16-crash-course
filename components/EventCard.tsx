import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Heart } from "lucide-react"
import { Event } from "@/types"



const EventCard = ({event}: {event: Event}) => {
  return (
    <Link href={`/events`} id="event-card">
        <div className="relative">
            <Image src={event.image} alt={event.title} width={410} height={300} className="poster"/>

            <Button size={"icon"} className="bg-gray-900/60 absolute top-2 right-2 hover:bg-gray-700">
                <Heart size={24}/>
            </Button>

        </div>

        <div className="flex flex-col gap-1">
            <p className="text-lg text-gray-300">{event.location}</p>
            <p className="title text-white">{event.title}</p>
            <div className="flex justify-between items-center">
                <p className="text-lg text-gray-300">{event.date}</p>
                <span className={`w-3px h-full bg-white`}/>
                <p className="text-lg text-gray-300">{event.time}</p>
            </div>
        </div>
    </Link>
  )
}

export default EventCard