import React, { useEffect, useState } from 'react';
import { api } from '../axios';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    (async () => {
      const res = await api.get(`/videos/search${query}`);

      setVideos(res.data);
    })();
  }, [query]);

  return (
    <Container>
      {videos?.map((video) => (
        <Card video={video} key={video._id} />
      ))}
    </Container>
  );
};

export default Search;
