import * as React from 'react';
import {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Rating } from 'semantic-ui-react';
import testPicture from'../Assets/Images/GrowthCap-Register.jpg';
import { storage, db , auth} from '../Assets/Database/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, getDocs, collection, query, where, onSnapshot, doc } from "firebase/firestore"; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
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
  const [liked, setLiked] = useState(false);
  // const { loading = false } = props;
  const [loading, setLoading] = useState(true);

  const {data} = props;
  const {id} = props;
  const [expanded, setExpanded] = React.useState(false);

  useEffect(()=> {
     setTimeout(()=> {
      setLoading(false);
  }, 1300);
  },[])



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










      // let likeCollectionRef = null;
      let startupCollectionRef = null;

      onAuthStateChanged(auth, (user) => {
        if(user) { 
          
          // likeCollectionRef = collection(db, 'likes', user.uid+'-'+data.id, data.id)
          startupCollectionRef = doc(db, 'startups', data.id);

        }
      });
       
      


      const handleLikeClick = async () => {
        // await addDoc(startupCollectionRef, {likes: '2'});
       
        console.log('Startup liked with startupID: '+ data.id+' & founder: '+data.startupfounder)
        
      }









  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345}}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          ) : (
          <Avatar  src={url} sx={{ bgcolor: purple[500] }} aria-label="recipe">
            GC
          </Avatar>
          )
        }
  
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            data.startupfounder
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            data.postedon

            )
          }
      />
       {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
      <CardMedia
        component="img"
        height="194"
        image={urlStartup}
        alt="startupImage"
      />
      )}
     <CardContent>
     {loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
            {/* <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} /> */}
          </React.Fragment>
        ) : (
          <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          
          <Typography sx={{ marginRight: '10%' }} variant="body2" color="text.secondary">Members: {data.members}</Typography>
          <Typography sx={{ marginRight: '10%' }} variant="body2" color="text.secondary">ROI: {data.roi}</Typography>
          <Typography variant="body2" color="text.secondary">Field: {data.industry}</Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', marginTop:'-0.6rem' }}>
          
        <Typography sx={{ marginRight: '5%' }} variant="body2" color="text.secondary">Equity offered: {data.equity}</Typography>
          <Typography sx={{ marginRight: '0%' }} variant="body2" color="text.secondary">At amount: {data.amount}</Typography>
          
        </div>
        
        <Typography variant="body1" color="text.primary">
          {data.startupdesc}
        </Typography>
        </div>

)}
    </CardContent>
    <CardActions disableSpacing>
      <div className="ui heart rating large-heart-rating" data-rating='0' data-max-rating="1" onClick={handleLikeClick}>
        <Rating icon="heart" defaultRating={liked ? "1" : "0"} maxRating={1} />
      </div>
      <Typography sx={{ marginRight: '10%' }} variant="body1" color="text.primary">{data.likes}</Typography>
      <Button sx={{marginLeft: '50%'}}size="small">More Info.</Button>
    </CardActions>

  
    {/* <CardActions disableSpacing >
      <div class="ui heart rating large-heart-rating" data-rating="0" data-max-rating="1">
        <Rating icon="heart" defaultRating={1} maxRating={1} />
      </div>
      <Button sx={{marginLeft: '65%'}}size="small">More Info.</Button>
    </CardActions> */}
    </Card>
  );
}