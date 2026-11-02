
import { Suspense } from "react";
import Destination from "@/components/Destination";

async function  DestinationList() {
  const res = await fetch("http://localhost:8000/destination");
  const destinations = await res.json();

  return (
    <div className="grid grid-cols-4  mx-auto gap-6 container">
      {destinations.map((destination) => (
        <Destination key={destination._id} destination={destination} />
      ))}
    </div>
  );
}

export default function AllDestinations() {
  return (
    <div>
      <h1>AllDestinations</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <DestinationList /> 
      </Suspense>
    </div>
  );
}