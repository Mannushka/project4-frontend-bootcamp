import { useAuth0 } from "@auth0/auth0-react";
import { MdOutlineLogin } from "react-icons/md";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      style={{ display: "flex", alignItems: "center" }}
    >
      Log in <MdOutlineLogin style={{ marginLeft: "5px" }} />
    </button>
  );
};

export default LoginButton;
