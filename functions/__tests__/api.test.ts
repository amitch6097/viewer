import 'ts-jest';

import * as functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';
import * as path from 'path';
const projectConfig = {
    projectId: 'common-good-68b0b',
    databaseURL: 'https://common-good-68b0b.firebaseio.com',
};

const tests = functions(projectConfig, path.resolve('common-good-key.json'));

import { MOCK_USER } from '../../__mock__/user-data';
import { clearMockUser, createMockUser } from './helpers';
import { API } from '../../src/services/API';
import { Auth } from '../../src/services/Auth';

jest.setTimeout(20000);
describe('my api', () => {
    let adminStub: any, api: any, getCurrentUserId: any;

    beforeAll(async (resolve) => {
        adminStub = jest.spyOn(admin, 'initializeApp');
        getCurrentUserId = jest.spyOn(Auth, 'getCurrentUserId').mockImplementation(() => {
            return MOCK_USER.uid
        });
        api = require('../lib/functions/src/index');
        await clearMockUser(admin);
        resolve();
    });

    afterAll(async (resolve) => {
        adminStub.mockRestore();
        getCurrentUserId.mockRestore();
        tests.cleanup();
        //just to be sure!
        await clearMockUser(admin);
        resolve();
    });

    it('let user get reviews', async (resolve) => {
        await createMockUser(api, tests, admin);

        const wrappedCreateReview = tests.wrap(api.createReview);
        const reviewsData = [
            {
                review: {
                    text: 'my mock review',
                    rating: '1',
                    businessId: '__mock-business-id',
                },
            },
            {
                review: {
                    text: 'my mock review',
                    rating: '2',
                    businessId: '__mock-business-id',
                },
            },
            {
                review: {
                    text: 'my mock review',
                    rating: '3',
                    businessId: '__mock-business-id',
                },
            },
        ];

        const responses = await Promise.all(
            reviewsData.map((data) => {
                return wrappedCreateReview(data, {
                    auth: MOCK_USER,
                });
            })
        );

        const reviewsForUser = await API.getReviewsForUser({
            userId: MOCK_USER.uid,
            count: 1
        });

        expect(reviewsForUser.reviews.size).toEqual(3);
        expect(reviewsForUser.reviews.reviews.length).toEqual(1);
        const moreReviews = await reviewsForUser.fetchMore();
        expect(moreReviews.reviews.reviews.length).toEqual(2);
        const evenMoreReviews = await moreReviews.fetchMore();
        expect(evenMoreReviews.reviews.reviews.length).toEqual(3);
        const shouldNoteBeMoreReviews = await evenMoreReviews.fetchMore();
        expect(shouldNoteBeMoreReviews.reviews.reviews.length).toEqual(3);
        console.log(shouldNoteBeMoreReviews.reviews)
        // clean up
        await Promise.all(responses.map((response) => {
            return admin.firestore().collection('review').doc(response.id).delete();
        }));
        await clearMockUser(admin);
        resolve();
    });
});
