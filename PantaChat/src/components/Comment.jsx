import { Avatar, Flex, Text,Divider } from '@chakra-ui/react'
import React, { useState } from 'react'

function Comment({reply,lastReply}) {

  return (
	
    <>
			<Flex gap={4} py={2} my={2} w={"full"}>
				<Avatar src={reply.userProfilePic} size={"sm"} />
				<Flex gap={1} w={"full"} flexDirection={"column"}>
					<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
						<Text fontSize='sm' fontWeight='bold'>
							{reply.username}
						</Text>
					</Flex>
					<Text>{reply.text}</Text>
				</Flex>
			</Flex>
			{!lastReply ? <Divider  borderWidth={2} /> : null}
		</>
    
    
  )
}

export default Comment