import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../../logo.svg';
import { NavLink } from 'react-router-dom'

const Logo = styled.div`
  background-image: url(${backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 40px;
  padding: 0 10px;
`;

export const NavLogo = () => {
  return (
    <NavLink to="/">
      <Logo />
    </NavLink>
  )
};