import * as functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';
import * as path from 'path';

const projectConfig = {
    projectId: 'common-good-68b0b',
    databaseURL: 'https://common-good-68b0b.firebaseio.com',
};

const tests = functions(projectConfig, path.resolve('common-good-key.json'));
import {BUSINESS_DATA} from '../../__mock__/business-data';
import { BusinessTagDescriptors, EIdentify, IBusinessDocument } from '../../typings/types';

const MOCK_USER = {
    displayName: 'mock user',
    photoURL: 'google.com',
    email: 'mock@user.com',
    uid: '__mock-user',
};

function testTimeCreated(createdAt: number, createdAfterTime: Date, createdBeforeTime: Date) {
    const createdAtDate = new Date(createdAt);
    expect(Number(createdAtDate) - Number(createdAfterTime)).toBeGreaterThanOrEqual(0);
    expect(Number(createdBeforeTime) - Number(createdAtDate)).toBeGreaterThanOrEqual(0);
}

async function clearMockUser() {
    const mockUser = await admin
        .firestore()
        .collection('user') 
        .doc(MOCK_USER.uid)
        .get();
    if (mockUser.exists) {
        await admin
        .firestore()
        .collection('user')
        .doc(MOCK_USER.uid).delete();
    }
}

async function createMockUser(api: any) {
    const wrappedOnUserCreate = tests.wrap(api.onUserCreate);
    const createdAfterTime = new Date();
    await wrappedOnUserCreate(MOCK_USER);
    const createdBeforeTime = new Date();
    const createdUser = await admin
        .firestore()
        .collection('user')
        .doc(MOCK_USER.uid)
        .get();

    expect(createdUser.data().name).toEqual(MOCK_USER.displayName);
    expect(createdUser.data().email).toEqual(MOCK_USER.email);
    expect(createdUser.data().image).toEqual(MOCK_USER.photoURL);
    testTimeCreated(createdUser.data().createdAt, createdAfterTime, createdBeforeTime)
}


describe('my functions', () => {
    let adminStub: any, api: any;

    beforeAll(async (resolve) => {
        adminStub = jest.spyOn(admin, 'initializeApp');
        api = require('../lib/functions/src/index');
        await clearMockUser();
        resolve();
    });

    afterAll(async (resolve) => {
        adminStub.mockRestore();
        tests.cleanup();
        //just to be sure!
        await clearMockUser();
        resolve();
    });

    it("should create a user", async (resolve) => {
        await createMockUser(api);
        await clearMockUser();
        resolve();
    });

    it('should let a user favorite and unfavorite a business by id', async (resolve) => {
        await createMockUser(api);
        const wrappedFavoriteBusiness = tests.wrap(api.favoriteBusiness);
        const data = {
            businessId: '__mock-business-id',
        };

        await wrappedFavoriteBusiness(data, {
            auth: MOCK_USER,
        });

        const mockUser = await admin
            .firestore()
            .collection('user')
            .doc(MOCK_USER.uid)
            .get();

        expect(mockUser.data().favorites.includes(data.businessId)).toBeTruthy();

        /** unfavorite */
        const wrappedUnfavoriteBusiness = tests.wrap(api.unfavoriteBusiness);
        await wrappedUnfavoriteBusiness(data, {
            auth: MOCK_USER,
        });

        const mockUserUpdated = await admin
            .firestore()
            .collection('user')
            .doc(MOCK_USER.uid)
            .get();

        expect(mockUserUpdated.data().favorites.includes(data.businessId)).toBeFalsy();

        /** clean up */
        await clearMockUser();
        resolve();
    });

    it('should let users create a review', async (resolve) => {
        await createMockUser(api);
        const wrappedCreateReview = tests.wrap(api.createReview);
        const data = {
            review: {
                text: "my mock review",
                rating: '3',
                businessId: '__mock-business-id'
            }
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
        testTimeCreated(reviewData.createdAt, createdAfterTime, createdBeforeTime)
        expect(mockUser.data().reviews.includes(id)).toBeTruthy();
        
        /** clean up */
        await clearMockUser();
        await admin.firestore().collection('review').doc(id).delete();
        resolve();
    });

    it('should let users create a business', async (resolve) => {
        await createMockUser(api);
        const wrappedCreateBusiness = tests.wrap(api.createBusiness);
        const data = {
            business: BUSINESS_DATA
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
        testTimeCreated(businessData.meta.createdAt, createdAfterTime, createdBeforeTime)

        expect(businessData.meta.createdBy).toEqual(MOCK_USER.uid);
        expect(businessData.data.name).toEqual(BUSINESS_DATA.name);
        expect(businessData.data.about).toEqual(BUSINESS_DATA.about);
        expect(businessData.data.website).toEqual(BUSINESS_DATA.website);
        expect(businessData.data.phone).toEqual(BUSINESS_DATA.phone);

        expect(Number(businessData._geoloc.lat)).toEqual(Number(BUSINESS_DATA.address.latlng.lat));
        expect(Number(businessData._geoloc.lng)).toEqual(Number(BUSINESS_DATA.address.latlng.lng));
        expect(businessData._tags.length).toEqual(3);
        expect(businessData._tags.includes(`${BusinessTagDescriptors.IDENTITY}:${EIdentify.FEMALE}`)).toBeTruthy();
        expect(businessData._tags.includes(`${BusinessTagDescriptors.IDENTITY}:${EIdentify.MINORITY}`)).toBeTruthy();
        expect(businessData._tags.includes(`${BusinessTagDescriptors.CATEGORY}:${BUSINESS_DATA.category}`)).toBeTruthy();

        /** clean up */
        await clearMockUser();
        await admin.firestore().collection('business').doc(id).delete();
        resolve();
    });
});

