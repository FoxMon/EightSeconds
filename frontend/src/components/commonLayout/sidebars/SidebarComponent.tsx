import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Channel from "./Channel";
import { SidebarData } from "@/components/commonLayout/sidebars/sidebarData";
import Storage from "@/storage/storage";
import GlobalTheme from "@/styles/theme";

const SidebarComponent = () => {
  const navigate = useNavigate();

  const handleLogoImageClick = () => {
    navigate("/");
  };

  const hanldeLogoutButtonClick = () => {
    Storage.clearToken();
  };

  return (
    <SidebarContainer>
      <Logo onClick={handleLogoImageClick}>
        <LogoImg src={`${process.env.PUBLIC_URL}/images/plogging_logo.png`} />
      </Logo>
      {Storage.getToken() ? (
        <LoginButton to="/" onClick={hanldeLogoutButtonClick}>
          Logout
        </LoginButton>
      ) : (
        <LoginButton to="/auth">Login</LoginButton>
      )}
      <MenuContainer>
        {Storage.getToken()
          ? SidebarData.map((item, index) => {
              return (
                <MenuItem key={index}>
                  <MenuLink to={item.path}>{item.title}</MenuLink>
                </MenuItem>
              );
            })
          : SidebarData.filter((item) => !item.loginRequired).map(
              (item, index) => {
                return (
                  <MenuItem key={index}>
                    <MenuLink to={item.path}>{item.title}</MenuLink>
                  </MenuItem>
                );
              }
            )}
      </MenuContainer>
      {Storage.getToken() && <Channel />}
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  width: 21rem;
  padding: 3rem;
  background-color: ${GlobalTheme.colors.white};
  font-size: ${GlobalTheme.fontSize.big};
`;

const Logo = styled.div`
  cursor: pointer;
  margin: 1rem;
  margin-bottom: 5rem;
  font-size: ${GlobalTheme.fontSize.big};
`;

const LogoImg = styled.img`
  width: auto;
`;

const MenuContainer = styled.div`
  width: 100%;
`;

const MenuItem = styled.div`
  margin-bottom: 3rem;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: #848484;
`;

const LoginButton = styled(Link)`
  text-decoration: none;
  margin-bottom: 3rem;
  color: ${GlobalTheme.colors.gray};
`;

export default SidebarComponent;
