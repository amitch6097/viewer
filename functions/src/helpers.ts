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
