import React from 'react';
import { Avatar } from '@mui/material';
import defaultAvatar from '@assets/icons/default-avatar.png';

const ProfileAvatar = ({ src, alt = 'Аватар пользователя' }) => (
  <Avatar
    alt={alt}
    src={src || defaultAvatar}
    sx={{
      width: 150,
      height: 150,
      border: '2px solid #e0e0e0',
      '@media (max-width: 768px)': { width: 120, height: 120 },
    }}
  />
);

export default ProfileAvatar;