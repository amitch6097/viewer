import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { goToCreate } from '../../history';
import './Home.less';

import { AppBar } from '../../components/AppBar';
import { ListItem } from '../../components/ListItem';
import { Filter } from '../../components/Filter';
import { SearchInput } from '../../components/SearchInput';
import { Search } from '../../components/Search';

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

export function Home(props: any) {
    const data = new Array(5).fill(undefined);
    return (
        <div className="bb-pages bb-pages-home">
            <Search />
            <InstantSearch indexName="common-good" searchClient={searchClient}>
                {/* <div className="left-panel">
                    <ClearRefinements />
                    <h2>Brands</h2>
                    <RefinementList attribute="brand" />
                    <Configure hitsPerPage={8} />
                </div> */}
                <div className="right-panel">
                    <SearchBox />
                    <Hits hitComponent={Hit} />
                    <Pagination />
                </div>
            </InstantSearch>

            <div className="bb-pages-home__content">
                <Filter />
                {data.map(() => {
                    return <ListItem />;
                })}
            </div>
        </div>
    );
}

function Hit(props) {
    console.log(props);
    return <div>Text</div>;
}
