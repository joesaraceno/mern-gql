import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Item = styled.div`
  width: 100px;
  height: 40px;
  color: black;
  margin: 0 20px;
`;

const ItemContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: blueviolet;
  a {
    transition: border .1s ease-out;
    color: rgb(42, 46, 43, .9);
    padding-top: 5px;
    padding-bottom: 2px;
    height: 100%;
    width: 100%;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      padding-bottom: 0;
      border-bottom: 2px solid rgba(42, 46, 43, 0.9);
    }
  }
`

export const NavItem = props => {
  const { title, url } = props.navInfo;
  return (
    <Item>
      <ItemContents>
        <NavLink 
          activeStyle={{ 
            borderBottom: "2px solid rgba(42, 46, 43, 0.9)",
            paddingBottom: "0"
          }} 
          to={url}>{title}
        </NavLink>
      </ItemContents>
    </Item>
  )
};