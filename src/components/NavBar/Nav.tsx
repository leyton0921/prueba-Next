'use client'
import Link from "next/link";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button"; 
import { useSession, signOut } from "next-auth/react";
import { BsPersonCircle } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(#b791fe, #ff7dc2);
  border-bottom: 1px solid #a7a7a7;
`;

const Logo = styled.a`
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

const SearchContainer = styled(Input)`
 margin: 0 auto;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconButton = styled(Button)` 
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: white;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledLink = styled(Link)`
   background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: white;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;


const NavBar = () => {
    const { data: session } = useSession();
  return (
    <NavBarContainer>
      <Logo href="/">Store</Logo>

        {session ?(
            <>
                  <SearchContainer type="text" placeholder="Search products..."/>
      <IconContainer>
      <StyledLink href="/profile"><BsPersonCircle /></StyledLink>
        <IconButton label={<FaRegHeart />}/>
        <IconButton label={<IoCartOutline />}/>
        <IconButton label={<CgLogOut />} onClick={() => signOut()}/>


      </IconContainer>

            </>

        ):(
            <>
                <StyledLink href="/login">sign in</StyledLink>
            <StyledLink href="/register" className="register">
              Sign up
            </StyledLink>
            </>
        )}
      
          
    </NavBarContainer>
  );
};

export default NavBar;
