import React from 'react';
import styled from 'styled-components';

const LoaderFrame = styled.div`
  position: absolute;
  background-color: #000000;
  z-index: 5;
  width: 100%;
  height: calc(100%);
  opacity: 0.2;
`;

const LoaderIcon = styled.div`
  color: #FFFFFF;
  width: 100px;
  height: 50px;
  position: relative;
  top: 30%;
  left: 50%;
  h3{
    cursor: default;
  }
  h3 > span {
    visibility: hidden;
    opacity: 0;
    transition: visibility .5s 1s;
  }
`;

export const Loader = props => {
  return (
    <LoaderFrame>
      <LoaderIcon><h3>Loading<span>.</span><span>.</span><span>.</span></h3></LoaderIcon>
    </LoaderFrame>
  )
};