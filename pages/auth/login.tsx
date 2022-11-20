import Link from "next/link";
import Login from "@components/ui/auth";
import { BackButton } from "@components/common/button";
import { useRouter } from "next/router";

const UserLogin = () => {
  const router = useRouter();
  return (
    <div className="absolute top-0 min-h-screen grid place-items-center w-full z-10">
      <div className="container max-w-sm">
        <div className="space-y-1 text-center">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="text-xs text-neutral-500 font-medium">
            Continue where you left off...
          </p>
        </div>
        <Login />
        <div className="text-xs font-light text-neutral-500 pt-2 text-center my-4 space-y-2">
          <p>
            <Link href="/auth/forgot-password">
              <span className="font-medium text-center underline block">
                Forgot Password?
              </span>
            </Link>
          </p>
          <p>
            <Link href="/auth/register">
              <span className="font-medium text-center underline">
                Don&apos;t have an account? Register
              </span>
            </Link>
          </p>
        </div>
      </div>
      <div className="absolute z-20 top-6 left-6">
        <BackButton onClick={() => router.push("/")} />
      </div>
    </div>
  );
};

export default UserLogin;
