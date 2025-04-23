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
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { ModalView } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import InputItem from "../../Layout/InputItem";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons

type SignUpProps = {
  toggleView: (view: ModalView) => void;
};

const SignUp: React.FC<SignUpProps> = ({ toggleView }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  // Separate state for each password field
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [createUserWithEmailAndPassword, _, loading, authError] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError("");
    if (!form.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }

    if (form.password !== form.confirmPassword) {
      return setFormError("Passwords do not match");
    }

    // Valid form inputs
    createUserWithEmailAndPassword(form.email, form.password);
  };

  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Shared styles for password inputs for consistency
  const passwordInputStyles = {
    required: true,
    fontSize: "10pt",
    _placeholder: { color: "gray.500" },
    _hover: {
      bg: "white",
      border: "1px solid",
      borderColor: "blue.500",
    },
    _focus: {
      outline: "none",
      bg: "white",
      border: "1px solid",
      borderColor: "blue.500",
    },
    bg: "gray.50",
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
      {/* Password Input Group */}
      <InputGroup size="md">
        <Input
          name="password"
          placeholder="password"
          type={showPassword ? "text" : "password"}
          onChange={onChange}
          value={form.password}
          mb={2}
          {...passwordInputStyles} // Apply shared styles
        />
        <InputRightElement width="4.5rem" height="calc(100% - 0.5rem)"> {/* Adjust height due to mb={2} on Input */}
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            variant="ghost"
            mr={-2}
          >
            <Icon as={showPassword ? AiOutlineEyeInvisible : AiOutlineEye} />
          </Button>
        </InputRightElement>
      </InputGroup>

      {/* Confirm Password Input Group */}
      <InputGroup size="md">
        <Input
          name="confirmPassword"
          placeholder="confirm password"
          type={showConfirmPassword ? "text" : "password"}
          onChange={onChange}
          value={form.confirmPassword}
          {...passwordInputStyles} // Apply shared styles
        />
        <InputRightElement width="4.5rem" height="100%">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            variant="ghost"
            mr={-2}
          >
            <Icon
              as={
                showConfirmPassword ? AiOutlineEyeInvisible : AiOutlineEye
              }
            />
          </Button>
        </InputRightElement>
      </InputGroup>

      <Text textAlign="center" mt={2} fontSize="10pt" color="red">
// ... existing code ...
    </form>
  );
};
export default SignUp;
