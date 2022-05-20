import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import './WelcomePage.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const WelcomePage = () => {
  return (
    <div className="welcome">
      <h2 className="welcome__title">The project was made by:</h2>
      <div className="welcome__wrap">
        <Card
          className="welcome__1"
          style={{ backgroundColor: 'var(--light-blue)' }}
          sx={{ maxWidth: 250 }}
        >
          <CardActionArea>
            <CardMedia component="img" height="240" image="./pavel2.jpg" alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Pavel
              </Typography>
              <Typography style={{ height: 60 }} variant="body2" color="text.secondary">
                Team-lead, Drag-and-drop, Board page, create column
              </Typography>
              <a href="https://github.com/pavelguest">
                <GitHubIcon />
              </a>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          style={{ backgroundColor: 'var(--light-blue)' }}
          className="welcome__2"
          sx={{ maxWidth: 250 }}
        >
          <CardActionArea>
            <CardMedia component="img" height="240" image="./alena_edite.jpg" alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Alena
              </Typography>
              <Typography style={{ height: 60 }} variant="body2" color="text.secondary">
                Autorization/registration, ability to change the pasword/login, deploy BE, welcome
                page
              </Typography>
              <a href="https://github.com/ElemartA">
                <GitHubIcon />
              </a>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          style={{ backgroundColor: 'var(--light-blue)' }}
          className="welcome__3"
          sx={{ maxWidth: 250 }}
        >
          <CardActionArea>
            <CardMedia component="img" height="250" image="./sergei.jpg" alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Sergei
              </Typography>
              <Typography style={{ height: 60 }} variant="body2" color="text.secondary">
                Create/delete board, Main Page
              </Typography>
              <a href="https://github.com/Essonti">
                <GitHubIcon />
              </a>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <Box className="welcome__box" sx={{ width: '100%' }}>
        <Stack spacing={2}>
          <Item className="welcome__item" style={{ fontSize: 17, backgroundColor: 'var(--beige)' }}>
            This is a web-based, Kanban-style, list-making application
          </Item>
          <Item className="welcome__item" style={{ fontSize: 17, backgroundColor: 'var(--beige)' }}>
            This application helps teams move work forward
          </Item>
          <Item className="welcome__item" style={{ fontSize: 17, backgroundColor: 'var(--beige)' }}>
            Start with a board, lists, and cards. Customize and expand with more features as your
            teamwork grows. Manage projects, organize tasks, and build team spirit—all in one place.
          </Item>
        </Stack>
      </Box>
    </div>
  );
};
