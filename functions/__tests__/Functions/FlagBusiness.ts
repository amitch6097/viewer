import { BUSINESS_DATA } from '../../../__mock__/business-data';
import { MOCK_USER } from '../../../__mock__/user-data';
import { BusinessCollection } from '../../src/Collections/BusinessCollection';
import { FlagCollection } from '../../src/Collections/FlagCollection';
import { clearMockUser, createMockUser } from '../helpers';

export async function FlagBusiness(api, tests, admin) {
    await createMockUser(api, tests, admin);

    const businessCollection = new BusinessCollection();
    const flagCollection = new FlagCollection();

    const wrappedCreateFlag = tests.wrap(
        api.createFlag
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
    const createFlagResponse = await wrappedCreateFlag(
        {
            text: "I don't like this business",
            type: 'inappropriate',
            businessId,
        },
        {
            auth: MOCK_USER,
        }
    );

    const flagData = await flagCollection.getData(createFlagResponse.result.id);
    expect(flagData).toBeDefined();
    expect(flagData.businessId).toEqual(businessId);
    expect(flagData.text).toEqual("I don't like this business");
    expect(flagData.type).toEqual('inappropriate');

    const businessData = await businessCollection.getData(businessId);
    expect(businessData.flags.includes(flagData.id)).toBeTruthy();

    await flagCollection.delete(flagData.id);
    await businessCollection.delete(businessId)
    await clearMockUser(admin);
}