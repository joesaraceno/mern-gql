import React from 'react';
import styled from 'styled-components';
import NavItem from './NavItem';
import NavLogo from './NavLogo';

const NavHeader = styled.header`
  position: fixed;
  background-color: #FEFFF2;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);
`;

const NavItems = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  margin: 0;
  justify-content: flex-start;
`;

let IsLoggedIn = false;

const navs = [
  {
    url: "/bookings",
    title: "Bookings",
  },
  {
    url: "/auth",
    title: `Log${IsLoggedIn ? 'out' : 'in'}`,
  },
  {
    url: "/events",
    title: "Events",
  },
  {
    url: "/profile",
    title: "Profile",
  },
];

const Navigation = props => {
  return (
    <NavHeader>
      <NavItems>
        {navs.map(nav => {
          return <NavItem key={nav.url} navInfo={nav} />
        })}
      </NavItems>
      <NavLogo />
    </NavHeader>
  )
};
export default Navigation;