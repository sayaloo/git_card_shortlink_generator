import React from 'react';
import Img from 'next/image';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';

import { CardContainer } from './style';


import { Repository } from '../../interfaces';

const GitCard = ({ color, repository }: { color: string, repository: Repository }) => {
  return (
    <CardContainer color={color}>
      <Card>
        <CardHeader
          avatar={ <Img src={repository.avatar} alt="avatar" width="50px" height="50px" className="avatar"/>}
          title={repository.repo}
          className="card-header"
          action={
            <div aria-label="stars" className="stars-wrp">
              <StarTwoToneIcon/>
              <Typography variant="subtitle1" color="textPrimary">{repository.stars}</Typography>
            </div>
          }
        />
        <CardContent className="card-content">
          <Typography variant="body2" color="textSecondary" component="p" className="desc">
            {repository.description}
          </Typography>
          <br/>
          <Typography variant="subtitle2" color="textSecondary" component="span">
            Top Contributors:
          </Typography>
          <div className="contributor-cnt">
            {
              repository.contributors.map((c, i) => {
                return (
                  <span key={i} className="contributor">
                  {c}
                </span>
                );
              })
            }
          </div>
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default GitCard;