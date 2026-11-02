
import { BookingDelete } from "@/components/BookingDelete";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Image from "next/image";
import {
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiMapPin,
  FiEye,
} from "react-icons/fi";


export default async function MyBookings() {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  });
  const user = session?.user;
  const { token } = await auth.api.getToken({
    headers: await headers()
  })
  const res = await fetch(`http://localhost:8000/bookings/${user?.id}`, {
    headers: {
      authorization:`Bearer ${token}`
    }
  });
  const bookings = await res.json();
  console.log(bookings);





  console.log(user)
  return (
    <div>
      {
        bookings.map((booking) => <div key={booking._id}>
             <div className="flex flex-col gap-5 border-b border-gray-200 p-4 shadow-sm sm:flex-row container mx-auto">
      {/* Image */}
      <div className="relative h-44 w-full shrink-0 sm:h-40 sm:w-72">
        <Image
          src={booking.imageUrl}
          alt={booking.title || "Booking"}
          fill
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="space-y-2">
         

          <h2 className="text-2xl font-semibold text-gray-900">
            {booking.destinationName}
          </h2>

          <p className="flex items-center gap-2 text-sm text-gray-500">
            <FiCalendar />
            Departure:{" "}
            {booking.departureDate
              ? new Date(booking.departureDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A"}
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-500">
            <FiMapPin />
            Booking ID: {booking._id}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <p className="text-2xl font-semibold text-[#1a9fc0]">
            ${booking.price}
          </p>

                <BookingDelete bookingId={booking._id}></BookingDelete>
        </div>
      </div>
    </div>
          
        </div>)
        
      }
    </div>
  )
}
