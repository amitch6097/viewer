import { IUserDocument } from "../../typings/documents";
import { IBusinessListing } from "../../typings/types";

export function expectAuthAndData(functions, data, context) {
    if (!context.auth)
        throw new functions.https.HttpsError(
            'unauthenticated',
            'The function must be called while authenticated.'
        );
    if (!data || typeof data !== 'object')
        throw new functions.https.HttpsError(
            'invalid-argument',
            `The function must be called with a data object. ${data}`
        );
}

export function paginate({
    data,
    page,
    count,
}: {
    data: Record<string, { createdAt: number }>;
    page: number;
    count: number;
}): string[] {
    if (!data) {
        return [];
    }
    const ordered = Object.keys(data).sort((key1, key2) => {
        const data1 = data[key1];
        const data2 = data[key2];
        return data1.createdAt - data2.createdAt;
    });
    const startIndex = page * count;
    return ordered.slice(startIndex, startIndex + count);
}

export function canUserOwnBusiness(user: IUserDocument, business: IBusinessListing) {
    const { website, phone } = business;

    if (!user) {
        return false;
    }

    if (website) {
        const headerFinal = ['www.', 'https://', 'http://'].find((header) => {
            return website.indexOf(header) >= 0;
        });
        const root = headerFinal
            ? website
                  .slice(website.indexOf(headerFinal) + headerFinal.length)
                  .split('/')[0]
            : website.split('/')[0];
        if (user.email.indexOf(root) > 0) {
            return true;
        }
    }

    if (phone && phone === user.phone) {
        return true;
    }

    return false;
}
