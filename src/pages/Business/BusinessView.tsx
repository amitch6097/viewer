import React from 'react';
import './BusinessView.less';

import { Listing } from '../../components/Listing';
import { AppBar } from '../../components/AppBar';
import { Footer } from '../../components/Footer';

export function BusinessView({ business }) {
    return (
        <div className="bb-pages bb-pages-business">
            <Listing isEditable={false} business={business} />
        </div>
    );
}
