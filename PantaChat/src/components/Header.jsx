import { Flex, Image, useColorMode,Link,Button } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import useLogout from '../hooks/useLogout';
import authScreenAtom from '../atoms/authAtom';
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    const user = useRecoilValue(userAtom)
    const logout = useLogout();

	const setAuthScreen = useSetRecoilState(authScreenAtom);

console.log("inside header")

	//as={RouterLink} to={`/${user.username}`}
  return (
    <>
        <Flex  justifyContent={"space-between"} mt={6} mb='12'>
        {user && (
				<Link as={RouterLink} to='/'>
					<AiFillHome size={24} color='green' />
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
				src={colorMode === "dark" ? "/white-logo1.png" : "/dark-logo1.png"}
				onClick={toggleColorMode}
			/> 
{user && (  <Flex alignItems={"center"} gap={4}>
					<Link as={RouterLink} to={`/${user.username}`} >   
						<RxAvatar size={24} color='green' />
					</Link>

					<Link as={RouterLink} to={`/chat`}>
						<BsFillChatQuoteFill size={20} color='green' />
					</Link>

						<Button size={"xs"}  onClick={logout}>
						<FiLogOut size={20} color='green' />
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

export default Header