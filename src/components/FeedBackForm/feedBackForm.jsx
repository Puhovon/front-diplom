import React, { useState } from 'react';
import { Box, Rating, TextField, Button, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

   const  handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ rating, review });
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="success.main">
          Спасибо за ваш отзыв!
        </Typography>
        <Button 
          variant="outlined" 
          sx={{ mt: 2 }}
          onClick={() => {
            setSubmitted(false);
            setRating(0);
            setReview('');
          }}
        >
          Оставить новый отзыв
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Оставьте отзыв
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Rating
          name="rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          precision={0.5}
          size="large"
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Typography sx={{ ml: 2 }}>{rating.toFixed(1)}</Typography>
      </Box>
      
      <TextField
        label="Ваш отзыв"
        multiline
        rows={4}
        fullWidth
        value={review}
        onChange={(e) => setReview(e.target.value)}
        sx={{ mb: 2 }}
      />
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!rating}
      >
        Отправить отзыв
      </Button>
    </Box>
  );
};

export default FeedbackForm;