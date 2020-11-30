import { Container, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { CreateFlag } from 'src/components/Flag/CreateFlag';
import { IBusinessFlag } from 'src/lib/BusinessFlag';
import { IFlagDocument } from 'typings/documents';
import { strings } from '../../strings';
import { Flag } from '../../components/Flag/Flag';
const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 'var(--page-height)',
        paddingTop: 'var(--page-padding)',
        paddingBottom: 'var(--page-padding)',
    },
    businessLink: {
        fontSize: theme.typography.h3.fontSize,
    },
    flagList: {
        listStyleType: 'none',
        padding: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 600px))',
        gridRowGap: theme.spacing(1)
    },
    flag: {

    }
}));

export interface IBusinessFlagsViewProps {
    flags: IBusinessFlag[];
    businessName: string;
    businessId: string;
    onDeleteFlag: (flagId: string) => void;
}

export function BusinessFlagsView(props: IBusinessFlagsViewProps) {
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
            {props.flags && (
                <ul className={classes.flagList}>
                    {props.flags.map((flag) => {
                        return (
                            <li className={classes.flag}>
                                <Flag
                                    flag={flag}
                                    onDelete={() => props.onDeleteFlag(flag.id)}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </Container>
    );
}
