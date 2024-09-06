  import { Button } from "@/components/ui/button";
import { SiFacebook } from "react-icons/si";  

interface Props {
    signUp?: boolean
    className?: string
    handleClick: () => void
}

export default function FacebookButton({ signUp = false, className, handleClick  }: Props) {
    return ( 
        <Button size="lg" className={className} onClick={handleClick} > 
            <SiFacebook className="mr-2 h-4 w-4 stroke-gray-600" /> 
            <span className="block md:hidden lg:block">
                {signUp ? "Sign up" : "Login"} with Facebook
            </span>
        </Button>
    )
}