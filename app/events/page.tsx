import EventCard from '@/components/EventCard'
import { IEvent } from '@/database/event.model';
import { cacheLife, cacheTag } from 'next/cache';
import { events } from '@/lib/constants'


// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const Page = async() => {

//   'use cache'

//   cacheLife('hours');
//   cacheTag('featured-events');
//   const response  = await fetch(`${BASE_URL}/api/events`);
//   const {events} = await response.json();

  return (
    <section>
      <div className="mt-20 space-y-7">
        <h1>All Events</h1>
        
        <ul className="events">
          {events && events.length > 0 && events.map((e) =>(
            <EventCard key={e.title} {...e} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page