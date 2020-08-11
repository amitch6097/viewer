import React from 'react';
import { EIdentify } from '../../typings/types';
import { Result } from '../../src/components/Result';

export default {
    title: 'Result',
    component: Result,
};

export const Main = () => (
    <Result
        onClick={console.log}
        business={{
            image:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Florida_Box_Turtle_Digon3_re-edited.jpg/440px-Florida_Box_Turtle_Digon3_re-edited.jpg',
            guid: '1',
            name: 'Hungry Howie’s Pizza',
            category: 'Restaurant',
            phone: '(123) 456 780',
            email: 'pizza@pizza.com',
            address: {
                name: '343 Pizza Ave',
            },
            website: 'pizza.com',
            identify: {
                [EIdentify.FEMALE]: {
                    selected: true,
                },
                [EIdentify.MINORITY]: {
                    selected: true,
                },
            },
            about: `                            Hungry Howie's Pizza Claimed 21 reviews $ PizzaEdit
    Open10:30 AM - 11:00 PM Hours updated 2 months ago
    COVID-19 Updates "We know that you're concerned
    about COVID-19. We are too. Hungry Howie's has been
    making pizza for our customers for almost 50 years.
    The health and safety of our customers has always
    been our top priority. During this pandemic, we are
    even more concerned. Visit our websi`,
        }}
    />
);
