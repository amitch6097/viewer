import { BUSINESS_DATA } from '../../../__mock__/business-data';
import { MOCK_USER } from '../../../__mock__/user-data';
import { BusinessCollection } from '../../src/Collections/BusinessCollection';
import { BusinessUpdateRequestCollection } from '../../src/Collections/BusinessUpdatedRequestCollection';
import { clearMockUser, createMockUser } from './../helpers';

export async function UpdateBusiness(api, tests, admin) {
    await createMockUser(api, tests, admin);

    const newEmail = 'new-pizza@pizza.com';
    const businessCollection = new BusinessCollection();
    const businessUpdateRequestCollection = new BusinessUpdateRequestCollection();
    const wrappedCreateBusinessUpdateRequest = tests.wrap(
        api.createBusinessUpdateRequest
    );
    const wrappedUpdateBusinessUpdatedRequest = tests.wrap(
        api.updateBusinessUpdatedRequest
    );
    const wrappedCreateBusiness = tests.wrap(api.createBusiness);

    // create the business
    const { result } = await wrappedCreateBusiness(
        { business: BUSINESS_DATA },
        {
            auth: MOCK_USER,
        }
    );

    const businessId = result.id;

    // make a request to update
    const updateRequestResponse1 = await wrappedCreateBusinessUpdateRequest(
        {
            businessId,
            updateProperties: {
                email: 'new-pizza@pizza.com',
            },
        },
        {
            auth: MOCK_USER,
        }
    );

    // approve the update
    const {action} =  await wrappedUpdateBusinessUpdatedRequest(
        {
            businessUpdateRequestId: updateRequestResponse1.result.id,
            action: 'approve',
        },
        {
            auth: MOCK_USER,
        }
    );

    // it should remove the document and update the business
    const updateRequestData1 = await businessUpdateRequestCollection.getData(
        updateRequestResponse1.result.id
    );
    expect(action).toBe('approve');
    const businessData1 = await businessCollection.getData(businessId);
    expect(businessData1.data.email).toEqual(newEmail);
    expect(updateRequestData1).toBeUndefined();

    // make a new request
    const updateRequestResponse2 = await wrappedCreateBusinessUpdateRequest(
        {
            businessId,
            updateProperties: {
                email: 'pizza@pizza.com',
            },
        },
        {
            auth: MOCK_USER,
        }
    );

    //deny the request
    await wrappedUpdateBusinessUpdatedRequest(
        {
            businessUpdateRequestId: updateRequestResponse2.result.id,
            action: 'delete',
        },
        {
            auth: MOCK_USER,
        }
    );

    // it should remove the document and NOT update the business
    const updateRequestData2 = await businessUpdateRequestCollection.getData(
        updateRequestResponse1.result.id
    );
    expect(updateRequestData2).toBeUndefined();
    const businessData2 = await businessCollection.getData(businessId);
    expect(businessData2.data.email).toEqual(businessData1.data.email);

    await businessCollection.delete(businessId)
    await clearMockUser(admin);
}