import React, {memo} from "react";
import styled from "styled-components";
import {Outlet} from "react-router-dom";
import Header from "../header";
import Sidenav from "../sidenav";

const ContainerWrapper = styled.div`
  .container {
    display: flex;
    
    .content {
      width: 100%;
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
