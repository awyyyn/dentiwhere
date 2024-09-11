import { Button } from '@/components/ui/button' 
import { Link } from 'react-router-dom'
import LogoutButton from '../logout-button/logout-button' 

export default function Navbar() {
 
    
    const adminLinks = [
        {
            path:  "clinic"  
        },
        {
            path: "profile"
        }
    ]

    return (
        <header className='w-screen fixed top-0 left-0 z-50 bg-white shadow-md'>
            <nav>
                <div className=' py-3 w-11/12 md:w-9/12 mx-auto flex flex-row justify-between'>

                    <Link to="/">
                        <h1 className='font-bold tracking-wider text-xl md:text-xl'>Dentiwhere</h1>
                    </Link>

                    <div className='space-x-5 flex flex-row items-center'>
                        <Link to="/">
                            <Button variant="link" className='transition-all duration-300'>
                                Home
                            </Button>
                        </Link>
                        {adminLinks.map((link, indx) => (
                            <Link 
                                key={`${link}-${indx}`} 
                                to={link.path} 
                            >
                                <Button className='capitalize transition-all duration-300' variant="link">
                                    {link.path}
                                </Button>
                            </Link>
                        ))}
                        <LogoutButton />
                    </div>
                </div>
            </nav>
        </header>
    )
}
