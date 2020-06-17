import React from 'react';
import { goToCreate } from '../../history';

import './Business.less';

import { AppBar } from '../../components/AppBar';

export function BusinessPage(props: any) {
    return (
        <div className="bb-pages bb-pages-business">
            <AppBar onClickAddBusiness={() => goToCreate(props.history)} />
            <div className="bb-pages-business__content">
                <h1>Canine Resource Guide</h1>
                <p>Category</p>
                <p>Hashtags</p>

                <div>
                    <button>Share</button>
                    {/* TODO: <button>Save</button> */}
                    <button>Like</button>
                </div>

                <h2>Meet the Owner!</h2>
                <h2>Beth Mitchell</h2>
                <p>This is where the bio about owner would be</p>

                <section>
                    <h2>Female Owned</h2>
                    <p>Whatever they wrote under the female owned section!</p>
                </section>
            </div>
        </div>
    );
}

export interface IBusinessProps {
    business: IBusiness;
}

export interface IBusiness {
    bio: string;
    category: string;
    name: string;
    number: string;
    owners: IOwner[]; // ids;
    tags: string[];
    website: string;
    likes: number;
}

export interface IOwner {
    'last-name': string;
    'first-name': string;
    imageId: string;
    bio: string;
}

export function Business(props: IBusinessProps) {
    const { name, category, tags = [], owners = [] } = props.business;

    const hasMultipleOwners = owners.length > 1;

    <div className="bb-business">
        <h1>{name}</h1>
        <p>{category}</p>
        {tags.map(tag => {
            return <p>{tag}</p>;
        })}

        <div>
            <button>Share</button>
            {/* TODO: <button>Save</button> */}
            <button>Like</button>
        </div>

        <h2>{`Meet the Owner${hasMultipleOwners ? 's' : ''}!`}</h2>
        {owners.map(owner => {
            return <Owner {...owner} />;
        })}

        <section>
            <h2>Female Owned</h2>
            <p>Whatever they wrote under the female owned section!</p>
        </section>
    </div>;
}

export function Owner(props: IOwner) {
    return (
        <div>
            <h2>{`${props['first-name']} ${props['last-name']}`}</h2>
            <p>bio</p>
        </div>
    );
}
