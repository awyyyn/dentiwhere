import { Role, User } from '@/types'
import { atom,  } from 'jotai'

const userAtomDefaultValue = {
    email: '',
    fullName: '',
    phone: '',
    role: Role.user,
    username: '',
    uuid: '',  
}  

export const userAtom = atom<User | null>(userAtomDefaultValue)