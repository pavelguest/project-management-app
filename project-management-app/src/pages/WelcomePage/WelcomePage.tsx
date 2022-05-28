import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import './WelcomePage.css';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { FormattedMessage } from 'react-intl';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

export const WelcomePage = () => {
  return (
    <div className="welcome">
      <Parallax pages={4} style={{ top: '0', left: '0' }}>
        <ParallaxLayer
          offset={0}
          speed={1}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <CardMedia
            className="welcome__mainfoto"
            component="img"
            image="./pngegg3.png"
            alt="green iguana"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0.8} speed={1.5} style={{ opacity: 0.5 }}>
          <CardMedia
            component="img"
            image="./pngegg10.png"
            style={{ display: 'block', width: '20%', marginLeft: '75%' }}
            alt="green iguana"
          />
          <CardMedia
            component="img"
            image="./pngegg11.png"
            style={{ display: 'block', width: '10%', marginLeft: '10%' }}
            alt="green iguana"
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.5}
          speed={2}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'var(--light-blue)',
          }}
        >
          <h2 className="welcome__title">О проекте</h2>
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
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.7 }}>
          <CardMedia
            component="img"
            image="./pngegg8.png"
            style={{
              display: 'block',
              width: '20%',
              marginLeft: '55%',
            }}
            alt="green iguana"
          />
          <CardMedia
            component="img"
            image="./pngegg8.png"
            style={{ display: 'block', width: '10%', marginLeft: '15%' }}
            alt="green iguana"
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.5}
          speed={1.5}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'var(--beige)',
          }}
        >
          <h2 className="welcome__title2">
            <FormattedMessage id="project_creators" />
          </h2>
          <div className="welcome__box">
            <div className="welcome__centr">
              <div className="welcome__wrap">
                <Card className="welcome__1">
                  <CardActionArea>
                    <CardMedia
                      className="welcome__foto"
                      component="img"
                      image="./Pavel2-round.png"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        <FormattedMessage id="first_member_name" />
                      </Typography>
                      <Typography
                        className="welcome__subtitle"
                        variant="body2"
                        color="text.secondary"
                      >
                        <FormattedMessage id="first_member_contribution" />
                      </Typography>
                      <a href="https://github.com/pavelguest">
                        <GitHubIcon />
                      </a>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Card className="welcome__2">
                  <CardActionArea>
                    <CardMedia
                      className="welcome__foto"
                      component="img"
                      image="./alena_edite-round.png"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Alena
                      </Typography>
                      <Typography
                        className="welcome__subtitle"
                        variant="body2"
                        color="text.secondary"
                      >
                        Autorization/registration, ability to change the pasword/login, deploy BE,
                        welcome page
                      </Typography>
                      <a href="https://github.com/ElemartA">
                        <GitHubIcon />
                      </a>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Card className="welcome__3">
                  <CardActionArea>
                    <CardMedia
                      className="welcome__foto"
                      component="img"
                      image="./sergei-round.png"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Sergei
                      </Typography>
                      <Typography
                        className="welcome__subtitle"
                        variant="body2"
                        color="text.secondary"
                      >
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
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};
