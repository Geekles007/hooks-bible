import React, {memo} from "react";
import styled from "styled-components";
import SidenavController from "./controller";
import {Link, useParams} from "react-router-dom";

const SidenavWrapper = styled.div`
  height: calc(100vh - 60px);
  width: 300px;
  background: #222;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 1em 0;
  border-right: 1px solid rgba(255, 255, 255, 0.1);

  display: flex;
  flex-direction: column;

  a {
    padding: .7em 1.8em;
    text-decoration: none;
    cursor: pointer;
    color: #fff;
    transition: .5s;
    font-size: .8em;

    &:hover {
      color: #0ba0d9;
      background: rgba(255, 255, 255, 0.1);
    }

    &.active {
      color: #0ba0d9;
    }
  }
`;

interface SidenavProps {

}

const Sidenav = ({}: SidenavProps) => {
    const {hooks} = SidenavController;
    const {hook: route} = useParams();

    return <SidenavWrapper>
        {
            (Array.from(hooks.keys()).sort()).map(hook => {
                console.log(route, hook);
                return <Link className={(route === hook) ? "active" : ""} key={hook} to={`${hook}`}>{hooks.get(hook)?.title as string ?? ""}</Link>
            })
        }
    </SidenavWrapper>

}

export default memo(Sidenav);
