import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions-test';
import * as path from 'path';
import {
    BusinessTagDescriptors,
    EIdentify,
    IBusinessDocument
} from '../../typings/types';
import { BUSINESS_DATA } from '../../__mock__/business-data';
import { MOCK_USER } from '../../__mock__/user-data';
import { FavoriteGroupCollection } from '../src/Collections/FavoriteGroupCollection';
import { FlagBusiness } from './Functions/FlagBusiness';
import { UpdateBusiness } from './Functions/UpdateBusiness';
import { clearMockUser, createMockUser, testTimeCreated } from './helpers';


const projectConfig = {
    projectId: 'common-good-68b0b',
    databaseURL: 'https://common-good-68b0b.firebaseio.com',
};

const tests = functions(projectConfig, path.resolve('common-good-key.json'));

jest.setTimeout(20000);
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

    it('should update a business', async (resolve) => {
        await UpdateBusiness(api, tests, admin);
        resolve();
    });

    it('should let a user flag a business', async (resolve) => {
        await FlagBusiness(api, tests, admin);
        resolve();
    })

    it('should let a user create a favorite groups', async (resolve) => {
        await createMockUser(api, tests, admin);
        const wrappedCreateFavoriteGroup = tests.wrap(api.createFavoriteGroup);
        const data = {
            label: 'My New Favorite Group',
        };

        const createdAfterTime = new Date();
        const response = await wrappedCreateFavoriteGroup(data, {
            auth: MOCK_USER,
        });
        const createdBeforeTime = new Date();

        expect(response.id).toBeTruthy();
        expect(response.favoriteGroup).toBeTruthy();
        expect(response.favoriteGroup.name).toEqual('My New Favorite Group');
        testTimeCreated(
            response.favoriteGroup.updatedAt,
            createdAfterTime,
            createdBeforeTime
        );
        testTimeCreated(
            response.favoriteGroup.createdAt,
            createdAfterTime,
            createdBeforeTime
        );
        expect(response.favoriteGroup.createdBy).toEqual(MOCK_USER.uid);
        expect(response.favoriteGroup.images).toBeTruthy();
        expect(response.favoriteGroup.images.length).toEqual(0);
        expect(response.favoriteGroup.access).toEqual('private');
        expect(response.favoriteGroup.business).toBeTruthy();
        expect(Object.keys(response.favoriteGroup.business).length).toEqual(0);

        const favoriteGroupCollection = new FavoriteGroupCollection();
        const newFavoriteGroupDocument = await favoriteGroupCollection.getDocument(
            response.id
        );
        expect(newFavoriteGroupDocument.exists).toBeTruthy();

        const newFavoriteGroupData = newFavoriteGroupDocument.data();
        expect(newFavoriteGroupData.name).toEqual('My New Favorite Group');
        testTimeCreated(
            newFavoriteGroupData.updatedAt,
            createdAfterTime,
            createdBeforeTime
        );
        testTimeCreated(
            newFavoriteGroupData.createdAt,
            createdAfterTime,
            createdBeforeTime
        );
        expect(newFavoriteGroupData.createdBy).toEqual(MOCK_USER.uid);
        expect(newFavoriteGroupData.images).toBeTruthy();
        expect(newFavoriteGroupData.images.length).toEqual(0);
        expect(newFavoriteGroupData.access).toEqual('private');
        expect(newFavoriteGroupData.business).toBeTruthy();
        expect(Object.keys(newFavoriteGroupData.business).length).toEqual(0);

        await favoriteGroupCollection.deleteDocument(response.id);
        await clearMockUser(admin);
        resolve();
    });

    it('should let a user get favorite groups', async (resolve) => {
        await createMockUser(api, tests, admin);
        const favoriteGroupCollection = new FavoriteGroupCollection();
        const wrappedCreateFavoriteGroup = tests.wrap(api.createFavoriteGroup);
        const wrappedGetFavoriteGroups = tests.wrap(api.getFavoriteGroups);
        const newFavoriteGroups = [
            {
                label: 'My New Favorite Group 1',
            },
            {
                label: 'My New Favorite Group 2',
            },
            {
                label: 'My New Favorite Group 3',
            },
        ];

        const responses = [];
        for (const data of newFavoriteGroups) {
            responses.push(
                await wrappedCreateFavoriteGroup(data, {
                    auth: MOCK_USER,
                })
            );
        }

        const response1 = await wrappedGetFavoriteGroups(
            {},
            {
                auth: MOCK_USER,
            }
        );

        expect(response1.favoriteGroups).toBeTruthy();
        console.log(response1.favoriteGroups);
        expect(response1.favoriteGroups.length).toBe(3);
        // should be in order of creation
        expect(response1.favoriteGroups[0].name).toBe(
            'My New Favorite Group 1'
        );
        expect(response1.favoriteGroups[1].name).toBe(
            'My New Favorite Group 2'
        );
        expect(response1.favoriteGroups[2].name).toBe(
            'My New Favorite Group 3'
        );

        await Promise.all(
            (await responses).map((response) => {
                return favoriteGroupCollection.deleteDocument(response.id);
            })
        );
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

    it('should let users create a business (and add it to favorites)', async (resolve) => {
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

        // add to favorites
        const favoriteGroupCollection = new FavoriteGroupCollection();
        const wrappedCreateFavoriteGroup = tests.wrap(api.createFavoriteGroup);
        const wrappedSetBusinessAsFavorite = tests.wrap(
            api.setBusinessAsFavorite
        );
        const wrappedGetBusinessesForFavoriteGroup = tests.wrap(
            api.getBusinessesForFavoriteGroup
        );
        const createFavoriteGroupResponse = await wrappedCreateFavoriteGroup(
            {
                label: 'My New Favorite Group',
            },
            {
                auth: MOCK_USER,
            }
        );

        await wrappedSetBusinessAsFavorite(
            {
                businessId: id,
                setByFavoriteGroupId: {
                    [createFavoriteGroupResponse.id]: true,
                },
            },
            {
                auth: MOCK_USER,
            }
        );

        const getBusinessesForFavoriteGroupResponse1 = await wrappedGetBusinessesForFavoriteGroup(
            {
                favoriteGroupId: createFavoriteGroupResponse.id,
            },
            {
                auth: MOCK_USER,
            }
        );

        expect(getBusinessesForFavoriteGroupResponse1.businesses).toBeTruthy();
        expect(getBusinessesForFavoriteGroupResponse1.businesses.length).toBe(
            1
        );
        expect(getBusinessesForFavoriteGroupResponse1.businesses[0].id).toBe(
            id
        );

        await wrappedSetBusinessAsFavorite(
            {
                businessId: id,
                setByFavoriteGroupId: {
                    [createFavoriteGroupResponse.id]: false,
                },
            },
            {
                auth: MOCK_USER,
            }
        );

        const getBusinessesForFavoriteGroupResponse2 = await wrappedGetBusinessesForFavoriteGroup(
            {
                favoriteGroupId: createFavoriteGroupResponse.id,
            },
            {
                auth: MOCK_USER,
            }
        );

        expect(getBusinessesForFavoriteGroupResponse2.businesses).toBeTruthy();
        expect(getBusinessesForFavoriteGroupResponse2.businesses.length).toBe(
            0
        );

        /** clean up */
        await clearMockUser(admin);
        await favoriteGroupCollection.deleteDocument(
            createFavoriteGroupResponse.id
        );
        await admin.firestore().collection('business').doc(id).delete();
        resolve();
    });
});
