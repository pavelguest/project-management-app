import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import './WelcomePage.css';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { FormattedMessage } from 'react-intl';

export const WelcomePage = () => {
  return (
    <div className="welcome">
      <h2 className="welcome__title">
        <FormattedMessage id="project_creators" />
      </h2>
      <div className="welcome__box">
        <div className="welcome__centr">
          <div className="welcome__wrap">
            <Card className="welcome__1" style={{ backgroundColor: 'var(--light-blue)' }}>
              <CardActionArea className="welcome__card-wrapper">
                <CardMedia
                  className="welcome__foto"
                  component="img"
                  image="./pavel2.jpg"
                  alt="green iguana"
                />
                <CardContent className="welcome__card-text-wrapper">
                  <Typography gutterBottom variant="h5" component="div">
                    <FormattedMessage id="first_member_name" />
                  </Typography>
                  <Typography className="welcome__subtitle" variant="body2" color="text.secondary">
                    <FormattedMessage id="first_member_contribution" />
                  </Typography>
                  <a href="https://github.com/pavelguest">
                    <GitHubIcon />
                  </a>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card style={{ backgroundColor: 'var(--light-blue)' }} className="welcome__2">
              <CardActionArea className="welcome__card-wrapper">
                <CardMedia
                  className="welcome__foto"
                  component="img"
                  image="./alena_edite.jpg"
                  alt="green iguana"
                />
                <CardContent className="welcome__card-text-wrapper">
                  <Typography gutterBottom variant="h5" component="div">
                    <FormattedMessage id="second_member_name" />
                  </Typography>
                  <Typography className="welcome__subtitle" variant="body2" color="text.secondary">
                    <FormattedMessage id="second_member_contribution" />
                  </Typography>
                  <a href="https://github.com/ElemartA">
                    <GitHubIcon />
                  </a>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card style={{ backgroundColor: 'var(--light-blue)' }} className="welcome__3">
              <CardActionArea className="welcome__card-wrapper">
                <CardMedia
                  className="welcome__foto"
                  component="img"
                  image="./sergei.jpg"
                  alt="green iguana"
                />
                <CardContent className="welcome__card-text-wrapper">
                  <Typography gutterBottom variant="h5" component="div">
                    <FormattedMessage id="third_member_name" />
                  </Typography>
                  <Typography className="welcome__subtitle" variant="body2" color="text.secondary">
                    <FormattedMessage id="third_member_contribution" />
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
    </div>
  );
};
