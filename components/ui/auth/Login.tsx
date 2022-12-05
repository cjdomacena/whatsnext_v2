import { NextPage } from "next";
import { useState } from "react";
import EmailInput from "../../common/input/EmailInput";
import PasswordInput from "../../common/input/PasswordInput";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import {
  AuthError,
  SignInWithPasswordCredentials,
} from "@supabase/supabase-js";
import { Button, CancelButton } from "./Button";
const Login: NextPage = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password }: any = e.target.elements;

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
        <Button type="submit" disabled={loading}>
          Login
        </Button>
        <CancelButton
          type="button"
          disabled={loading}
          onClick={() => router.push("/")}
        >
          Cancel
        </CancelButton>
      </div>
    </form>
  );
};

export default Login;
