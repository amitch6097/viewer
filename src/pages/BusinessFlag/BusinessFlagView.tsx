import { Container, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { CreateFlag } from 'src/components/Flag/CreateFlag';
import { IFlagDocument } from 'typings/documents';
import { strings } from '../../strings';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 'var(--page-height)',
        paddingTop: 'var(--page-padding)',
        paddingBottom: 'var(--page-padding)',
    },
    businessLink: {
        fontSize: theme.typography.h3.fontSize,
    },
}));

export interface IBusinessFlagViewProps {
    onSubmit: (flag: { type: IFlagDocument['type']; text: string }) => void;
    businessName: string;
    businessId: string;
}

export function BusinessFlagView(props: IBusinessFlagViewProps) {
    const classes = useStyles(props);
    return (
        <Container className={classes.root}>
            <Link
                className={classes.businessLink}
                href={`/business/${props.businessId}`}
            >
                {' '}
                {props.businessName}
            </Link>
            <CreateFlag
                onSubmit={props.onSubmit}
                submitText={strings.flag.submitButton}
                placeholder={strings.flag.textPlaceholder}
            />
        </Container>
    );
}
