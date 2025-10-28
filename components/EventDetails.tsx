import { IEvent } from "@/database";
import { getSimilarEventBySlug } from "@/lib/actions/event.actions";
import { Calendar, Clock, MapPin, UsersIcon } from "lucide-react"
import { cacheLife } from "next/cache";
import Image from "next/image"
import { notFound } from "next/navigation";
import BookEvent from "./BookEvent";
import EventCard from "./EventCard";



const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const EventAgenda = ({agendaItems}: {agendaItems: string[]}) =>(
  <div className="agenda">
    <h3>Agenda</h3>
    <ul className="ml-3">
      {agendaItems.map((item) =>(
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
)

const EventTags = ({tags}: {tags: string[]}) =>(
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) =>(
      <div className="pill" key={tag}>{tag}</div>
    ))}
  </div>
)


const EventDetails = async({ params }: { params: string }) => {
    'use cache'

    cacheLife('hours');

    const slug = params;

    let event;

    try {
        const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
            next: {revalidate: 60}
        })

        if(!request.ok){
            if(request.statusText === '404'){
                return notFound();
            }
            throw new Error(`Failed to fetch event: ${request.statusText}`)
        }

        const response = await request.json()

        event = response[0]; // API returns array of events
        
    } catch (error) {
        console.error("Error fetching event: ", error);
        return notFound();
    }

    if(!event){
        return notFound()
    }

    const {description, title, overview, date, time, venue, location, audience, agenda, mode, organizer, tags, image, _id} = event;

    const similarEvents: IEvent[] = await getSimilarEventBySlug(slug);
    const bookings = 10;
  return (
    <section id="event">
      <div className="details">
        <div className="content">
          <h1>{title}</h1>
          <p className="mt-2">{description}</p>
          {/* <div className="banner"> */}
            <Image src={image} alt={title} width={600} height={200} className="banner"/>

            <div className="flex flex-col gap-10">
            <div className="mt-5 flex flex-col gap-6" id="overview">
              <h3>Overview</h3>
              <p>{overview}</p>
            </div>

            <div className="mt-5 flex flex-col gap-6" id="eventDetails">
              <h3>Event Details</h3>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 text-gray-400">
                  <Calendar size={24}/>
                  Date: {date}
                </div>
                <div className="flex gap-3 text-gray-400">
                  <Clock size={24}/>
                  Time: {time}
                </div>
                <div className="flex gap-3 text-gray-400">
                  <MapPin size={24}/>
                  Venue: {`${venue} ${location}`}
                </div>
                <div className="flex gap-3 text-gray-400">
                  <Calendar size={24}/>
                  Mode: {mode}
                </div>
                <div className="flex gap-3 text-gray-400">
                  <UsersIcon size={24}/>
                  Auidience: {audience}
                </div>
              </div>
            </div>

            <EventAgenda agendaItems={agenda}/>
            <section className="flex-col gap-2">
              <h3>About the organizer</h3>
              {organizer}
            </section>
            <EventTags tags={tags}/>
            </div>
          {/* </div> */}
        </div>
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already book their spot
              </p>
            ): (
              <p className="text-sm">Be the first to book your spot</p>
            )}

            <BookEvent eventId={_id} slug={slug}/>
          </div>
        </aside>
      </div>

      {similarEvents.length > 0 && (
        <div className="flex w-full flex-col gap-4 pt-20">
          <h2>Similar Events</h2>
          <div className="events">
            {similarEvents.length > 0 && similarEvents.map((similarEvent:IEvent) => (
              <EventCard key={similarEvent.id} {...similarEvent}/>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default EventDetails