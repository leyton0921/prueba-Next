'use client'
import { useSession } from "next-auth/react";
import { CiUser } from "react-icons/ci";
import styled from "styled-components";
import Spinner from "@/components/spiner/Spiner";
 import { useRouter } from "next/navigation";


const ProfileContainer = styled.div`
  display: flex;
  margin: 20px;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 20px;
  border-right: 1px solid #e1e1e1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #e1e1e1;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;
function ProfilePage() {
    
        const { data: session, status } = useSession();
        const router = useRouter();

        if (status === "loading") {
            return <Spinner/>; 
        }
    
        if (!session) {
            router.push("/");

        }
    
        return (
            <InfoContainer>
                <Avatar>
                    <CiUser size={90} />
                </Avatar>
                <Title>{session!.user.name}</Title>
                <p>{session!.user.email}</p>
            </InfoContainer>
        );

}   
export default ProfilePage