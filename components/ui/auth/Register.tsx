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
import FormInput from "../../common/input";
const Register: NextPage = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, fullName }: any = e.target.elements;

    const data: SignInWithPasswordCredentials = {
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: fullName.value,
        },
      },
    };
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp(data);
      if (error) {
        throw error;
      }
      setErrorMessage(null);
      setLoading(false);
      router.reload();
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
    <form className="space-y-4" autoComplete="off" onSubmit={handleSubmit}>
      <p className="text-red-500 text-center mt-2 text-sm">{errorMessage}</p>
      <FormInput
        id="fullName"
        type="text"
        setter={setName}
        value={name}
        textLabel="Full Name"
        placeholder="Enter Full Name"
        disabled={loading}
      />
      <EmailInput loading={loading} />
      <PasswordInput loading={loading} textLabel="Create Password" />
      <div className="space-y-2">
        <button
          className={`w-full px-6 py-3 text-sm  transition-colors rounded font-medium bg-amber-900/20 ring-1 ring-amber-900 text-amber-500 hover:bg-amber-900 flex items-center justify-center gap-2 disabled:bg-orange-900`}
          type={"submit"}
          disabled={loading}
        >
          Register
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

export default Register;
