import React from 'react';
import styled from 'styled-components';

const StyledSpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
`
const StyledSpinner = styled.div`
    border: 0.8rem solid white;
    border-top: 0.8rem solid black;
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    animation: spin 3s linear infinite;

    @keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
`


const Spinner: React.FC = () => {
    return (
        <StyledSpinnerContainer>
            <StyledSpinner></StyledSpinner>
        </StyledSpinnerContainer>
    );
};

export default Spinner;