"use client"
import { createBookings } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import { useState } from "react"

const BookEvent = ({eventId, slug}: {eventId: string, slug: string}) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault();
        const {success} = await createBookings({eventId, slug, email});
        if(success){
            setIsSubmitted(true);
            posthog.capture('event_booked', {eventId: eventId, slug: slug, email: email});
        }else{
            console.error("Booking creation failed");
            posthog.captureException("Booking creation failed");
        }
    }
    
  return (
    <div id="book-event">
        {isSubmitted ? (
            <p className="text-sm">Thankyou for sign-in up</p>
        ): (
            <form onSubmit={handleSubmit}>
                <div className="">
                    <label htmlFor="emial">Email Address</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        placeholder="Enter your email address"
                    />
                </div>
                <button type="submit" className="button-submit">Submit</button>
            </form>
        )}
    </div>
  )
}

export default BookEvent;