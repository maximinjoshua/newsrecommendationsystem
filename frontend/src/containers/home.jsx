import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, Container, Link } from '@mui/material';
import { get, post } from '../services/apiClient';

function HomePage() {

  const [articles, setArticles] = useState([])
  const [username, setUsername] = useState('maximin0')

  const updatePreferences = async (article_id) => {
    try {
      const result = await post(`/updatepref`, {username: username, article_id: article_id})
    } catch (error) {
      console.error(error)
      alert('Update failed. Please try again.');
    }
  };

  const loadArticles = async (article_id) => {
    try {
      const username = 'maximin0'
      const result = await get(`/fetchuserarticles?username=${username}`);
      setArticles(result)
    } catch (error) {
      console.error(error)
      alert('Fetch failed. Please try again.');
    }
  };


  useEffect(() => {
    loadArticles()
  }, [])

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Top News recommendations for user: {username}
      </Typography>

      <Grid container spacing={4} direction={"row"}>
        {articles && articles.map((news, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{maxWidth:"350px", maxHeight:"300px"}}>
            <Card
              variant="outlined"
              sx={{
                height: 220,
                border: '1px solid #ccc',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {news.headline}
                </Typography>
                <Link href={news.url} onClick={()=>updatePreferences(news.id)} target="_blank" rel="noopener" variant="body2" color="primary">
                  Read more
                </Link>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {news.authors}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  category: {news.category}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {news.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
