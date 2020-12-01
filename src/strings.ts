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

    createReview: {
        submitText: 'Submit Review',
        placeholder:
            'Always my go to place when I have guests in town! Love trying their wide variety ...',
    },

    filters: {
        [EIdentify.MINORITY]: {
            label: 'Minority Owned Business',
        },
        [EIdentify.FEMALE]: {
            label: 'Female Owned Business',
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
        noSelection: 'No Selection',
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

    flag: {
        selectLabel: 'Select a Flag Type',
        submitButton: 'Submit Flag',
        textPlaceholder:
            'Please provide more info about why you are submitting this flag',
        error: {
            noText:
                'Please Provide an explanation of the reason you are submitting this flag (50 character min)',
            noType: 'Please Provide a type for the flag you are creating',
        },
        types: {
            data: 'Data Issue',
            inappropriate: 'Inappropriate Content',
            closed: 'This business is Closed',
            owner: 'This business in wrongfully claimed',
        },
    },

    result: {
        actions: {
            favorite: {
                label: 'toggle favorite',
            },
            flags: {
                label: 'view flags'
            },
            updateRequests: {
                label: 'view update request'
            },
        }
    }
};
