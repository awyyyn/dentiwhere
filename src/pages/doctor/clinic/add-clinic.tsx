import { db } from '@/utils/supabase'
import { v4 as uuid } from 'uuid'
import React, { useState } from 'react'
import Dropzone from "react-dropzone"
import { ImSpinner2 } from 'react-icons/im'

export default function AddClinic() {

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
    <div className='py-10'>
        <Dropzone onDrop={handleDropImage}>
          {({getRootProps, getInputProps}) => (
            <div className='shadow-md rounded-full h-[300px] w-[300px] hover:cursor-pointer overflow-hidden relative hover:shadow-xl transition-all duration-300 group' {...getRootProps()}>
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
    </div>
  )
}
