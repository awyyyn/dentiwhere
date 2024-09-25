import {db} from "@/utils/supabase.ts";
import {ERR_INTERNAL} from "@/constants/errors.ts";
import {DBReview, Review} from "@/types/types.ts";


interface WriteReviewInput {
    review?: string;
    rate?: number;
    name: string;
    clinicId: number;
    uuid: string;
}

const transformReview = (data: DBReview): Review => {
    return {
        id: data.id,
        name: data.name,
        rate: data.rate || undefined,
        review: data.review || undefined,
        uuid: data.uuid,
        clinicId: data.clinic_id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
    }
}

export const writeReview = async (review: WriteReviewInput) => {

    const response = await db.from("reviews").insert({
        review: review.review ?? "",
        name: review.name,
        rate: review.rate,
        clinic_id: review.clinicId,
        uuid: review.uuid,
    }).select().single()

    if(response.error) throw new Error(ERR_INTERNAL)

    return transformReview(response.data)
}

export const getAllClinicReviews = async (id: number) => {
    const response = await db.from("reviews").select().eq("clinic_id", id)

    if(response.error) throw new Error(ERR_INTERNAL)

    return response.data.map(data => transformReview(data))
}