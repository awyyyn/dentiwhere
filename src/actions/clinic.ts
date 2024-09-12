import { Clinic, DBClinic } from "@/types/types";
import { db } from "@/utils/supabase"


const transformClinic = (clinic: DBClinic): Clinic => {
  return {
    id: clinic.id,
    address: clinic.address,
    archive: clinic.archive,
    boosted: clinic.boosted,
    contacts: clinic.contacts || [],
    createdAt: clinic.created_at,
    description: clinic.description || "",
    doctorId: clinic.doctor_id,
    email: clinic.email,
    img: clinic.img,
    updatedAt: clinic.updated_at,
    name: clinic.name,
  }
}

export const create = async (inputs: Omit<Clinic, "id" | "createdAt" | "updatedAt" | "archive" | "boosted">): Promise<Clinic> => {
  const { data, error } = await db.from("clinics").insert({
    address: inputs.address,
    website: inputs.website ?? "",
    doctor_id: inputs.doctorId,
    email: inputs.email,
    name: inputs.name,
    archive: false,
    boosted: false,
    contacts: inputs.contacts,
    description: inputs.description,
    img: inputs.img
  }).select().maybeSingle()

  if(error || data === null) throw new Error("Error creating clinic");
  
  return transformClinic(data)
}

export const update = async (inputs: Omit<Clinic,  "createdAt" | "updatedAt" | "accessibilities" | "services" | "amenities" | "doctorId">) => {

  const clinic = await db.from("clinics").update({
    address: inputs.address,
    archive: inputs.archive,
    boosted: inputs.boosted,
    contacts: inputs.contacts || [],
    description: inputs.description,
    email: inputs.email,
    website: inputs.website,
    map: inputs.map,
    name: inputs.name,
    img: inputs.img
  }).eq("id", inputs.id).maybeSingle();

  if(clinic.error || clinic.data === null) throw new Error("Failed to update your clinic information")

  return transformClinic(clinic.data)
}

export const deleteOne = async (id: number) => {
  await db.from("clinics").delete().eq("id", id)
}