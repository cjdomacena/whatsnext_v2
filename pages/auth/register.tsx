import Link from "next/link";
import Register from "@components/ui/auth";

const UserRegistration = () => {
  return (
    <div className="absolute top-0 min-h-screen grid place-items-center w-full">
      <div className="container max-w-sm">
        <div className="space-y-1 text-center">
          <h1 className="text-4xl font-bold">Registration</h1>
          <p className="text-xs text-neutral-500 font-medium">
            Enter your email below to create your account
          </p>
        </div>
        <Register />
        <div className="text-xs font-light text-neutral-500 pt-2 text-center my-4 space-y-2">
          <p>
            <Link href="/auth/forgot-password">
              <span className="font-medium text-center underline block">
                Forgot Password?
              </span>
            </Link>
          </p>
          <p>
            <Link href="/auth/login">
              <span className="font-medium text-center underline">
                Already have an account? Log In
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
