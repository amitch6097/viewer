import * as functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';
import * as path from 'path';

const projectConfig = {
    projectId: 'common-good-68b0b',
    databaseURL: 'https://common-good-68b0b.firebaseio.com',
};

const tests = functions(projectConfig, path.resolve('common-good-key.json'));
import { BUSINESS_DATA } from '../../__mock__/business-data';
import { MOCK_USER } from '../../__mock__/user-data';
import {
    BusinessTagDescriptors,
    EIdentify,
    IBusinessDocument,
} from '../../typings/types';

import { testTimeCreated, clearMockUser, createMockUser } from './helpers';

describe('my functions', () => {
    let adminStub: any, api: any;

    beforeAll(async (resolve) => {
        adminStub = jest.spyOn(admin, 'initializeApp');
        api = require('../lib/functions/src/index');
        await clearMockUser(admin);
        resolve();
    });

    afterAll(async (resolve) => {
        adminStub.mockRestore();
        tests.cleanup();
        //just to be sure!
        await clearMockUser(admin);
        resolve();
    });

    it('should create a user', async (resolve) => {
        await createMockUser(api, tests, admin);
        await clearMockUser(admin);
        resolve();
    });

    it('should let users create a review', async (resolve) => {
        await createMockUser(api, tests, admin);
        const wrappedCreateReview = tests.wrap(api.createReview);
        const data = {
            review: {
                text: 'my mock review',
                rating: '3',
                businessId: '__mock-business-id',
            },
        };

        const createdAfterTime = new Date();
        const response = await wrappedCreateReview(data, {
            auth: MOCK_USER,
        });
        const createdBeforeTime = new Date();

        const id = response.id;
        const mockUser = await admin
            .firestore()
            .collection('user')
            .doc(MOCK_USER.uid)
            .get();

        const review = await admin
            .firestore()
            .collection('review')
            .doc(id)
            .get();

        const reviewData = review.data();

        expect(id).toBeTruthy();
        expect(review.exists).toBeTruthy();
        expect(reviewData.rating).toEqual(data.review.rating);
        expect(reviewData.text).toEqual(data.review.text);
        expect(reviewData.businessId).toEqual(data.review.businessId);
        expect(reviewData.createdBy).toEqual(MOCK_USER.uid);
        testTimeCreated(
            reviewData.createdAt,
            createdAfterTime,
            createdBeforeTime
        );
        expect(mockUser.data().reviews.includes(id)).toBeTruthy();

        /** clean up */
        await clearMockUser(admin);
        await admin.firestore().collection('review').doc(id).delete();
        resolve();
    });

    it('should let users create a business', async (resolve) => {
        await createMockUser(api, tests, admin);
        const wrappedCreateBusiness = tests.wrap(api.createBusiness);
        const data = {
            business: BUSINESS_DATA,
        };

        const createdAfterTime = new Date();
        const response = await wrappedCreateBusiness(data, {
            auth: MOCK_USER,
        });
        const createdBeforeTime = new Date();

        const id = response.id;

        const business = await admin
            .firestore()
            .collection('business')
            .doc(id)
            .get();

        const businessData = business.data() as IBusinessDocument;

        expect(id).toBeTruthy();
        expect(business.exists).toBeTruthy();
        testTimeCreated(
            businessData.meta.createdAt,
            createdAfterTime,
            createdBeforeTime
        );

        expect(businessData.meta.createdBy).toEqual(MOCK_USER.uid);
        expect(businessData.data.name).toEqual(BUSINESS_DATA.name);
        expect(businessData.data.about).toEqual(BUSINESS_DATA.about);
        expect(businessData.data.website).toEqual(BUSINESS_DATA.website);
        expect(businessData.data.phone).toEqual(BUSINESS_DATA.phone);

        expect(Number(businessData._geoloc.lat)).toEqual(
            Number(BUSINESS_DATA.address.latlng.lat)
        );
        expect(Number(businessData._geoloc.lng)).toEqual(
            Number(BUSINESS_DATA.address.latlng.lng)
        );
        expect(businessData._tags.length).toEqual(3);
        expect(
            businessData._tags.includes(
                `${BusinessTagDescriptors.IDENTITY}:${EIdentify.FEMALE}`
            )
        ).toBeTruthy();
        expect(
            businessData._tags.includes(
                `${BusinessTagDescriptors.IDENTITY}:${EIdentify.MINORITY}`
            )
        ).toBeTruthy();
        expect(
            businessData._tags.includes(
                `${BusinessTagDescriptors.CATEGORY}:${BUSINESS_DATA.category}`
            )
        ).toBeTruthy();

        /** clean up */
        await clearMockUser(admin);
        await admin.firestore().collection('business').doc(id).delete();
        resolve();
    });
});
