import { MOCK_USER } from '../../__mock__/user-data';

export function testTimeCreated(
    createdAt: number,
    createdAfterTime: Date,
    createdBeforeTime: Date
) {
    const createdAtDate = new Date(createdAt);
    expect(
        Number(createdAtDate) - Number(createdAfterTime)
    ).toBeGreaterThanOrEqual(0);
    expect(
        Number(createdBeforeTime) - Number(createdAtDate)
    ).toBeGreaterThanOrEqual(0);
}

export async function clearMockUser(admin: any) {
    const mockUser = await admin
        .firestore()
        .collection('user')
        .doc(MOCK_USER.uid)
        .get();
    if (mockUser.exists) {
        await admin.firestore().collection('user').doc(MOCK_USER.uid).delete();
    }
}

export async function createMockUser(api: any, tests: any, admin: any) {
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
    testTimeCreated(
        createdUser.data().createdAt,
        createdAfterTime,
        createdBeforeTime
    );
}
