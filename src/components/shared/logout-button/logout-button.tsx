import { Button } from '@/components/ui/button' 
import { CiLogout } from 'react-icons/ci'
import { ButtonProps } from '../../ui/button';

export default function LogoutButton(buttonProps: ButtonProps) {
  
  const { className, ...props } = buttonProps

  return (
    <Button 
      {...props} 
      size={"icon"} 
      variant="destructive" 
      className={`space-x-2 transition-all min-w-max hover:scale-110 active:scale-95 z-20 p-3 rounded-full  w-full duration-300 ${className}`}  
    >
        <CiLogout strokeWidth={2} className='mx-auto' />
        {/* <span>
            Log out
        </span> */}
    </Button>
  )
}
