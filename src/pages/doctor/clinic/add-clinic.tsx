import { db } from '@/utils/supabase'
import { v4 as uuid } from 'uuid'
import React, { useState } from 'react'
import Dropzone from "react-dropzone"
import { ImSpinner2 } from 'react-icons/im'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter your clinic name!"}),
  email: z.string().email({message: "Please enter a valid email address!"}).optional(), 
  contact: 
    z.string()
        .min(11, {message: "Please enter a valid phone number"})
        .max(11, {message: "Please enter a valid phone number"})
        .refine(val => (val[0] === "0" && val[1] === "9"), {message: "Please enter a valid phone number."}),
  contact2: 
    z.string()
        .min(11, {message: "Please enter a valid phone number"})
        .max(11, {message: "Please enter a valid phone number"})
        .refine(val => (val[0] === "0" && val[1] === "9"), {message: "Please enter a valid phone number."}).optional(),
  address: z.string().min(1, { message: "Please enter your clinic address!"}),
  website: z.string().url({ message: "Please enter a valid url"}).optional(),
  description: z.string().optional(),
})

export default function AddClinic() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      contact2: "",
      address: '',
      website: "",
      description: ""
    }
  })

  const [uploading, setUploading] = useState(false)
  const [placeholder, setPlaceholder] = React.useState('')

  const handleDropImage = async(e) => {
    try {
      setUploading(true) 
      const name = `${e[0].name}-${uuid()}`;

      const { data  } = await db
        .storage
        .from("profiles")
        .upload(name, e[0], {
          cacheControl: '3600',
          upsert: false
      }); 

      if(data === null) {
        setUploading(false)
        return console.log("No data")
      }

      const response = await db.storage.from("profiles").getPublicUrl(data.path)
  
      if(response.data.publicUrl === null) { 
        setUploading(false)
        return console.log("No data")  
      }
      
      setPlaceholder(response.data.publicUrl)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setPlaceholder('')
      setUploading(false)
      
    }
  }

  return (
    <div className='py-10 '>
      <Form {...form}> 
        <form className='space-y-8'> 
          <div className='flex space-x-20 items-center'>
          
            <Dropzone onDrop={handleDropImage}>
              {({getRootProps, getInputProps}) => (
                <div className='shadow-md rounded-full min-h-[300px] max-h-[300px] min-w-[300px] hover:cursor-pointer overflow-hidden relative hover:shadow-xl transition-all duration-300 group' {...getRootProps()}>
                  <input {...getInputProps()} disabled={uploading} />
                  <div className={`absolute  w-full h-full items-center justify-center backdrop-blur-sm flex-wrap bg-black  z-50 bg-opacity-20 hover:opacity-100 ${uploading ? 'opacity-100 cursor-wait' : 'opacity-0'} flex transition-all duration-300`}>  
                    {uploading ?
                      <ImSpinner2 className='animate-spin' size={30} />
                      :
                      <p className='transition-all duration-300 text-white font-bold'>{placeholder ? "Replace Image" : "Upload Image"}</p>
                    }
                  </div>
                  <img src={placeholder ? placeholder : "https://www.wibits.com/wp-content/themes/wibits-theme/images/sample.jpg"} className='absolute h-full z-10 object-cover transition-all duration-300' />
                </div>
              )}
            </Dropzone>  
            <div className='w-full flex flex-col justify-center space-y-3'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clinic Name</FormLabel>
                    <FormControl>
                      <Input className='text-lg py-5 px-3' placeholder="Enter you clinic name" {...field} />
                    </FormControl> 
                    <FormMessage />
                  </FormItem>
                )}
              /> 
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clinic Address</FormLabel>
                    <FormControl>
                      <Input className='text-lg py-5 px-3' placeholder="Enter your clinic address" {...field} />
                    </FormControl> 
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="number" className='text-lg py-5 px-3' placeholder="Enter your clinic email address" {...field} />
                    </FormControl> 
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-3">
          
            <FormField
              control={form.control}
              name="contact2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input className='text-lg py-5 px-3' placeholder="Enter you clinic name" {...field} />
                  </FormControl> 
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input className='text-lg py-5 px-3' placeholder="Enter you clinic name" {...field} />
                  </FormControl> 
                  <FormMessage />
                </FormItem>
              )}
            />

            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea  className='text-lg py-3 px-3' placeholder="Clinic Description...." {...field} />
                  </FormControl> 
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
