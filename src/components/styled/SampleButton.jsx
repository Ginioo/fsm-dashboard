import styled from 'styled-components';

export const SampleButton = styled.button`
  width: 120px;
  height: 30px;
  outline: none;
  margin: 0 1px;
  border: 0;
  border-bottom: 3px solid #ccc;
  background-color: #fff;
  color: #ccc;
  
  ${props => (props.active && `
    border-bottom: 3px solid #ff9489;
    // background-color: #ff9489;
    color: #000;
  `)}
`;
