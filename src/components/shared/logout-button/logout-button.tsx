import { Button } from '@/components/ui/button' 
import { CiLogout } from 'react-icons/ci'
import { ButtonProps } from '../../ui/button';

export default function LogoutButton(buttonProps: ButtonProps) {
  
  const { className, ...props } = buttonProps

  return (
    <Button {...props} variant="destructive" className={`space-x-2 transition-all duration-300 ${className}`}  >
        <CiLogout strokeWidth={2} />
        <span>
            Log out
        </span>
    </Button>
  )
}
