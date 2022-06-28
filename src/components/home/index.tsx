import React, {memo} from "react";
import styled from "styled-components";

const HomeWrapper = styled.div`

`;

interface HomeProps {

}

const Home = ({}: HomeProps) => {

    return <HomeWrapper>
        Home
    </HomeWrapper>

}

export default memo(Home);
