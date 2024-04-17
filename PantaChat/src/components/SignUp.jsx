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
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  const setUser = useSetRecoilState(userAtom);


  const [userdetails, setUserDetails] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
	});
  



 const handleSignUp = async ()=>{
  const {name, username, email, password } = userdetails
    
 

    try {

      if (!name ||!username || !email || !password) {
        alert("Please Fill The Missing Fields")
      }else{  
        
        
    const res = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdetails),
    });


    const data = await res.json();

     console.log(data)

    if (data.error) {
      alert( data.error );
      console.log(data.error)    
      return; 
    } else{

    localStorage.setItem("user-app", JSON.stringify(data));
     setUser(data);
    }
  }
  } catch (error) {
    console.log(error)
    alert( error );

    
  }
 }


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
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("gray.50", "gray.700")}
            boxShadow={"2xl"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>

                <Box>

                  <FormControl isRequired>
                    <FormLabel> Name</FormLabel>
                    <Input type="text" placeholder="John B" value={userdetails.name} onChange={(e)=>setUserDetails({...userdetails,name:e.target.value})} /> 
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isRequired>
                    <FormLabel>username</FormLabel>
                    <Input type="text" placeholder="johnb" value={userdetails.username} onChange={(e)=>setUserDetails({...userdetails,username:e.target.value})} />
                  </FormControl>
                </Box>

              </HStack>

              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" placeholder="john@gmail.com" value={userdetails.email} onChange={(e)=>setUserDetails({...userdetails,email:e.target.value})} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} value={userdetails.password} onChange={(e)=>setUserDetails({...userdetails,password:e.target.value})} />
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
                  loadingText="Submitting"
                  size="lg"
                  bg={"green.500"}
                  color={"white"}
                  _hover={{
                    bg: "green.700",
                  }}

                  onClick={handleSignUp}
                >
                  Sign up
                </Button>
              </Stack>

              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"} onClick={() => setAuthScreen("login")}>Login</Link>
                </Text>
              </Stack>

            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}

export default SignUp;
