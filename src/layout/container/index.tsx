import React, {memo} from "react";
import styled from "styled-components";
import {Outlet} from "react-router-dom";
import Header from "../header";
import Sidenav from "../sidenav";

const ContainerWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  
  .container {
    display: flex;
    
    .content {
      width: 100%;
      height: calc(100vh - 60px);
      overflow-y: scroll;
    }
  }
`;

interface ContainerProps {

}

const Container = ({}: ContainerProps) => {

    return <ContainerWrapper>
        <Header />
        <div className="flex container">
            <Sidenav />
            <div className="content">
                <Outlet />
            </div>
        </div>
    </ContainerWrapper>

}

export default memo(Container);
