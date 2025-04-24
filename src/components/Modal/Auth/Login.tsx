import React, { useState } from "react";
import {
  Button,
  Flex,
  Text,
  InputGroup, // Import InputGroup
  Input, // Import Input
  InputRightElement, // Import InputRightElement
  Icon, // Import Icon
} from "@chakra-ui/react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { ModalView } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import InputItem from "../../Layout/InputItem";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons

type LoginProps = {
  toggleView: (view: ModalView) => void;
};

const Login: React.FC<LoginProps> = ({ toggleView }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for visibility

  const [signInWithEmailAndPassword, _, loading, authError] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError("");
    if (!form.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }

    // Valid form inputs
    signInWithEmailAndPassword(form.email, form.password);
  };

  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <InputItem
        name="email"
        placeholder="email"
        type="text"
        mb={2}
        onChange={onChange}
        value={form.email} // Ensure value is controlled
      />
      {/* Replace InputItem with InputGroup for password */}
      <InputGroup size="md">
        <Input
          name="password"
          placeholder="password"
          type={showPassword ? "text" : "password"} // Conditional type
          onChange={onChange}
          value={form.password} // Ensure value is controlled
          required // Added required for consistency
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.50"
          mb={2} // Move mb here from InputItem
        />
        <InputRightElement width="4.5rem" height="100%">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            variant="ghost" // Use ghost variant for less emphasis
            mr={-2} // Adjust margin if needed
          >
            <Icon as={showPassword ? AiOutlineEyeInvisible : AiOutlineEye} />
          </Button>
        </InputRightElement>
      </InputGroup>
      <Text textAlign="center" mt={2} fontSize="10pt" color="red">
        {formError ||
          FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      {/* Rest of the form content */}
    </form>
  );
};
export default Login;
