import { Outlet } from 'react-router-dom'

export default function DoctorLayout() {
 

  return (
    <div className="w-11/12 md:w-9/12 mx-auto mt-14">      
      <Outlet />
    </div>
  )
}
