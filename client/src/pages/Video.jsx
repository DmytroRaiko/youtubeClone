import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import Comments from '../components/Comments';
import { useParams } from 'react-router-dom';
import { api } from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { dislike, fetchStart, fetchSuccess, like } from '../redux/videoSlice';
import { subscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.div`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Descriptions = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  text-transform: capitalize;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { currentVideo, isLoading } = useSelector((state) => state.video);
  const { currentUser } = useSelector((state) => state.user);
  const [channel, setChannel] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(fetchStart());
      const videoRes = await api.get(`/videos/find/${id}`);
      const channelRes = await api.get(`/users/find/${videoRes.data.userId}`);

      setChannel(channelRes?.data);
      dispatch(fetchSuccess(videoRes.data));
    })();
  }, [id, dispatch]);

  const handleLikeFn = async () => {
    await api.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDislikeFn = async () => {
    await api.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await api.put(`/users/unsub/${channel._id}`)
      : await api.put(`/users/sub/${channel._id}`);
    dispatch(subscription(currentUser._id));
  };

  return (
    <Container>
      {isLoading && <div> loading... </div>}
      {currentVideo?._id && (
        <Content>
          <VideoWrapper>
            <VideoFrame src={currentVideo?.videoUrl} controls />
          </VideoWrapper>

          <Title>{currentVideo?.title}</Title>

          <Details>
            <Info>
              {currentVideo?.views} views * {currentVideo?.createdAt}
            </Info>

            <Buttons>
              <Button onClick={handleLikeFn}>
                {currentVideo?.likes?.includes(currentUser?._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpAltOutlinedIcon />
                )}{' '}
                {currentVideo?.likes?.length}
              </Button>

              <Button onClick={handleDislikeFn}>
                {currentVideo?.dislikes?.includes(currentUser._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownAltOutlinedIcon />
                )}{' '}
                {currentVideo?.dislikes?.length}
              </Button>

              <Button>
                <ReplyOutlinedIcon /> Share
              </Button>

              <Button>
                <SaveAltOutlinedIcon /> Save
              </Button>
            </Buttons>
          </Details>
          <Hr />

          <Channel>
            <ChannelInfo>
              <Image src={channel.img} />

              <ChannelDetails>
                <ChannelName>{channel.name}</ChannelName>
                <ChannelCounter>{channel.subscribers?.length}</ChannelCounter>
                <Descriptions>{currentVideo?.desc}</Descriptions>
              </ChannelDetails>
            </ChannelInfo>

            {channel._id !== currentUser._id && (
              <Subscribe onClick={handleSub}>
                {currentUser.subscribedUsers?.includes(channel._id) ? 'Subscribed' : 'Subscribe'}
              </Subscribe>
            )}
          </Channel>

          <Hr />

          <Comments videoId={id} />
        </Content>
      )}
      <Recommendation tags={currentVideo?.tags || ''} />
    </Container>
  );
};

export default Video;
