import * as React from 'react';
import {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { purple } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Rating } from 'semantic-ui-react';
import testPicture from'../Assets/Images/GrowthCap-Register.jpg';
import { storage, db , auth} from '../Assets/Database/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './startupcard.css';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// let user = JSON.parse(localStorage.getItem('user'));
// if (!user) {
 
//   user = auth.currentUser;
//   localStorage.setItem('user', JSON.stringify(user));
// }

export default function StartupCard(props) {

  const {data} = props;
  const [expanded, setExpanded] = React.useState(false);



  const [url, setUrl] = useState(null);
  const [urlStartup, setUrlStartup] = useState(null);
    useEffect(() => {
   
        
        const imageRef = ref(storage, data.founderuid + '/profilepicture');
    
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.error('Failed to retrieve profile picture:', error);
          });
      }, []);

      useEffect(() => {
   
        
        const startupImageRef = ref(storage, data.founderuid + '/startupimage');
    
        getDownloadURL(startupImageRef)
          .then((urlStartup) => {
            setUrlStartup(urlStartup);
          })
          .catch((error) => {
            console.error('Failed to retrieve profile picture:', error);
          });
      }, []);







  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345}}>
      <CardHeader
        avatar={
          <Avatar  src={url} sx={{ bgcolor: purple[500] }} aria-label="recipe">
            GC
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.startupfounder}
        subheader={data.postedon}
      />
      <CardMedia
        component="img"
        height="194"
        image={urlStartup}
        alt="startupImage"
      />
     <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <Typography sx={{ marginRight: '20%' }} variant="body2" color="text.secondary">Members: {data.members}</Typography>
          <Typography variant="body2" color="text.secondary">Field: {data.industry}</Typography>
        </div>
        <Typography variant="body1" color="text.primary">
          {data.startupdesc}
        </Typography>
    </CardContent>


  
    <CardActions disableSpacing >
      <div class="ui heart rating large-heart-rating" data-rating="0" data-max-rating="1">
        <Rating icon="heart" defaultRating={0} maxRating={1} />
      </div>
    </CardActions>
    </Card>
  );
}