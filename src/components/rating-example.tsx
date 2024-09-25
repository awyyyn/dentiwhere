import EcommerceRating from "./ecommerce-rating";
import { Star, Heart, ThumbsUp } from "lucide-react";

export function RatingExampleComponent() {
	const handleRatingSubmit = (rating: number) => {
		// Here you would typically send this rating to your backend
	};

	return (
		<div className="space-y-12 p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-4">
				E-commerce Rating Component Examples
			</h1>

			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Default Star Rating</h2>
				<EcommerceRating
					averageRating={4.5}
					totalReviews={120}
					onRatingSubmit={handleRatingSubmit}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Heart Rating (Large, Red)</h2>
				<EcommerceRating
					averageRating={3.8}
					totalReviews={85}
					onRatingSubmit={handleRatingSubmit}
					icon={Heart}
					size="lg"
					color="text-red-500"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="text-xl font-semibold">
					Thumbs Up Rating (Small, Green)
				</h2>
				<EcommerceRating
					averageRating={4.2}
					totalReviews={250}
					onRatingSubmit={handleRatingSubmit}
					icon={ThumbsUp}
					size="sm"
					color="text-green-500"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="text-xl font-semibold">
					Custom Star Rating (Medium, Purple)
				</h2>
				<EcommerceRating
					averageRating={4.7}
					totalReviews={500}
					onRatingSubmit={handleRatingSubmit}
					icon={Star}
					size="md"
					color="text-purple-500"
				/>
			</div>
		</div>
	);
}
