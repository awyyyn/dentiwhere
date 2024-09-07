// import QrCode from '@/assets/svgs/icons8_qr-code.svg'

import { Button } from "@/components/ui/button";

export default function QrLink() {
  return (
    <section className="gradient-qr overflow-hidden py-10 md:py-0 ">
      <div className='flex md:flex-row flex-col justify-between  mx-auto w-11/12 md:w-10/12'>
        <div className="mx-auto md:mx-0">
          <svg className="md:w-[250px] md:h-[250px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] w-[300px] h-[300px] "  viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M78.125 78.125V203.125H109.375V234.375H140.625V203.125H203.125V78.125H78.125ZM203.125 203.125V234.375H234.375V265.625H171.875V296.875H78.125V421.875H203.125V296.875H296.875V265.625H265.625V234.375H328.125V203.125H359.375V234.375H390.625V203.125H421.875V78.125H296.875V203.125H203.125ZM390.625 234.375V265.625H421.875V234.375H390.625ZM390.625 265.625H359.375V296.875H390.625V265.625ZM390.625 296.875V328.125H421.875V296.875H390.625ZM390.625 328.125H359.375V296.875H328.125V328.125H250V421.875H281.25V359.375H343.75V390.625H375V359.375H390.625V328.125ZM343.75 390.625H312.5V421.875H343.75V390.625ZM359.375 265.625V234.375H328.125V265.625H359.375ZM171.875 265.625V234.375H140.625V265.625H171.875ZM109.375 234.375H78.125V265.625H109.375V234.375ZM234.375 78.125V140.625H218.75V171.875H234.375V187.5H265.625V140.625H281.25V109.375H265.625V78.125H234.375ZM109.375 109.375H171.875V171.875H109.375V109.375ZM328.125 109.375H390.625V171.875H328.125V109.375ZM125 125V156.25H156.25V125H125ZM343.75 125V156.25H375V125H343.75ZM109.375 328.125H171.875V390.625H109.375V328.125ZM125 343.75V375H156.25V343.75H125ZM390.625 390.625V421.875H421.875V390.625H390.625Z" fill="#D3D3D3"/>
          </svg> 
        </div>
        <div className="border flex flex-col items-center sm:items-end justify-center"> 
            <h1 className="sm:text-right text-white drop-shadow-lg xl:text-[60px] text-[30px] md:text-[30px] z-30 leading-[72.61px] tracking-wide font-semibold">For a seamless experience</h1>
            <div className="z-30 flex flex-col ">
              <h1 className="text-white drop-shadow-lg xl:text-[60px] font-extrabold text-[50px] md:text-[50px] lg:text-[60px] leading-[3rem] md:leading-normal">Access us now!</h1>
              <Button className="bg-[#33DDBB] max-w-fit self-center shadow-md rounded-[50px] ">
                Share Link!
              </Button>
            </div>
        </div>
      </div>
    </section>
  )
}
// export default function QrLink() {
//   return (
//     <section className="gradient-qr overflow-hidden w-screen">
//       <div className='flex md:flex-row flex-col justify-between  mx-auto w-11/12 md:w-10/12'>
//         <div className="mx-auto md:mx-0">
//           <svg className="md:w-[250px] md:h-[250px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] w-[300px] h-[300px] "  viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M78.125 78.125V203.125H109.375V234.375H140.625V203.125H203.125V78.125H78.125ZM203.125 203.125V234.375H234.375V265.625H171.875V296.875H78.125V421.875H203.125V296.875H296.875V265.625H265.625V234.375H328.125V203.125H359.375V234.375H390.625V203.125H421.875V78.125H296.875V203.125H203.125ZM390.625 234.375V265.625H421.875V234.375H390.625ZM390.625 265.625H359.375V296.875H390.625V265.625ZM390.625 296.875V328.125H421.875V296.875H390.625ZM390.625 328.125H359.375V296.875H328.125V328.125H250V421.875H281.25V359.375H343.75V390.625H375V359.375H390.625V328.125ZM343.75 390.625H312.5V421.875H343.75V390.625ZM359.375 265.625V234.375H328.125V265.625H359.375ZM171.875 265.625V234.375H140.625V265.625H171.875ZM109.375 234.375H78.125V265.625H109.375V234.375ZM234.375 78.125V140.625H218.75V171.875H234.375V187.5H265.625V140.625H281.25V109.375H265.625V78.125H234.375ZM109.375 109.375H171.875V171.875H109.375V109.375ZM328.125 109.375H390.625V171.875H328.125V109.375ZM125 125V156.25H156.25V125H125ZM343.75 125V156.25H375V125H343.75ZM109.375 328.125H171.875V390.625H109.375V328.125ZM125 343.75V375H156.25V343.75H125ZM390.625 390.625V421.875H421.875V390.625H390.625Z" fill="#D3D3D3"/>
//           </svg> 
//         </div>
//         <div className="border flex flex-col items-center sm:items-end justify-center"> 
//             <h1 className="sm:text-right text-white drop-shadow-lg xl:text-[60px] text-[30px] md:text-[30px] z-30 leading-[72.61px] tracking-wide font-semibold">For a seamless experience</h1>
//             <div className="z-30 flex flex-col ">
//               <h1 className="text-white drop-shadow-lg xl:text-[60px] font-extrabold text-[50px] md:text-[50px] lg:text-[60px]">Access us now!</h1>
//               <Button className="bg-[#33DDBB] max-w-fit self-center shadow-md rounded-[50px] ">
//                 Share Link!
//               </Button>
//             </div>
//         </div>
//       </div>
//     </section>
//   )
// }
