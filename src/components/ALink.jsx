import styled from "styled-components";

export const ALink = (props) => {
  const { link, children } = props;
  return (
    <ALinkContainer href={link} rel="noopenner noreferrer" target="_blank">
      {children}
    </ALinkContainer>
  );
};

const ALinkContainer = styled.a`
  outline: none;
  text-decoration: none;
  cursor: pointer;
  color: #ffffff;
`;
