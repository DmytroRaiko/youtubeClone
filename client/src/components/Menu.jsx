import React from 'react';
import styled from 'styled-components';
import imageLogo from '../img/logo.png';
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../redux/userSlice';

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.75px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ themeMode, setThemeMode }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const changeTheme = () => {
    setThemeMode((prev) => !prev);
  };

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Logo>
            <Img src={imageLogo} />
            Youtube
          </Logo>
        </Link>

        <Item>
          <HomeIcon />
          Home
        </Item>

        <Link to="/trends" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>

        <Link to="/subscriptions" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>

        <Hr />

        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>

        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>

        <Hr />

        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="/sign-in" style={{ textDecoration: 'none' }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}

        <Title>BEST OF YOUTUBE</Title>

        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>

        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>

        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>

        <Item>
          <MovieCreationOutlinedIcon />
          Movies
        </Item>

        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>

        <Hr />

        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>

        <Item>
          <OutlinedFlagIcon />
          Report
        </Item>

        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>

        <Item onClick={changeTheme}>
          <SettingsBrightnessOutlinedIcon />
          {themeMode ? 'Dark' : 'Light'} Mode
        </Item>

        {currentUser && <Item onClick={() => dispatch(logout())}>Log out</Item>}
      </Wrapper>
    </Container>
  );
};

Menu.propTypes = {
  themeMode: PropTypes.bool,
  setThemeMode: PropTypes.func
};

export default Menu;
