import React, {memo} from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  background: #222;
  height: 60px;
  padding: 0 1.5em;
  
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  
  strong {
    color: #fff;
  }
`;

interface HeaderProps {

}

const Header = ({}: HeaderProps) => {

    return <HeaderWrapper>
        <strong>Hooks Bible</strong>
    </HeaderWrapper>

}

export default memo(Header);
