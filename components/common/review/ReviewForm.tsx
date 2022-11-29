import { Review } from "@lib/types/common";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { PostgrestError, User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { CharacterCounter } from "../util";

type ReviewFormProps = {
  movie_id: number;
  user: User;
  status: boolean;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ user, movie_id, status }) => {
  const supabase = useSupabaseClient();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [review, setReview] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    if (ref.current) {
      ref.current.style.height = "50px";
      ref.current.style.height = `${target.scrollHeight}px`;
    }
    setReview(e.target.value);
  };
  const queryClient = useQueryClient();

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      const data: Review = {
        user_id: user?.id,
        review: review,
        rating: 0,
        movie_id: movie_id,
      };
      try {
        const { error } = await supabase.from("reviews").insert({ ...data });
        if (error) {
          throw error;
        }
        queryClient.invalidateQueries({ queryKey: ["reviews", movie_id] });
      } catch (e: any) {
        let error: PostgrestError | Error = e;
        alert(error.message ?? error);
      } finally {
        setReview("");
      }
    }
  };
  return (
    <form
      className="flex-grow dark:bg-white/5 bg-neutral-100 text-sm rounded h-fit p-4"
      onSubmit={handleSumbit}
    >
      <div className="flex items-center gap-2">
        <textarea
          className="w-full appearance-none  bg-transparent focus:outline-none h-auto resize-none dark:text-neutral-300"
          id="title"
          placeholder="Add a comment"
          value={review}
          onChange={handleChange}
          disabled={status}
          ref={ref}
        />
        <button
          type="submit"
          className="dark:bg-neutral-800 bg-neutral-300 p-2 rounded-full "
          disabled={status}
        >
          <IoSendSharp />
        </button>
      </div>
      {/* INSERT CHARACTER COUNTER WITH PROPS REVIEW.TEXT */}
      <CharacterCounter text={review} />
    </form>
  );
};

export default ReviewForm;
