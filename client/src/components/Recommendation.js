import React, { useEffect, useState } from 'react';
import { api } from '../axios';
import Card from './Card';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/videos/tags?tags=${tags}`);

      setVideos(res.data);
    })();
  }, [tags]);

  return (
    <Container>
      {videos?.map((video) => (
        <Card key={video._id} video={video} type="sm" />
      ))}
    </Container>
  );
};

Recommendation.propTypes = {
  tags: PropTypes.string
};

export default Recommendation;
