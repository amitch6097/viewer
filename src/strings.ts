import { EIdentify } from '../typings/types';

export const strings = {
    create: {
        stepLabels: {
            info: 'Basic Information',
            identify: 'Identify your Business',
            details: 'Fill in the Details',
            owner: 'About the Owners',
        },
        info: {
            labels: {
                website: 'Website',
                address: 'Address',
                email: 'Business Email',
                category: 'Category',
                phone: 'Business Phone',
            },
            errors: {
                category: 'Please provide a category',
                phone: 'Please provide a phone number',
                email: 'Please provide a email',
            },
        },
        identify: {
            [EIdentify.MINORITY]: {
                label: 'This is a Minority Owned Business',
            },
            [EIdentify.FEMALE]: {
                label: 'This is a Female Owned Business',
            },
        },
    },

    actions: {
        address: 'Get Directions',
        website: 'Website',
        phone: 'Phone',
        email: 'Email',
    },

    buttons: {
        continue: 'Continue',
        createListing: 'Create Listing',
    },

    labels: {
        website: 'Website',
        address: 'Address',
        email: 'Business Email',
    },

    categories: {
        legal: 'Legal Services',
        lodging: 'Lodging & Travel',
        marketing: 'Marketing & Advertising',
        news: 'News & Media',
        pets: 'Pet Services',
        realestate: 'Real Estate',
        restaurant: 'Restaurants & Nightlife',
        shopping: 'Shopping & Retail',
        sports: 'Sports & Recreation',
        transportation: 'Transportation',
        utilities: 'Utilities',
        events: 'Wedding, Events & Meetings',
        accounting: 'Accounting & Tax Services',
        arts: 'Arts, Culture & Entertainment',
        auto: 'Auto Sales & Service',
        banking: 'Banking & Finance',
        business: 'Business Services',
        community: 'Community Organizations',
        dentists: 'Dentists & Orthodontists',
        education: 'Education',
        wellness: 'Health & Wellness',
        health: 'Health Care',
        home: 'Home Improvement',
        insurance: 'Insurance',
        web: 'Internet & Web Services',
    },

    appBar: {
        login: 'Login',
        logout: 'Logout',
        addBusiness: 'Add A Business',
        signUp: 'Sign Up',
    },

    login: {
        signIn: 'Sign In',
        forgotPassword: 'Forgot Password?',
        email: 'Email Address',
        password: 'Password',
        dontHaveAccount: "Don't have an account? Sign Up",
    },

    signUp: {
        signUp: 'Sign Up',
        signIn: 'Already have an account? Sign in',
    },
};
