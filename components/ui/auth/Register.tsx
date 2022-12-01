import { NextPage } from "next";
import { useState } from "react";
import {
  FormInput,
  PasswordInput,
  EmailInput,
  UsernameInput,
} from "../../common/input";
import { Button, CancelButton } from "./Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import {
  AuthError,
  SignInWithPasswordCredentials,
} from "@supabase/supabase-js";

const Register: NextPage = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, fullName, username }: any = e.target.elements;

    const data: SignInWithPasswordCredentials = {
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: fullName.value,
          username: username.value,
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
        if (e.message.includes("duplicate")) {
          setErrorMessage("Username already exists");
        } else {
          setErrorMessage(e.message);
        }
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
      <UsernameInput loading={loading} />
      <EmailInput loading={loading} />
      <PasswordInput loading={loading} textLabel="Create Password" />

      <div className="space-y-2">
        <Button type="submit" disabled={loading}>
          Register
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

export default Register;
