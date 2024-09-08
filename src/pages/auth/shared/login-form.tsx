
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom' 
import { login } from '@/actions/auth/auth'
import { ERR_INTERNAL } from '@/constants/errors'

const formSchema = z.object({
    email: z.string().email({
        message: "Email must be at least 4 characters long"
    }),
    licenseNumber: z.string().min(1, {message: "Required"}),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
})

export default function LoginForm () {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            licenseNumber: "",
            email: "",
            password: "",
        }
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
           await login(values) 
        } catch (error) {
            if(error instanceof Error) {
                console.error(error.message)
            }
            console.log(ERR_INTERNAL)
        }
    }

    return (
        <>  
            <div className='flex flex-row items-center space-x-2 justify-center'>
                <div className='border-b-[3px] w-3  border-gray-500' />
                <p className='uppercase text-gray-700 text-sm'>OR</p>
                <div className='border-b-[3px] w-3  border-gray-500' />
            </div>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3 lg:space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => ( 
                            <FormItem> 
                                <FormControl>
                                    <Input className='lg:px-2 border-none  lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] ' placeholder="Username or Email" {...field} />
                                </FormControl> 
                                <FormMessage className='text-red-600 font-semibold'  />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="licenseNumber"
                        render={({ field }) => (  
                            <FormItem > 
                                <FormControl >
                                    <Input className='lg:px-2 border-none  lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] ' placeholder="Phone Number" {...field} />
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
                                   <Input className='lg:px-2 border-none  lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] ' placeholder="Password" {...field}  />
                                </FormControl> 
                                <FormMessage className='text-red-600 font-semibold'  />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="rounded-lg w-full hover:bg-[#00000080] bg-[#00000080] text-white">Login</Button>
                    
                    <div className="flex flex-row space-x-1 justify-center mt-5">
                        <p>Don&apos;t have an account?</p>
                        <Link  to={"/sign-up"} className='font-bold'>Sign up</Link>
                    </div>
                </form>
            </Form>
        </>
    )
}