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
      <Parallax pages={2.2} style={{ top: '0', left: '0' }}>
        <ParallaxLayer
          offset={0}
          speed={0.8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--peach)',
          }}
        >
          <CardMedia
            className="welcome__mainfoto"
            component="img"
            image="./pngegg1.png"
            alt="green iguana"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0.4} speed={1.5} style={{ opacity: 0.7 }}>
          <CardMedia
            component="img"
            image="./pngegg41.png"
            style={{ display: 'block', width: '20%', marginLeft: '75%' }}
            alt="green iguana"
          />
          <CardMedia
            component="img"
            image="./sumo.png"
            style={{ display: 'block', width: '15%', marginLeft: '10%' }}
            alt="green iguana"
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={2}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'var(--light-blue)',
          }}
        >
          <h2 className="welcome__title">
            <FormattedMessage id="project_about" />
          </h2>
          <Box className="welcome__box2" sx={{ width: '100%' }}>
            <Typography className="welcome__item" variant="body2" color="text.secondary">
              <DoneOutlineIcon /> <FormattedMessage id="app_feature_1" />
              <br />
              <DoneOutlineIcon /> <FormattedMessage id="app_feature_2" />
              <br />
              <DoneOutlineIcon /> <FormattedMessage id="app_feature_3" />
              <br />
              <DoneOutlineIcon /> <FormattedMessage id="app_feature_4" />
              <br />
              <DoneOutlineIcon /> <FormattedMessage id="app_feature_5" />
            </Typography>
          </Box>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.8 }}>
          <CardMedia
            component="img"
            image="./sumo2.png"
            style={{
              display: 'block',
              width: '25%',
              marginLeft: '69%',
            }}
            alt="green iguana"
          />
          <CardMedia
            component="img"
            image="./sumo3.png"
            style={{ display: 'block', width: '10%', marginLeft: '15%' }}
            alt="green iguana"
          />
        </ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: 1.85, end: 1.85 }}
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
                  <CardActionArea className="welcome__card-wrapper">
                    <CardMedia
                      className="welcome__foto"
                      component="img"
                      image="./Pavel2-round.png"
                      alt="green iguana"
                    />
                    <CardContent className="welcome__card-text-wrapper">
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
                      <a href="https://github.com/pavelguest" target="_blank" rel="noreferrer">
                        <GitHubIcon />
                      </a>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Card className="welcome__2">
                  <CardActionArea className="welcome__card-wrapper">
                    <CardMedia
                      className="welcome__foto"
                      component="img"
                      image="./alena_edite-round.png"
                      alt="green iguana"
                    />
                    <CardContent className="welcome__card-text-wrapper">
                      <Typography gutterBottom variant="h5" component="div">
                        <FormattedMessage id="second_member_name" />
                      </Typography>
                      <Typography
                        className="welcome__subtitle"
                        variant="body2"
                        color="text.secondary"
                      >
                        <FormattedMessage id="second_member_contribution" />
                      </Typography>
                      <a href="https://github.com/ElemartA" target="_blank" rel="noreferrer">
                        <GitHubIcon />
                      </a>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Card className="welcome__3">
                  <CardActionArea className="welcome__card-wrapper">
                    <CardMedia
                      className="welcome__foto"
                      component="img"
                      image="./sergei-round.png"
                      alt="green iguana"
                    />
                    <CardContent className="welcome__card-text-wrapper">
                      <Typography gutterBottom variant="h5" component="div">
                        <FormattedMessage id="third_member_name" />
                      </Typography>
                      <Typography
                        className="welcome__subtitle"
                        variant="body2"
                        color="text.secondary"
                      >
                        <FormattedMessage id="third_member_contribution" />
                      </Typography>
                      <a href="https://github.com/Essonti" target="_blank" rel="noreferrer">
                        <GitHubIcon />
                      </a>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </div>
          </div>
          <CardMedia
            component="img"
            image="./pngegg47.png"
            style={{
              display: 'block',
              width: '35%',
              marginLeft: '65%',
              marginTop: -350,
            }}
            alt="green iguana"
          />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};
