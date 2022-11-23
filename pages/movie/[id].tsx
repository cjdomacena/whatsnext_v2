import { IMAGE_URL, t } from "@lib/constants/config";
import { Review, ReviewThread } from "@lib/types/common";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { FormEvent, useState, ChangeEvent, useRef, useEffect } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { IoSendSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { Loader, ReviewContainer } from "@components/common/review";

const MovieDetailsPage = () => {
  const [review, setReview] = useState<string>("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const supabase = createBrowserSupabaseClient();
  const user = useUser();
  const movie = t.json.results[2];
  const { data, status, refetch } = useQuery<
    ReviewThread[],
    PostgrestError | Error
  >(
    ["reviews", movie?.id],
    async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*,profiles(full_name,is_verified)")
        .eq("movie_id", movie?.id)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) {
        throw error;
      }
      return data;
    },
    {
      cacheTime: 5000 * 100,
      staleTime: 5000 * 100,
      refetchOnWindowFocus: false,
    }
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    if (ref.current) {
      ref.current.style.height = "50px";
      ref.current.style.height = `${target.scrollHeight}px`;
    }
    setReview(e.target.value);
  };

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

  useEffect(() => {
    if (ref.current && !review) {
      ref.current.style.height = "50px";
    }
  }, [review]);

  return (
    <div className="container mx-auto my-12 space-y-12 p-4">
      <div
        className="2xl:h-[600px] xl:h-[600px] lg:h-[600px] h-[500px] w-full bg-neutral-900 rounded-lg 
        dark:drop-shadow-[0_5px_35px_rgba(32,32,32,0.6)] drop-shadow-2xl grid place-items-center
        "
        style={{
          backgroundImage: `url('${
            IMAGE_URL + "/original" + movie?.backdrop_path
          }')`,
          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="p-4 dark:text-white text-white">
          <h2 className="text-8xl font-black">{movie?.title}</h2>
        </div>
      </div>
      <div className="ratings-container gap-12  grid grid-cols-8 ">
        <div className="w-full h-[250px] border 2xl:col-span-3 xl:col-span-3 lg:col-span-3 col-span-8"></div>
        <div className="w-full 2xl:col-span-5 xl:col-span-5 lg:col-span-5 col-span-8">
          {user ? (
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
                  disabled={status === "loading"}
                  ref={ref}
                />
                <button
                  type="submit"
                  className="dark:bg-neutral-800 bg-neutral-300 p-2 rounded-full "
                  disabled={status === "loading"}
                >
                  <IoSendSharp />
                </button>
              </div>
              <div className=" text-xs text-neutral-600">
                <p>{review.length} characters</p>
              </div>
            </form>
          ) : (
            <div className="p-4 bg-neutral-900">
              Log In to create write a review
            </div>
          )}

          {/* Comments */}
          {status === "success" ? (
            <ReviewContainer reviews={data} />
          ) : status === "loading" ? (
            <Loader />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
