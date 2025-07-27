import styled from "styled-components";
import { WrapperProps } from "./types";

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

export const Placeholder = styled.img`
  display: block;
  width: 100%;
  &.is-error {
    display: none;
  }
`;

export const CellWrapper = styled.div`
  position: relative;
  overflow: hidden;
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
    max-width: none;
  }
  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.2s;
  }
  &:focus-visible {
    outline: none;
  }
  &:hover,
  &:focus {
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
  margin-top: 1rem;

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
