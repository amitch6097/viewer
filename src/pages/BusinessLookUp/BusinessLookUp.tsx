import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { goToCreate } from '../../history';

import './BusinessLookUp.less';

import { AppBar } from '../../components/AppBar';
import { ListItem } from '../../components/ListItem';
import { Filter } from '../../components/Filter';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

import {
    InstantSearch,
    Hits,
    SearchBox,
    Pagination,
    Highlight,
    ClearRefinements,
    RefinementList,
    Configure,
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
    'MQBBVGG94P',
    'd68c847f05c3ef5ddce1b1890080a35b'
);

export interface IBusinessLookUp {
    continueButtonLabel: string;
    onClickContinueButton: () => void;
}

export function BusinessLookUp(props: any) {
    return (
        <div className="bb-pages bb-business-lookup">
            <AppBar onClickAddBusiness={() => goToCreate(props.history)} />
            <InstantSearch indexName="common-good" searchClient={searchClient}>
                <SearchBox />
            </InstantSearch>
            <Button
                onClick={props.onClickContinueButton}
                variant="contained"
                color="primary"
            >
                {props.continueButtonLabel}
            </Button>
        </div>
    );
}
