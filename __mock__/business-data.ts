import { EIdentify, IBusinessListing } from '../typings/types';
import { IAlgoliaLocationSearchEventSuggestion } from '../typings/algolia';

export const BUSINESS_DATA: IBusinessListing = {
    image: {
        url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Florida_Box_Turtle_Digon3_re-edited.jpg/440px-Florida_Box_Turtle_Digon3_re-edited.jpg',
        id: '1',
    },
    guid: '1',
    name: 'Hungry Howie’s Pizza',
    category: 'restaurant',
    phone: '(123) 456 780',
    email: 'pizza@pizza.com',
    address: {
        name: '343 Pizza Ave',
        latlng: {
            lat: 42.4799,
            lng: -82.9373
        }
    } as IAlgoliaLocationSearchEventSuggestion,
    owners: [
        {
            name: 'Dave Do',
            bio: 'I am dave and I have a cool bio',
            position: 'CEO',
        },
        {
            name: 'No Bio Dave Do',
            position: 'CO-CEO',
        },
    ],
    website: 'pizza.com',
    identify: {
        [EIdentify.FEMALE]: {
            selected: true,
            text: 'We are a female owned buisness',
        },
        [EIdentify.MINORITY]: {
            selected: true,
            text: 'We are a minority owned buisness',
        },
    },
    about: `Hungry Howie's Pizza Claimed 21 reviews $ PizzaEdit
        Open10:30 AM - 11:00 PM Hours updated 2 months ago
        COVID-19 Updates "We know that you're concerned
        about COVID-19. We are too. Hungry Howie's has been
        making pizza for our customers for almost 50 years.
        The health and safety of our customers has always
        been our top priority. During this pandemic, we are
        even more concerned. Visit our websi`,
};
