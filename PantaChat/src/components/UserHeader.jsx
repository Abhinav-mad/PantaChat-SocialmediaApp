import { Avatar, Box, Flex, Menu, MenuButton, Portal, Text, VStack, useToast,Link,Button} from '@chakra-ui/react'
import { MenuItem, MenuList } from "@chakra-ui/menu";	
import React from 'react'
import { CgMoreO } from "react-icons/cg";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import useFollowUnfollow from '../hooks/useFollowUnFollow';
import userAtom from '../atoms/userAtom';



function UserHeader({user}) {
	
	const currentUser = useRecoilValue(userAtom); // the user which is logged in
	const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);





    const toast = useToast  ();
    const copyURL = () => {
		const currentURL = window.location.href;
		navigator.clipboard.writeText(currentURL).then(() => {
			toast({
				title: "copied.",
				status: "success",
				duration: 3000,
				isClosable: true,   
			});
		});
	};

    return (
        <>
            <VStack gap={4} alignItems={'start'}>
                <Flex justifyContent={'space-between'} w={'full'}>
                    <Box>

                        <Text fontSize={"2xl"} fontWeight={"bold"}>
                           {user.name}
                        </Text>
                        <Flex gap={2} alignItems={"center"}>
                            <Text fontSize={"sm"} fontWeight={"bold"}>{user.username}</Text>
                            <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                                
                            </Text>
                        </Flex>


                    </Box>
                    <Box>
                       { user.profilePic && <Avatar

                            name={user.name}
                            src={user.profilePic}
                            size={{
								base: "md",
								md: "xl",
							}}	


                        />}

                      			{!user.profilePic && (
						<Avatar
							name={user.name}
							src='https://bit.ly/broken-link'
							size={{
								base: "md",
								md: "xl",
							}}
						/>
					)}             

                    </Box>
                </Flex>
                <Text>
				{user.bio}
                </Text>
								{/* follow and unfollow */}
    
			{currentUser?._id === user._id && (
				<Link as={RouterLink} to='/update'>
					<Button size={"sm"}>Update Profile</Button>
				</Link>
			)}
			{currentUser?._id !== user._id && (
				<Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
					{following ? "Unfollow" : "Follow"}
				</Button>
			)}

  <Flex justifyContent={"space-between"} w={"full"}>

                <Flex gap={2} alignItems={"center"}>
					<Text color={"gray.light"}> {user.followers.length}  followers</Text>
				</Flex>
                <Flex>
					
					<Box className='icon-container'>
						<Menu>
							<MenuButton>
								<CgMoreO size={24} cursor={"pointer"} />
							</MenuButton>
							<Portal>
								<MenuList bg={"gray.dark"} color={"white"}>
                                <MenuItem bg={"gray.dark"} onClick={copyURL}>
										Copy link
									</MenuItem>
									<MenuItem bg={"gray.dark"}>
										Rooms
									</MenuItem>
								</MenuList>
							</Portal>
						</Menu>
					</Box>
				</Flex>
            </Flex> 
            <Flex w={"full"}>
				<Flex flex={1} borderBottom={"1.5px solid green"} justifyContent={"center"} pb='3' cursor={"pointer"}>
					<Text fontWeight={"bold"}> Posts</Text>
				</Flex>
				<Flex
					flex={1}
					borderBottom={"1px solid green"}
					justifyContent={"center"}
					color={"gray.light"}
					pb='3'
					cursor={"pointer"}
				>
					<Text fontWeight={"bold"}> </Text>
				</Flex>
			</Flex>   
            </VStack>

        </>
    )
}

export default UserHeader