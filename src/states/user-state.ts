 
import { Role } from '@/types/types'
import { atom,  } from 'jotai'

const userAtomDefaultValue = {
    email: '',
    fullName: '',
    phone: '',
    role: Role.doctor,
    username: '',
    uuid: '',  
}  

export const userAtom = atom<any | null>(userAtomDefaultValue)