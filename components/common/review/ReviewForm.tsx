import { Review } from "@lib/types/common";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { PostgrestError, User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoSendSharp } from "react-icons/io5";
import { CharacterCounter } from "../util";
import RadioButtons from "./RadioButtons";

type ReviewFormProps = {
  movie_id: number | string | undefined;
  movie_title: string;
  user: User;
  media_type: string;
};

const ReviewForm: React.FC<ReviewFormProps> = ({
  user,
  movie_id,
  movie_title,
  media_type,
}) => {
  const supabase = useSupabaseClient();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [review, setReview] = useState<string>("");
  const [activeRating, setActiveRating] = useState<number | null>(null);
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
    if (user && activeRating) {
      const data: Review = {
        user_id: user?.id,
        review: review,
        rating: activeRating,
        movie_id: Number(movie_id),
        movie_title: movie_title,
        type: media_type,
      };
      try {
        const { error } = await supabase.from("reviews").insert({ ...data });
        if (error) {
          throw error;
        }
        queryClient.invalidateQueries({
          queryKey: ["reviews", { id: movie_id }],
        });
      } catch (e: any) {
        let error: PostgrestError | Error = e;
        console.log(error);
      } finally {
        setReview("");
        setActiveRating(-1);
      }
    }
  };

  const mutation = useMutation({
    mutationFn: handleSumbit,
    onSuccess: () => {
      toast.success("Review Submitted!", {
        id: "mutation",
      });
    },
    onError: (err, newReview, context: any) => {
      queryClient.setQueryData(
        ["reviews", { id: movie_id }],
        context.previousReviews
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", { id: movie_id }],
      });
    },
    onMutate: () => {
      toast.loading("Loading...", {
        id: "mutation",
      });
    },
  });

  return (
    <form
      className="flex-grow dark:bg-white/5 bg-neutral-100 text-sm rounded h-fit p-3 space-y-2 "
      onSubmit={(e) => {
        e.preventDefault();
        if (!activeRating || activeRating == -1) {
          toast.error("Must Add a rating");
        } else {
          mutation.mutate(e);
        }
      }}
    >
      <div className="flex items-start space-y-2">
        <textarea
          className="w-full appearance-none  bg-transparent focus:outline-none h-auto resize-none dark:text-neutral-300  disabled:cursor-not-allowed p-2"
          id="title"
          placeholder="Add a Review"
          value={review}
          onChange={handleChange}
          ref={ref}
          required
          disabled={mutation.isLoading}
        />
        <button
          type="submit"
          className="dark:bg-neutral-800 bg-neutral-300 p-2 rounded-full disabled:cursor-not-allowed"
          disabled={mutation.isLoading}
        >
          {!mutation.isLoading ? (
            <IoSendSharp />
          ) : (
            <AiOutlineLoading3Quarters className="animate-spin" />
          )}
        </button>
      </div>
      <div className="flex items-end justify-between px-2 border-t pt-3 dark:border-t-neutral-700">
        <div className="flex items-center gap-2">
          <h4 className="text-xs">Rating: </h4>
          <RadioButtons
            activeRating={activeRating}
            setActiveRating={setActiveRating}
          />
          <button
            type="button"
            className="text-xs dark:text-neutral-400 border p-1 dark:border-neutral-700 rounded"
            onClick={() => setActiveRating(-1)}
          >
            Reset Rating
          </button>
        </div>
        <CharacterCounter text={review} />
      </div>
    </form>
  );
};

export default ReviewForm;
