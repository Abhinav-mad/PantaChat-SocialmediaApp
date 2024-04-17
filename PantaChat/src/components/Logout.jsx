import { Button } from '@chakra-ui/react'
import React from 'react'
import userAtom from '../atoms/userAtom';
import { useSetRecoilState } from 'recoil';
import { FiLogOut } from "react-icons/fi";
function Logout() {
    const setUser = useSetRecoilState(userAtom);
    const handleLogout = async () => {
		try {
			const res = await fetch("/api/users/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			if (data.error) {
				alert( data.error);
				return;
			}
               console.log("inside handle logout ")
			localStorage.removeItem("user-app");
			setUser(null);
		} catch (error) {
			alert( error);
		}
	};
  return (
    <>

<Button  position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
			<FiLogOut size={20} />
		</Button>
    </>
  )
}   

export default Logout