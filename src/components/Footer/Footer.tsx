'use client'
import styled from 'styled-components';
import Link from 'next/link';

const FooterContainer = styled.footer`
  background: linear-gradient(90deg, #4894f2 0%, #9c57ea 100%);
  padding: 40px;
  color: white;
  display: flex;
  justify-content: space-around;
  text-align: left;
  font-family: Arial, sans-serif;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Text = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const Links = styled(Link)`
  margin-bottom: 10px;
  font-size: 1rem;
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  gap: 15px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Section>
        <Title>About Us</Title>
        <Text>The best online store.</Text>
      </Section>
      <Section>
        <Title>Quick Links</Title>
        <Links href="/">Home</Links>
        <Links href="/products">Products</Links>
        <Links href="#">Contact</Links>
      </Section>
      <Section>
        <Title>Follow Us</Title>
        <SocialMedia>
          <Links href="#">Facebook</Links>
          <Links href="#">Instagram</Links>
          <Links href="#">Twitter</Links>
        </SocialMedia>
      </Section>
    </FooterContainer>
  );
};

export default Footer;
