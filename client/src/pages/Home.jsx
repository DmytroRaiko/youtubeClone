import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { api } from '../axios';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/videos/${type}`);
      setVideos(res.data);
    })(type);

    return () => {};
  }, [type]);

  return (
    <Container>
      {videos?.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

Home.propTypes = {
  type: PropTypes.string
};

export default Home;
