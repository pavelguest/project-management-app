import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import './WelcomePage.css';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

export const WelcomePage = () => {
  return (
    <div className="welcome">
      <h2 className="welcome__title">The project was made by:</h2>
      <div className="welcome__box">
        <div className="welcome__centr">
          <div className="welcome__wrap">
            <Card className="welcome__1" style={{ backgroundColor: 'var(--light-blue)' }}>
              <CardActionArea>
                <CardMedia
                  className="welcome__foto"
                  component="img"
                  image="./pavel2.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Pavel
                  </Typography>
                  <Typography className="welcome__subtitle" variant="body2" color="text.secondary">
                    Team-lead, Drag-and-drop, Board page, create column
                  </Typography>
                  <a href="https://github.com/pavelguest">
                    <GitHubIcon />
                  </a>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card style={{ backgroundColor: 'var(--light-blue)' }} className="welcome__2">
              <CardActionArea>
                <CardMedia
                  className="welcome__foto"
                  component="img"
                  image="./alena_edite.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Alena
                  </Typography>
                  <Typography className="welcome__subtitle" variant="body2" color="text.secondary">
                    Autorization/registration, ability to change the pasword/login, deploy BE,
                    welcome page
                  </Typography>
                  <a href="https://github.com/ElemartA">
                    <GitHubIcon />
                  </a>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card style={{ backgroundColor: 'var(--light-blue)' }} className="welcome__3">
              <CardActionArea>
                <CardMedia
                  className="welcome__foto"
                  component="img"
                  image="./sergei.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Sergei
                  </Typography>
                  <Typography className="welcome__subtitle" variant="body2" color="text.secondary">
                    Create/delete board, Main Page
                  </Typography>
                  <a href="https://github.com/Essonti">
                    <GitHubIcon />
                  </a>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>
      </div>

      <Box className="welcome__box2" sx={{ width: '100%' }}>
        <Typography className="welcome__item" variant="body2" color="text.secondary">
          <DoneOutlineIcon /> This is a web-based, Kanban-style, list-making application.
          <br />
          <DoneOutlineIcon /> This application helps teams move work forward.
          <br />
          <DoneOutlineIcon /> Start with a board, lists, and cards.
          <br />
          <DoneOutlineIcon />
          Customize and expand with more features as your teamwork grows.
          <br />
          <DoneOutlineIcon />
          Manage projects, organize tasks, and build team spirit—all in one place.
        </Typography>
      </Box>
    </div>
  );
};
