import { conditions } from "@/constants/conditions";

interface CardProps {
  imageOnly?: boolean;
  card: typeof conditions[0]
}

export default function Card({ card, imageOnly }: CardProps) {
  const { title, img, } = card;

  return ( 
      <div className=" w-full md:max-w-[285px] lg:min-w-[400px] xl:min-w-[400px]">  
        <img src={img} alt={title} className="object-fill w-full shadow-2xl rounded-2xl"  /> 
        <h2 className={`text-center sm:text-[23px] font-bold tracking-wider text-wrap min-w-fit ${imageOnly && 'hidden'}`}>
          {title}
        </h2>
      </div>  
  )
}


     
{/* <div className="relative w-full  md:w-[285px] md:h-[238px] lg:h-[338px]  lg:w-[485px] border-black border-2  ">
  <img src={img} alt={title} className="absolute object-center" />
</div> */}
// <div className="relative flex flex-col border-orange-800 border-4" >
//   <div className="relative w-full  md:w-[285px] md:h-[238px] lg:h-[338px]  lg:w-[485px] border-black border-2  ">
//     <img src={img} alt={title} className="absolute" />
//   </div>
//   <h2 className=" text-center sm:text-[23px] font-bold tracking-wider">{title}</h2>
// </div>