import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import './WelcomePage.css';

export const WelcomePage = () => {
  return (
    <div className="welcome">
      <div className="welcome__wrap">
        <Card className="welcome__1" sx={{ maxWidth: 250 }}>
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
        <Card className="welcome__2" sx={{ maxWidth: 250 }}>
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
        <Card className="welcome__3" sx={{ maxWidth: 250 }}>
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
    </div>
  );
};
