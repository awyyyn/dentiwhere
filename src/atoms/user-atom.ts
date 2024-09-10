 
import { Role, User } from '@/types/types'
import { atom,  } from 'jotai'

const userAtomDefaultValue: User = {
    email: '',
    name: '',
    contacts: [],
    role: Role.doctor,
    authId: '',
    boost: false,
    id: 0,
    img: '',
    licenseNumber: '',
    verified: false,
    clinicId: 0,
    createdAt: '',
    updatedAt: '',
    address: '',
    birthDate: '',
}  

export const userAtom = atom<User>(userAtomDefaultValue)