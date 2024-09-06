import { Input, InputProps } from '@/components/ui/input' 
import { ComponentProps, ReactElement } from 'react'  


type Props = {
    className: string
    containerProps?: ComponentProps<"div">
    inputProps?: InputProps,
    startIcon?: ReactElement,
    endIcon?: ReactElement
}

export default function InputWithIcon({className, containerProps, startIcon, endIcon, inputProps}: Props) {
  return (
    <div {...containerProps} className={`flex items-center border-5 relative border-none shadow-md ${startIcon && 'pl-5 space-x-1'} ${endIcon && 'pr-5 space-x-1'} py-2 ${className}`}>
        {startIcon && startIcon}
        <Input {...inputProps} className={`placeholder:text-gray-500  border-none text-xl shadow-none bg-none `} />
        {endIcon && endIcon}
    </div>
  )
}
