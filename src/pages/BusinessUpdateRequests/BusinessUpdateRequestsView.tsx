import { Container, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IBusinessUpdateRequest } from 'src/lib/BusinessUpdateRequest';
import { Flag } from '../../components/Flag/Flag';
import { UpdateRequest } from './UpdateRequest';

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
        gridRowGap: theme.spacing(1),
    },
    flag: {},
}));

export interface IBusinessFlagsViewProps {
    updateRequests: IBusinessUpdateRequest[];
    businessName: string;
    businessId: string;
    onDelete: (updateRequestId: string) => void;
    onAccept: (updateRequestId: string) => void;
}

export function BusinessUpdateRequestsView(props: IBusinessFlagsViewProps) {
    const classes = useStyles(props);
    return (
        <Container className={classes.root}>
            <Link
                className={classes.businessLink}
                href={`/business/${props.businessId}`}
            >
                {props.businessName}
            </Link>
            {props.updateRequests && (
                <ul className={classes.flagList}>
                    {props.updateRequests.map((updateRequest) => {
                        return (
                            <li className={classes.flag}>
                                <UpdateRequest
                                    updateRequest={updateRequest}
                                    onDelete={() =>
                                        props.onDelete(updateRequest.id)
                                    }
                                    onAccept={() =>
                                        props.onAccept(updateRequest.id)
                                    }
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </Container>
    );
}
