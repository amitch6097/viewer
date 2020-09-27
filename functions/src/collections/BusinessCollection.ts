import { Collection } from './Collection';
import { IBusinessDocument } from '../../../typings/documents';

/**
 * This does not work for some reason on functions but want to keep for FE
 */
// export const BusinessConverter = {
//     toFirestore(
//         data: Omit<IBusinessDocument, 'id'>
//     ): FirebaseFirestore.DocumentData {
//         console.log(data, 'DATA');
//         return data;
//     },
//     fromFirestore(
//         snapshot: functions.firestore.QueryDocumentSnapshot | IBusinessDocument
//     ): IBusinessDocument {
//         console.log(arguments);
//         if (
//             typeof (snapshot as functions.firestore.QueryDocumentSnapshot)
//                 .data !== 'function'
//         ) {
//             return snapshot as IBusinessDocument;
//         } else {
//             const data = (snapshot as functions.firestore.QueryDocumentSnapshot).data();
//             return {
//                 id: snapshot.id,
//                 ...(data as Omit<IBusinessDocument, 'id'>),
//             };
//         }
//     },
// };

export class BusinessCollection extends Collection {
    constructor() {
        super('business');
    }

    async getData(id: string): Promise<IBusinessDocument> {
        return (await super.getData(id)) as IBusinessDocument;
    }

    async getAll(ids: string[]): Promise<IBusinessDocument[]> {
        return (await super.getAll(ids)) as IBusinessDocument[];
    }
}
