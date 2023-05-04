import styled from "styled-components";
import {WrapperProps} from './types';

export const Wrapper = styled.div<WrapperProps>`
  box-sizing: border-box;
  position: relative;
  width: ${(props) => (props.width ? props.width + "px" : "100%")};

  &.is-solved .cellWrapper {
    button {
      &:after {
        opacity: 0;
      }
      img {
        display: none;
      }
    }
  }
`;

export const CellWrapper = styled.div`
  position: relative;
  overflow: hidden;
  .placeholder {
    display: block;
    width: 100%;
    &.is-error{
        display:none;
    }
  }
`;

export const Cell = styled.button`
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  overflow: hidden;
  border: none;
  img {
    display: block;
    position: absolute;
    opacity: 0;
    transition: all 0.2s;
  }
  &:after {
    content: "";
    display: block;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.2s;
  }
  &:focus-visible {
    outline:none;
  }
  &:hover,&:focus {
    &:after {
      border-color: #fff;
    }
    img {
      opacity: 0.5;
    }
  }
`;

export const Piece = styled.div`
  position: relative;
  margin-bottom: 1rem;
  img {
    opacity: 1;
  }
  > button:after {
    display: none;
  }
  &:hover {
    img {
      opacity: 1;
    }
  }
`;