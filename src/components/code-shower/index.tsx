import React, {memo} from "react";
import styled from "styled-components";
import Highlight, {defaultProps} from "prism-react-renderer";
import oceanic from 'prism-react-renderer/themes/oceanicNext';

const CodeShowerWrapper = styled.div`

`;

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 1em;
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

interface CodeShowerProps {
    code?: string;
}

const CodeShower = ({code = ""}: CodeShowerProps) => {

    return <CodeShowerWrapper>
        <Highlight {...defaultProps} code={code} theme={oceanic} language="jsx">
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
    </CodeShowerWrapper>

}

export default memo(CodeShower);
