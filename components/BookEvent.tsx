"use client"
import { useState } from "react"

const BookEvent = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

        setTimeout(()=>{
            setIsSubmitted(true)
        },1000)
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

export default BookEvent