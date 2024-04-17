import React, { useEffect, useState } from 'react'
import { Flex, Spinner } from "@chakra-ui/react";
import UserHeader from '../components/UserHeader'
import useShowToast from '../hooks/useShowToast';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useParams } from "react-router-dom";
import postsAtom from '../atoms/postAtom';
import Post from '../components/Post';
import { useRecoilState } from 'recoil';

function UserPage() {
	const { user, loading } = useGetUserProfile();
	const { username } = useParams();
	const showToast = useShowToast();
	const [posts, setPosts] = useRecoilState(postsAtom);
	const [fetchingPosts, setFetchingPosts] = useState(true);

	useEffect(() => {
		const getPosts = async () => {
			if (!user) return;	
			setFetchingPosts(true);
			console.log('useEffect dependencies:', { username, user });

			
			try {
				const res = await fetch(`/api/posts/user/${username}`);
				const data = await res.json();
				console.log(data);
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
				setPosts([]);
			} finally {
				setFetchingPosts(false);
			}
		};

		getPosts();
	}, [username, setPosts, user]);

	if (!user && loading) {
		return (
			<Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
	}

	if (!user && !loading) return <h1>User not found</h1>;

  return (
    <>
      <UserHeader user={user} />

{!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
{fetchingPosts && (
	<Flex justifyContent={"center"} my={12}>
		<Spinner size={"xl"} />
	</Flex>
)}

{posts.map((post) => (
	<Post key={post._id} post={post} postedBy={post.postedBy} />
))}
</>	
  )
}

export default UserPage	