import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import PropTypes from 'prop-types';
import { api } from '../axios';
import { useSelector } from 'react-redux';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.textSoft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/comments/${videoId}`);

      setComments(res.data);
    })();
  }, [videoId]);

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input placeholder="Add a comment..." />
      </NewComment>

      {comments?.map((comment) => (
        <Comment comment={comment} key={comment._id} />
      ))}
    </Container>
  );
};

Comments.propTypes = {
  videoId: PropTypes.string.isRequired
};

export default Comments;
