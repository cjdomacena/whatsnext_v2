import MetaHeader from "@components/MetaHeader";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const Checkout = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ["subscription_info"],
  });
  const router = useRouter();
  const { query } = router;
  return (
    <div className="w-scren h-[calc(100vh-80px)] grid place-items-center">
      <MetaHeader
        title={
          query.status === "success" ? "Payment Sucessful" : "Payment Failed"
        }
      />
      <h1 className="text-3xl font-black dark:text-white max-w-4xl text-center">
        {query.status === "success"
          ? "Awesome! Payment Successful!"
          : "Oops.. Payment process failed"}
      </h1>
      <button onClick={() => router.push("/")}>Back to Homepage</button>
    </div>
  );
};

export default Checkout;
