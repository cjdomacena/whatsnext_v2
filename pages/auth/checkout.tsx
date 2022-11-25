import { useRouter } from "next/router";

const Checkout = () => {
  const router = useRouter();
  const { query } = router;
  console.log(query);
  return (
    <div className="w-scren h-40">
      <h1>Hello</h1>
    </div>
  );
};

export default Checkout;
