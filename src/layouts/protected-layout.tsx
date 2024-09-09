import Navbar from '@/components/shared/navbar/navbar'
import { userAtom } from '@/atoms/user-atom'
import { db } from '@/utils/supabase'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {  getOneByAuthID } from '@/actions/user'

const ProtectedLayout = () => {

  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
        
    (async() => { 


      try {
        const { data, error } = await db.auth.getSession()

        if(error){
            console.log(error)
        } 

        console.log(error)

        if(data && data.session === null) {  
            return navigate('/login')
        } 


        const userData = await getOneByAuthID(data.session?.user.id)    


        if(userData === null) {
          await db.auth.signOut()
          navigate("/")
          return
        } 

        setUser(userData)
         
      } catch (error) {
        console.log(error)
      }

       

    })()

  }, [])

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default ProtectedLayout
