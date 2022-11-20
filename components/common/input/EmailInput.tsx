import { useState } from "react";
import FormInput from "./FormInput";
type Props = {
  loading: boolean;
};

const EmailInput: React.FC<Props> = ({ loading }) => {
  const [email, setEmail] = useState<string>("");
  return (
    <FormInput
      type="email"
      setter={setEmail}
      value={email}
      id="email"
      placeholder="Enter email"
      disabled={loading}
      required
      textLabel="Email"
      autoComplete="off"
    />
  );
};

export default EmailInput;
