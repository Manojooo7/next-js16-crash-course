import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { events } from '@/lib/constants'
import { Events } from '@/types'

// const events:Events = [
//    {
//     slug: "react-conf-2024",
//     image: "/images/event1.png",
//     title: "React Conf 2024",
//     location: "San Francisco, CA",
//     date: "March 15, 2024",
//     time: "9:00 AM - 6:00 PM",
//   },
//   {
//     slug: "nextjs-summit",
//     image: "/images/event2.png",
//     title: "Next.js Summit",
//     location: "Austin, TX",
//     date: "April 22, 2024",
//     time: "10:00 AM - 5:00 PM",
//   },
// ]

const Page = () => {
  return (
    <section>
      <h1 className='text-center'>The Hub for Every Dev <br/> Event You Can't Miss</h1>
      <p className='text-center mt-5'>Hacakthons, Meetups and Conference, All in One Place</p>

      <ExploreBtn/>

      <div className="mt-20 space-y-7">
        <h3>Feature Events</h3>
        
        <ul className="events">
          {events.map((e, i) =>(
            <EventCard key={i} event={e} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page