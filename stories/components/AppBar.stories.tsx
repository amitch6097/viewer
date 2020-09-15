import React from 'react';
import { AppBar } from '../../src/components/AppBar/AppBar';
import { Search } from '../../src/components/Search';

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

export default {
    title: 'Components|AppBar',
    component: AppBar,
    decorators: [withKnobs],
};

export const AppBarWithUserStory = () => (
    <AppBar user={{} as any} history={{} as any} />
);

export const AppBarWithoutUserStory = () => (
    <AppBar user={undefined} history={{} as any} />
);

export const AppBarWithSearchStory = () => (
    <div style={{ height: '800px', display: 'flex', flexDirection: 'column'}}>
        <AppBar
            user={undefined}
            history={{} as any}
            searchComponent={
                <Search
                    onSearch={console.log}
                    onChangeBusiness={console.log}
                    onChangeLocationSuggestion={console.log}
                    onChangeLocationValue={console.log}
                    locationValue={text('locationValue', 'location')}
                    businessValue={text('businessValue', 'business')}
                />
            }
        />
        <div
            style={{
                flex: 1,
                backgroundColor: 'light-grey',
            }}
        >
            Content
        </div>
    </div>
);
