import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";

interface Props {
    signUp?: boolean
    className?: string
    handleClick: () => void
}

export default function GoogleButton({ signUp = false, className, handleClick}: Props) {
    return (
        <Button  size={"lg"} className={className} onClick={handleClick}> 
            <FaGoogle className="mr-2 h-4 w-4 stroke-gray-600" /> 
            <span className="block md:hidden lg:block">
                {signUp ? "Sign up" : "Login"} with Google
            </span>
        </Button>
    )
}