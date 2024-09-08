import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";



export default function NotFound() {

    return (
        <div className="min-h-dvh grid place-content-center">
            <div className="space-y-5 flex items-center flex-col">
                <h1 className="text-3xl md:text-7xl font-bold tracking-wide">Oooops!</h1>
                <h2 className="text-lg tracking-wide">
                    The page you&apos;re looking for doesn&apos;t exist.
                </h2>
                <hr className="w-[80%] " />
                <Link to={'/'} replace>
                    <Button className="bg-1 transition-all hover:bg-1 hover:shadow-lg text-white px-20 font-bold">
                        Home
                    </Button>
                </Link>
            </div>
        </div>
  )
}
