import { NextPage } from "next";
import { useState } from "react";
import EmailInput from "../../common/input/EmailInput";
import PasswordInput from "../../common/input/PasswordInput";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import {
  AuthError,
  SignInWithPasswordCredentials,
} from "@supabase/supabase-js";
const Login: NextPage = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, fullName }: any = e.target.elements;

    const data: SignInWithPasswordCredentials = {
      email: email.value,
      password: password.value,
    };
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword(data);
      if (error) {
        throw error;
      }
      setErrorMessage(null);
      setLoading(false);
      router.push("/");
    } catch (e) {
      if (e instanceof AuthError) {
        setErrorMessage(e.message);
      } else {
        alert(e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="" autoComplete="off" onSubmit={handleSubmit}>
      <p className="text-red-500 text-xs my-4">{errorMessage}</p>
      <div className="space-y-4">
        <EmailInput loading={loading} />
        <PasswordInput loading={loading} textLabel="Create Password" />
      </div>
      <div className="space-y-2 mt-4">
        <button
          className={`w-full px-6 py-3 text-sm  transition-colors rounded font-medium bg-amber-900/20 ring-1 ring-amber-900 text-amber-500 hover:bg-amber-900 flex items-center justify-center gap-2 disabled:bg-orange-900`}
          type={"submit"}
          disabled={loading}
        >
          Log In
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : null}
        </button>
        <button
          className="py-3 text-sm w-full text-neutral-400 font-medium bg-neutral-900 rounded hover:bg-neutral-800 transition-colors disabled:bg-neutral-800"
          type="button"
          disabled={loading}
          onClick={() => router.push("/")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Login;
