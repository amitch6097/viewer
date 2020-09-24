import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { IBusiness } from '../../../typings/base';
import Rating from '@material-ui/lab/Rating';

export interface IFavoriteBusinessResultProps {
    business: IBusiness;
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        boxShadow: 'none'
    },
    cardMedia: {
        height: '100px',
        width: '100px',
        alignSelf: 'center',
    },
});

export function FavoriteBusinessResult(props: IFavoriteBusinessResultProps) {
    const classes = useStyles(props);

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cardMedia}
                image={
                    props.business.imageURL ??
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Florida_Box_Turtle_Digon3_re-edited.jpg/440px-Florida_Box_Turtle_Digon3_re-edited.jpg'
                }
                title=""
            />
            <CardContent>
                <Typography component="h5" variant="h5">
                    {props.business.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {props.business.locationLabel}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <Rating
                        precision={0.25}
                        name="simple-controlled"
                        value={props.business.reviewsAverage}
                        readOnly
                    />
                    {props.business.reviewsLength}
                </Typography>
            </CardContent>
        </Card>
    );
}
