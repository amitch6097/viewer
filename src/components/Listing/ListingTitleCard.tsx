import React from 'react';
import {
    Theme,
    createStyles,
    makeStyles,
    useTheme,
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CreateIcon from '@material-ui/icons/Create';

import { IBusinessListing } from '../../../typings/types';
import { strings } from '../../strings';
import { config } from '../../config';

export interface IListingProps {
    business: IBusinessListing;
    isEditable?: boolean;
    id: string;
    isFavorited?: boolean;
    onChangeAbout?: (about: string) => void;
    onToggleFavorite?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            boxShadow: 'none',
            height: 300,
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {},
        cover: {
            backgroundSize: 'contain',
            width: 300,
            height: 300,
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        button: {
            margin: theme.spacing(1),
        },
        heading: {
            fontWeight: 700,
        },
    })
);
export function ListingTitleCard(props: IListingProps) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Card raised={false} className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={props.business.image.url}
                title={props.business.name}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography
                        className={classes.heading}
                        component="h3"
                        variant="h3"
                    >
                        {props.business.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {strings.categories[props.business.category]}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <Link href={`#/business/${props.id}/new-review`}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<CreateIcon />}
                    >
                        Write a Review
                    </Button>
                    </Link>

                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<ShareIcon />}
                    >
                        Share
                    </Button>
                    <Button
                        onClick={props.onToggleFavorite}
                        variant="contained"
                        color={props.isFavorited ? "secondary" : 'primary'}
                        className={classes.button}
                        startIcon={<BookmarkBorderIcon />}
                    >
                        {props.isFavorited ? 'Unfavorite' : 'Favorite'}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
