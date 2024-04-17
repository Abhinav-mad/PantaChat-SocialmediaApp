import React from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    setLoading(true);

    try {

      
			const res = await fetch("/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();
			if (data.error) {
        console.log("aaa")
				alert(data.error );
				return;
			}else {
        console.log(data)
        localStorage.setItem("user-app", JSON.stringify(data));
        setUser(data);
      }
			

    } catch (error) {

    alert( error );

    }finally {
			setLoading(false);
		}
  };

  return (
    <div>
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Login
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("gray.50", "gray.700")}
            boxShadow={"2xl"}
            p={8}
            w={{
              base: "full",
              sm: "400px",
            }}
          >
            <Stack spacing={4}>
              <HStack>
                <Box></Box>

                <Box>
                  <FormControl isRequired>
                    <FormLabel>username</FormLabel>
                    <Input
                      type="text"
                      placeholder="johnb"
                      value={inputs.username}
                      onChange={(e) =>
                        setInputs((inputs) => ({
                          ...inputs,
                          username: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Box>
              </HStack>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={inputs.password}
                    onChange={(e) =>
                      setInputs((inputs) => ({
                        ...inputs,
                        password: e.target.value,
                      }))
                    }
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="logging in"
                  size="lg"
                  bg={"green.500"}
                  color={"white"}
                  _hover={{
                    bg: "green.700",
                  }}
                  onClick={handleLogin}
                  isLoading={loading}
                >
                  login
                </Button>
              </Stack>

              <Stack pt={6}>
                <Text align={"center"}>
                  Don't have an acount?{" "}
                  <Link
                    color={"blue.400"}
                    onClick={() => setAuthScreen("signup")}
                  >
                    Sign up
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}

export default Login;
