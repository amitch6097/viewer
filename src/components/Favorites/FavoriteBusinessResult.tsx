import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { IBusinessListing } from '../../../typings/types';
import { Grid } from '@material-ui/core';
import { Rating } from '../Rating/Rating';

export interface IFavoriteBusinessResultProps {
    business: IBusinessListing;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
            boxShadow: 'none',
            overflow: 'unset'
        },
        cardMedia: {
            height: '100px',
            width: '100px',
            alignSelf: 'center',
        },
        ratingCount: {
            marginLeft: theme.spacing(1),
        },
    })
);

export function FavoriteBusinessResult(props: IFavoriteBusinessResultProps) {
    const classes = useStyles(props);

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cardMedia}
                image={
                    props.business?.image?.url ??
                    'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814055__340.png'                }
                title=""
            />
            <CardContent>
                <Typography component="h5" variant="h5">
                    {props.business.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {props.business?.address?.name || props.business?.website || ''}
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Rating
                        average={props.business.averageReview}
                        reviewCount={props.business.reviewCount}
                    />
                </Grid>
            </CardContent>
        </Card>
    );
}
