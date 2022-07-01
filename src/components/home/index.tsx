import React, {memo} from "react";
import styled from "styled-components";

const HomeWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  
  p, h1 {
    color: #fff;
    text-align: center;
  }
  
  p {
    margin-top: 0;
  }
  
`;

interface HomeProps {

}

const Home = ({}: HomeProps) => {

    return <HomeWrapper>
        <h1>Hooks bible</h1>
        <p>Hey, welcome :) you can find some pre-written react hooks ready to use.</p>
    </HomeWrapper>

}

export default memo(Home);
