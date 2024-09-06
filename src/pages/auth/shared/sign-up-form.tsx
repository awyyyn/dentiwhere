import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button' 
import GoogleButton from '@/components/shared/google-button/google_button' 
import LoginButton from '@/components/shared/fb-button/facebook_button';
import { Link } from 'react-router-dom'
import { signUpWithProvider } from '@/actions/auth/sign-in-with-provider'
import { signUp } from '@/actions/auth/sign-up'
import { Role } from '@/types'

const formSchema = z.object({
    username: z.string().min(4, {
        message: "Username or email must be at least 4 characters long"
    }),
    fullName: z.string().min(4, { message: "Please enter your full name" }),
    email: z.string().email({message: "Please enter a valid email address"}),
    phone: 
        z.string()
            .min(11, {message: "Please enter a valid phone number"})
            .max(11, {message: "Please enter a valid phone number"})
            .refine(val => (val[0] === "0" && val[1] === "9"), {message: "Please enter a valid phone number."}),
    password: 
        z.string()
            .min(6, { message: "Password must be at least 6 characters long" })
})

export default function SignUpForm () {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            email: '',
            username: "",
            phone: "",
            password: "",
        }
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {

        const { user, session } = await signUp({...values, role: Role.user});

        console.log(user, session)
        
    }

    return (
        <> 
            <div className='flex md:flex-row flex-col flex-wrap space-y-4 md:space-y-0 md:justify-between'>
                <GoogleButton 
                    handleClick={() => signUpWithProvider("google")} 
                    signUp 
                    className="bg-[#D9D9D9] hover:bg-[#D9D9D9] text-gray-600 rounded-md" 
                />
                <LoginButton 
                    handleClick={() => signUpWithProvider("facebook")} 
                    signUp 
                    className="bg-[#D9D9D9] hover:bg-[#D9D9D9] text-gray-600 rounded-md" 
                />
            </div>
            <div className='flex flex-row items-center space-x-2 justify-center'>
                <div className='border-b-2 w-3 border-gray-700' />
                <p className='uppercase text-gray-700 text-sm'>OR</p>
                <div className='border-b-2 w-3 border-gray-700' />
            </div>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-10">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => ( 
                            <FormItem> 
                                <FormControl>
                                    <Input className='lg:px-2 lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] ' placeholder="Full Name" {...field} />
                                </FormControl> 
                                <FormMessage className='text-red-600 font-semibold'  />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => ( 
                            <FormItem> 
                                <FormControl>
                                    <Input className='lg:px-2 lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] ' placeholder="Username" {...field} />
                                </FormControl> 
                                <FormMessage className='text-red-600 font-semibold'  />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (  
                            <FormItem > 
                                <FormControl >
                                    <Input className='lg:px-2 lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] ' placeholder="Email Address" {...field} />
                                </FormControl> 
                                <FormMessage className='text-red-600 font-semibold'  />
                            </FormItem> 
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (  
                            <FormItem > 
                                <FormControl >
                                    <Input className='lg:px-2 lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] ' placeholder="Phone Number" {...field} />
                                </FormControl> 
                                <FormMessage className='text-red-600 font-semibold'  />
                            </FormItem> 
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (  
                            <FormItem> 
                                <FormControl>
                                   <Input className='lg:px-2 lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] ' placeholder="Password" {...field}  />
                                </FormControl> 
                                <FormMessage className='text-red-600 font-semibold'    />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="rounded-lg w-full hover:bg-[#00000080] bg-[#00000080] text-white">Login</Button>
                    
                    <div className="flex flex-row space-x-1 justify-center mt-5">
                        <p>I have an account?</p>
                        <Link to={"/login"} className='font-bold'>Sign in</Link>
                    </div>
                </form>
            </Form>
        </>
    )
}