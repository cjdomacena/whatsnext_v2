import { useState } from "react";
import FormInput from "./FormInput";
type Props = {
  loading: boolean;
  textLabel?: string;
};

const PasswordInput: React.FC<Props> = ({
  loading,
  textLabel = "Password",
}) => {
  const [password, setPassword] = useState<string>("");
  return (
    <FormInput
      type="password"
      setter={setPassword}
      value={password}
      id="password"
      placeholder="Enter Password"
      disabled={loading}
      required
      textLabel={textLabel}
      isPassword={true}
    />
  );
};

export default PasswordInput;
