import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { api } from '../axios';

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  margin-left: 5px;
  color: ${({ theme }) => theme.textSoft};
`;

const Text = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Comment = ({ comment }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    (async () => {
      const res = await api.get(`/users/find/${comment.userId}`);

      setAuthor(res.data);
    })();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={author.img} />
      <Details>
        <Name>
          {author.name} <Date>{comment?.createdAt}</Date>
        </Name>

        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    userId: PropTypes.string,
    videoId: PropTypes.string,
    desc: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired
};

export default Comment;
