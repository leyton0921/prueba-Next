import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-family: "Prompt", sans-serif;

`;
export interface IButtonProps {
  label: string | React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({ onClick, label, className, type, disabled }) => {
  return (
    <StyledButton type={type} onClick={onClick} className={className} disabled={disabled}>
      {label}
    </StyledButton>
  );
};

export default Button;