import styled from 'styled-components';

const Label = styled.label`
  text-transform: capitalize;
  width: 100%;
  text-align: center;
  overflow: hidden;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const Input = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  clip: rect(0 0 0 0);
`;

export { Label, Input };
