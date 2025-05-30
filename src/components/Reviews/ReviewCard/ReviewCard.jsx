import { Card, CardContent, Typography, Box, Avatar, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import defaultAvatar from '@assets/icons/default-avatar.svg';

export default ({ review }) => {
  return (
    <Card
      sx={{
        maxWidth: 'auto',
        width: '100%',
        padding: 2,
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar
            src={defaultAvatar}
            alt="avatar"
            sx={{ width: 48, height: 48 }}
          />
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Rating
                value={review.rating}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              <Typography variant="body2" color="text.secondary">
                {review.rating.toFixed(1)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography variant="body1" color="text.primary" paragraph>
          {review.text}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date().toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};