export async function paginate<T>({
    firestore,
    collection,
    arr,
    count,
    page,
}: {
    firestore: FirebaseFirestore.Firestore;
    collection: FirebaseFirestore.CollectionReference<
        FirebaseFirestore.DocumentData
    >;
    arr: string[];
    count: number;
    page: number;
}): Promise<{
    results: Array<{
        id: string;
        data: T;
    }>;
    page: number;
    pages: number;
    lastId: string;
}> {
    const size = arr?.length || 0;
    const pages = Math.ceil(size / count);
    if (size === 0) {
        return {
            results: [],
            pages: 0,
            lastId: undefined,
            page
        };
    } else {
        const startAtIndex = (page * count);
        const ids = arr.slice(startAtIndex, startAtIndex + count);
        const refs = ids.map((id) => collection.doc(id));
        const docs = await firestore.getAll(...refs);
        const results = docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.exists ? (doc.data() as T) : undefined,
            };
        });
        return {
            results,
            pages,
            page,
            lastId: ids[ids.length - 1],
        };
    }
}

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
