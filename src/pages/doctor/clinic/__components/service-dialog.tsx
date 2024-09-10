import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { useForm } from "react-hook-form"


import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent, 
    DialogHeader,
    DialogTitle, 
    DialogOverlay, 
} from "@/components/ui/dialog"
import { z } from "zod"; 
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"; 
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select" 

import { ImSpinner9 } from "react-icons/im";

  
import { serviceDataAtom, servicesAtom } from "@/atoms/service-atom"; 
import { serviceDialogAtom } from "@/atoms/dialogs-atom"
import { loadableCategoriesAtom } from "@/atoms/category-atom";
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ERR_INTERNAL } from '@/constants/errors';
import { create } from '@/actions/service';
import { userAtom } from '@/atoms/user-atom'; 
  


const serviceSchema = z.object({
    img: z.string().optional(),
    name: z.string().min(3, {message: "Name must be at least 3 characters long"}),
    description: z.string().optional(),
    categoryId: z.string().min(1, {message: "Category is required"}),
    rate: z.string().optional(),
    active: z.boolean().default(true)
})

const initialValues = {
    active: true,
    categoryId: "",
    description: "",
    img: "",
    name: "",
    rate: ""
}
 
const ServiceDialog = () => {
     
    const [values, setValues] = useAtom(serviceDataAtom);
    const [dialogAtom, setDialogAtom] = useAtom(serviceDialogAtom)  
    const categories = useAtomValue(loadableCategoriesAtom);
    const [loading, setLoading] = useState(false);
    const setServices = useSetAtom(servicesAtom);
    const user = useAtomValue(userAtom)
    const { toast } = useToast();
 
    const form = useForm<z.infer<typeof serviceSchema>>({
        resolver: zodResolver(serviceSchema),
        defaultValues: values ? { ...values, categoryId: String(values.categoryId) } : initialValues,
        mode: "all",
        values: values ? { ...values, categoryId: String(values.categoryId) } : initialValues
    })
 
    if(categories.state === 'hasError') return <h1>Error: {JSON.stringify(categories.error)}</h1>
    
    const viewMode = dialogAtom.mode === "view"
    const createMode = dialogAtom.mode === "create"
    const editMode = dialogAtom.mode === "edit"
      
 
    const onSubmit = async(v: z.infer<typeof serviceSchema>) => {
    
        try {
            setLoading(true)
            if(viewMode) {
                setDialogAtom((p) => ({...p, mode: "edit"}))
                return setLoading(false)
            }else if(createMode) {
                const newService = await create({
                    ...v,
                    categoryId: Number(v.categoryId),
                    clinicId: Number(user?.clinicId),
                    rate: v.rate ?? '',
                    img: v.img ?? '' 
                })  
                setServices(p => p.concat(newService))
                toast({
                    title: "Service created successfully",
                    description: "Service has been created successfully",
                    variant: "default",
                    className: "bg-emerald-600 text-white",
                    duration: 5000
                })
                form.reset(); 
                setDialogAtom({open: false})
                return setLoading(false)
            }else if(editMode) {
                // 
                return setLoading(false)
            }else {
                // 
                return setLoading(false)
            } 
 
        } catch (error) {
            setLoading(false)
            if(error instanceof Error) {
                toast({
                    title: "Error in creating service",
                    description: error.message,
                    variant: "destructive"
                })
            }
            toast({
                title: "Internal Error",
                description: ERR_INTERNAL,
                variant: "destructive"
            }) 
        } 
    }
    
 
    return (
        <Dialog modal open={dialogAtom.open}> 
            <DialogOverlay className=" backdrop-blur-lg"/> 
            <DialogContent removeCloseIcon className="">
                <DialogHeader> 
                    <DialogTitle className="mb-">Service</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem > 
                                    <FormLabel>Category</FormLabel> 
                                    {
                                        categories.state === "loading" ? <h1>Loading...</h1> : 
                                        <FormControl className="">
                                            <Select  
                                                disabled={loading || viewMode}
                                                onValueChange={(val) => {
                                                    form.setValue("categoryId", val) 
                                                    form.clearErrors("categoryId")
                                                }}  
                                                value={field?.value}
                                            >
                                                <SelectTrigger   className='disabled:bg-white disabled:border-gray-900 disabled:cursor-text'>
                                                    <SelectValue placeholder="Select a Category" className="min-w-full first-letter:uppercase" />
                                                </SelectTrigger>
                                                <SelectContent className="min-w-full w-full " > 
                                                    {categories.data.map(category => (
                                                        <SelectItem value={category.id.toString()} key={category.id} className="min-w-[120%] ">
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl> 
                                    }
                                    <div className="flex justify-end"> 
                                        <FormMessage  />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field  }) => (
                                <FormItem > 
                                    <FormLabel>Name</FormLabel> 
                                    <FormControl>
                                        <Input 
                                            autoComplete="off"
                                            autoFocus={false}  
                                            readOnly={ loading || viewMode} 
                                            className="first-letter:uppercase"
                                            placeholder="Name" 
                                            {...field} 
                                        />
                                    </FormControl>  
                                    <div className="flex justify-end"> 
                                        <FormMessage  />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field  }) => (
                                <FormItem > 
                                    <FormLabel>Description</FormLabel> 
                                    <FormControl>
                                        <Input   
                                            autoFocus={false}
                                            autoComplete="off" 
                                            className="first-letter:uppercase"
                                            readOnly={ loading || viewMode} 
                                            placeholder="Description..." 
                                            multiple
                                            {...field} 
                                        />
                                    </FormControl> 
                                    <div className="flex justify-end"> 
                                        <FormMessage  />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="active"
                            render={({ field}) => (
                                <FormItem > 
                                    <FormControl className="">
                                        <div className="flex items-center py-2 space-x-3" > 
                                            <FormLabel>Active</FormLabel>
                                            <Switch 
                                                disabled={loading || viewMode}
                                                value={field.value ? 1 : 0}
                                                onCheckedChange={(v) => {
                                                    form.setValue("active", Boolean(v))
                                                    form.clearErrors("active")
                                                }}                                                    
                                                onBlur={field.onBlur}
                                                className="scale-100 active:scale-100 hover:right-1 "
                                            />
                                        </div>
                                    </FormControl> 
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name=""
                            render={({ field}) => (
                                <FormItem > 
                                    <FormControl>
                                        <Input 
                                            readOnly={ loading || dialogAtom.mode === "view"} 
                                            placeholder="Name" 
                                            {...field} 
                                        />
                                    </FormControl> 
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <div className="flex justify-end gap-x-4">
                            <Button 
                                type="button"
                                disabled={loading}
                                variant="destructive" 
                                className="btn-scale transition-1"
                                onClick={() => {
                                    if(editMode) return setDialogAtom(p => ({...p, mode: "view"}))
                                    form.reset()
                                    setValues(null);
                                    setDialogAtom({open: false})
                                }}
                            >
                                {editMode ? "Cancel" : "Close"}
                            </Button>
                            <Button 
                                type='submit'  
                            > 
                                {loading && 
                                    <ImSpinner9 className='animate-spin ' />
                                }
                                {loading ? "Loading..." : viewMode ? "Edit" : createMode ? "Create" : editMode ? "Update" : "Delete"}
                            </Button>
                        </div>
                    </form>
                </Form>  
            </DialogContent>
        </Dialog>
    
    )
}

export default ServiceDialog
