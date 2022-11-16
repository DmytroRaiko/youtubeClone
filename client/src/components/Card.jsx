import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { format } from 'timeago.js';
import { api } from '../axios';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: ${(props) => props.type !== 'sm' && '360px'};
  margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '5px')};
  cursor: pointer;
  display: ${(props) => props.type === 'sm' && 'flex'};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === 'sm' ? '100px' : '202px')};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== 'sm' && '16px'};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === 'sm' && 'none'};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 6px 0;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    (async () => {
      const res = await api.get(`/users/find/${video?.userId}`);
      setAuthor(res.data);
    })();
  }, [video?.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />

        <Details type={type}>
          <ChannelImage type={type} src={author.img} />

          <Texts>
            <Title>{video.title}</Title>

            <ChannelName>{author.name}</ChannelName>
            <Info>
              {video.views} views * {video.createdAt}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

Card.propTypes = {
  type: PropTypes.string,
  video: PropTypes.shape({
    imgUrl: PropTypes.string,
    userId: PropTypes.string,
    _id: PropTypes.string,
    title: PropTypes.string,
    views: PropTypes.number,
    createdAt: PropTypes.string
  }).isRequired
};

export default Card;
