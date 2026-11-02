import Image from "next/image";
import Link from "next/link";
import { CiCalendarDate } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { RxArrowTopRight } from "react-icons/rx";

export default function Destination({ destination }) {
  const {
    _id,
    country,
    imageUrl,
    destinationName,
    price ,
    rating ,
    days ,
    nights,
    duraion
  } = destination;

  return (
    <div  className="shadow-2xl rounded-2xl ">
      <div className="">
        <Image className="rounded-t-2xl" src={imageUrl} alt={destinationName} height={200} width={400}></Image>
      </div>
      <div className="p-2">
           <p className="flex gap-2 items-center mt-2"> <FaLocationDot></FaLocationDot> {country}</p>
      <div className="flex justify-between">
        <h5 className="font-bold text-md">{destinationName}</h5>
        <h5 className="font-bold text-md">${ price}/Person</h5>
      </div>
        <p><CiCalendarDate></CiCalendarDate>{duraion} </p>
        
     <Link href={`/allDestinations/${_id}`} className=" btn-link flex items-center"> Book Now <RxArrowTopRight></RxArrowTopRight> </Link>
      
      </div>
      
       
   </div>
  );
}