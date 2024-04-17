import React from 'react'
import { Button, Flex, Image, Link, useColorMode,Box } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx"
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { BsFillChatQuoteFill } from "react-icons/bs";
import useLogout from '../hooks/useLogout';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import authScreenAtom from '../atoms/authAtom';

function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom)
  const logout = useLogout();

const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <> 
 <Flex  justifyContent={"space-around"} mt={6}  position={"fixed"} bottom={0} width="100%"  boxShadow="0px -2px 4px rgba(0, 0, 0, 0.1)" backgroundColor={"green  "}  >
        {user && (
				<Link as={RouterLink} to='/'>
					<AiFillHome size={27} color='white' />
				</Link>
			)}

          		{!user && (
				<Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("login")}>
					Login
				</Link>
			)}

        <Image
				cursor={"pointer"}
				alt='logo'
				w={8}
				src={colorMode === "dark" ? "/white-logo1.png" : "/white-logo1.png"}
				onClick={toggleColorMode}
			/> 
{user && (  <Flex alignItems={"center"} gap={4}>
					<Link as={RouterLink} to={`/${user.username}`} >   
						<RxAvatar size={24}  color='white'/>
					</Link>

					<Link as={RouterLink} to={`/chat`}>
						<BsFillChatQuoteFill size={25} color='white' />
					</Link>

						<Button size={"xs"}  onClick={logout}>
						<FiLogOut size={25}   />
					</Button>
				</Flex>
		
			)}

{!user && (
				<Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("signup")}>
					Sign up
				</Link>
			)}
        </Flex>
    </>
  )
}

export default Footer