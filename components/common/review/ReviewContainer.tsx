import { ReviewThread } from "@lib/types/common";
import Review from "./Review";

type CommentProps = {
  reviews: ReviewThread[];
};

const ReviewContainer: React.FC<CommentProps> = ({ reviews }) => {
  return (
    <ul className="space-y-4 mt-4">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
};

export default ReviewContainer;
