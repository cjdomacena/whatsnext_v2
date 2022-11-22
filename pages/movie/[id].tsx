import { t } from "@lib/constants/config";
import { Review } from "@lib/types/common";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { FormEvent, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { IoSendSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import Rating from "@components/common/Rating";

const MovieDetailsPage = () => {
  const [review, setReview] = useState<string>("");
  const supabase = createBrowserSupabaseClient();
  const user = useUser();
  const movie = t.json.results[0];
  const { data, status, refetch } = useQuery(
    ["reviews", movie?.id],
    async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*,profiles(*)")
        .eq("movie_id", movie?.id)
        .order("created_at", { ascending: false }); // sort by latest
      if (error) {
        throw error;
      }
      return data;
    },
    {
      cacheTime: 5000,
      staleTime: 5000,
    }
  );

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (movie && user) {
      const data: Review = {
        user_id: user?.id,
        review: review,
        rating: 0,
        movie_id: movie.id,
      };
      try {
        const { error } = await supabase.from("reviews").insert({ ...data });
        if (error) {
          throw error;
        }
        refetch();
      } catch (e: any) {
        let error: PostgrestError | Error = e;
        alert(error.message ?? error);
      } finally {
        setReview("");
      }
    }
  };

  return (
    <div className="container mx-auto my-12 space-y-12 p-4">
      <div className="2xl:h-[600px] xl:h-[600px] lg:h-[600px] h-[500px] w-full bg-neutral-900"></div>
      <div className="ratings-container flex gap-12 flex-wrap">
        <div className="2xl:w-96 xl:w-96 lg:w-96 w-full h-[250px] border"></div>
        <div className="flex-grow">
          <form
            className="flex-grow dark:bg-white/5 bg-neutral-200 text-sm rounded-lg h-fit p-4"
            onSubmit={handleSumbit}
          >
            {/* <div className="  p-2 flex items-center gap-2 border-b dark:border-b-neutral-800">
            <h4 className="text-sm font-medium">
              {user?.user_metadata.full_name}
            </h4>
          </div> */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-neutral-500"></div>
              <textarea
                className="w-full appearance-none  bg-transparent focus:outline-none h-auto resize-none dark:text-neutral-300"
                id="title"
                placeholder="Add a comment"
                value={review}
                onChange={(e) => setReview(e.currentTarget.value)}
                disabled={status === "loading"}
              />
              <button
                type="submit"
                className="dark:bg-neutral-800 bg-neutral-300 p-2 rounded-full "
                disabled={status === "loading"}
              >
                <IoSendSharp />
              </button>
            </div>
            <div className="px-10 text-xs text-neutral-600">
              <p>{review.length} characters</p>
            </div>
          </form>

          {/* Comments */}
          {status === "success" ? (
            <>
              <ul className="space-y-4 mt-4">
                {data.map((res) => (
                  <li key={res.id}>
                    <Rating votes={res.rating} />
                    {res.review} - {res.profiles.full_name}
                  </li>
                ))}
              </ul>
            </>
          ) : status === "loading" ? (
            "loading"
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
