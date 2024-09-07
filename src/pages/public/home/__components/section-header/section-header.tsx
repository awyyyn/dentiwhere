import { Button } from '@/components/ui/button'
 

interface SectionHeaderProps {
  title: string;
  description: string;
  buttonLabel: string;
  buttonAction?: () => void
}

export default function SectionHeader({
  buttonLabel, 
  description, 
  title, 
  buttonAction = () => {}
}:SectionHeaderProps) {


  return (
    <>
      <div className='flex justify-between items-center flex-row'>
          <h1 className='text-3xl md:text-5xl lg:text-6xl leading-tight'>
            {title}
          </h1>
          <Button className='btn-2' onClick={buttonAction}>
            {buttonLabel}
          </Button>
        </div> 
        <div className=''>
          <p className='text-p md:pl-12 font-light'>
            {description}
          </p>
        </div> 
    </>
  )
}
