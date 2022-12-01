import { useState } from "react";
import FormInput from "./FormInput";
type Props = {
  loading: boolean;
};

const UsernameInput: React.FC<Props> = ({ loading }) => {
  const [username, setUsername] = useState<string>("");
  return (
    <FormInput
      type="text"
      setter={setUsername}
      value={username}
      id="username"
      placeholder="Enter Username"
      disabled={loading}
      required
      textLabel="Username (min. 6)"
      autoComplete="off"
    />
  );
};

export default UsernameInput;
