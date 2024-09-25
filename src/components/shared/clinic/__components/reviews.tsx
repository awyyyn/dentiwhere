import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast.ts";
import { writeReview } from "@/actions";
import { useAtom, useAtomValue } from "jotai";
import { reviewsAtom } from "@/atoms/review-atom.ts";
import { useParams } from "react-router-dom";
import { format, isSameDay, isYesterday } from "date-fns";
import { userAtom } from "@/atoms/user-atom";

export default function Reviews() {
	const { toast } = useToast();
	const params = useParams();
	const [review, setReview] = useState("");
	const [loading, setLoading] = useState(false);
	const [reviews, setReviews] = useAtom(reviewsAtom);
	const user = useAtomValue(userAtom);

	const handleSubmitReview = async () => {
		setLoading(true);
		const uuid = localStorage.getItem("uuid") as string;
		const name = localStorage.getItem("name")?.split(" ")[0] as string;
		try {
			const newReview = await writeReview({
				clinicId: Number(params?.id),
				review: String(review),
				name,
				uuid,
			});
			setReviews((reviews) => [newReview, ...reviews]);
			setReview("");
			setLoading(false);
			toast({
				title: "Review Sent!",
				description: "Your review has been sent",
				className: "bg-emerald-600 text-white",
			});
		} catch {
			setLoading(false);
			toast({
				title: "ERROR!",
				description: "Something went wrong, please try again later.",
				variant: "destructive",
			});
		}
	};

	return (
		<div className="">
			<div>
				<div className="space-y-1 mb-5">
					{user.id === 0 && (
						<>
							<div className="flex gap-2 ">
								<Avatar>
									<AvatarFallback>U</AvatarFallback>
								</Avatar>
								<div className="w-full">
									{/* <Rating /> */}
									<Textarea
										placeholder="Write your review here..."
										value={review}
										onChange={(e) => setReview(e.target.value)}
										className="bg-white border-white focus:outline-white"
									/>
								</div>
							</div>
							<div className="ml-auto max-w-fit space-x-2 ">
								{review && (
									<Button
										className=""
										size="sm"
										onClick={() => setReview("")}
										disabled={loading}>
										Cancel
									</Button>
								)}
								<Button
									onClick={handleSubmitReview}
									className=""
									size="sm"
									disabled={!review || loading}>
									Submit Review
								</Button>
							</div>
						</>
					)}
				</div>
				<div className="space-y-3">
					{reviews.map((review, index) => {
						const yesterday = isYesterday(review.createdAt);
						const now = isSameDay(new Date(), review.createdAt);

						const time = format(review.createdAt, "hh:mm aa");

						const timeLabel = yesterday
							? `Yesterday at  ${time}`
							: now
							? time
							: `${format(review.createdAt, "LLL. d, u hh:mm aa")}`;

						return (
							<div key={review.id} className="">
								<div className="flex gap-2 shadow-sm border-white/40 bg-white/10 rounded-lg p-2">
									<Avatar>
										<AvatarFallback className={`uppercase  `}>
											{review.name[0]}
										</AvatarFallback>
									</Avatar>
									<div className="w-full space-y-1">
										<div className="flex justify-between">
											<p className="text-sm capitalize">{review.name}</p>
											<p className="text-sm text-gray-700">{timeLabel}</p>
										</div>
										<Textarea
											value={review?.review}
											readOnly
											className="bg-white/30 focus:border-none border-none outline-none focus:outline-none resize-none "
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
