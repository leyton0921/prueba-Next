"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #5d37ef;

`;

const Label = styled.label`
  width: 100%;
  display: flex;
  padding: 5px;
  font-weight: 600;
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 10px;
  background: linear-gradient(to right, #fbb034, #ffdd00); 
  color: #5d37ef;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin: 15px auto;
  font-family: "Prompt", sans-serif;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const StyledLink = styled(Link)`
  font-weight: 900;
  color: #5d37ef;
  text-decoration: none;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const SuccessMessage = styled.p`
  color: green;
`;

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    const response = await fetch('http://192.168.88.39:7000/auth/signup', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, username, phone }), // Include username and phone
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      setSuccess("Registration successful! You can now log in.");
      setError(null);
      router.push("/login");
    } else {
      setError(data.message || "Error registering user");
      setSuccess(null);
    }
  };

  return (
    <FormContainer>
      <Title>Register</Title>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <div>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email:</Label>
          <Input
            placeholder="your@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="username">Username:</Label>
          <Input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone:</Label>
          <Input
            placeholder="Phone number"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password:</Label>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <StyledButton
          type="submit"
          label={loading ? "Registering..." : "Register"}
          disabled={loading}
        />
        <p>
          Already have an account? <StyledLink href="/login">Login</StyledLink>
        </p>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </FormContainer>
  );
}
