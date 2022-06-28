import React, {memo} from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import SidenavController from "../../layout/sidenav/controller";
import Highlight, {defaultProps} from "prism-react-renderer";

const ContentWrapper = styled.div`
  padding: 2em 0;
  width: 100%;
  
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
  }
`;

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

interface ContentProps {

}

const Content = ({}: ContentProps) => {
    const {hook} = useParams();
    const {hooks} = SidenavController;

    const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();
`;

    return <ContentWrapper>
        <div className="hook-desc">
            <h1>{hooks.get(hook as string)?.title}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut earum enim est, explicabo facilis ipsa iusto laborum molestias quibusdam repellendus, temporibus velit vitae. Deserunt illum ipsa quisquam reiciendis repellendus!</p>
            <h2>The Hook</h2>
            <Highlight {...defaultProps} code={exampleCode} language="jsx">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <Pre className={className} style={style}>
                    {tokens.map((line, i) => (
                        <Line key={i} {...getLineProps({ line, key: i })}>
                            <LineNo>{i + 1}</LineNo>
                            <LineContent>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token, key })} />
                                ))}
                            </LineContent>
                        </Line>
                    ))}
                  </Pre>
                )}
            </Highlight>
            <h2>Usage</h2>
            <Highlight {...defaultProps} code={exampleCode} language="jsx">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <Pre className={className} style={style}>
                    {tokens.map((line, i) => (
                        <Line key={i} {...getLineProps({ line, key: i })}>
                            <LineNo>{i + 1}</LineNo>
                            <LineContent>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token, key })} />
                                ))}
                            </LineContent>
                        </Line>
                    ))}
                  </Pre>
                )}
            </Highlight>
        </div>
    </ContentWrapper>

}

export default memo(Content);
