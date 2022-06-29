import React, {memo} from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import SidenavController from "../../layout/sidenav/controller";
import CodeShower from "../code-shower";

const ContentWrapper = styled.div`
  padding: 2em 0;
  
  .hook-desc {
    width: 700px;
    margin: 0 2em;
    
    h1 {
      font-size: 2.3em;
      margin: 0;
      color: #fff;
    }
    
    h2 {
      margin-bottom: 0;
      color: #fff;
    }
    
    p {
      font-size: .9em;
      color: #fff;
    }
    
    strong {
      color: #0ba0d9;
      font-weight: 500;
    }
  }
`;

interface ContentProps {

}

const Content = ({}: ContentProps) => {
    const {hook} = useParams();
    const {hooks} = SidenavController;

    return <ContentWrapper>
        <div className="hook-desc">
            <h1>{hooks.get(hook as string)?.title}</h1>
            {hooks.get(hook as string)?.description}
            <h2>The Hook</h2>
            <CodeShower code={hooks.get(hook as string)?.hookCode} />
            <h2>Usage</h2>
            <CodeShower code={hooks.get(hook as string)?.usageCode} />
        </div>
    </ContentWrapper>

}

export default memo(Content);
