export function convertToSerializeableObject(leanDocument) {
    const plainObject = JSON.parse(JSON.stringify(leanDocument));

    function replaceObjectIdWithString(obj) {
        for (const key in obj) {
            if (
                obj[key] instanceof Object &&
                obj[key]._bsontype === 'ObjectID'
            ) {
                obj[key] = obj[key].toString();
            } else if (typeof obj[key] === 'object') {
                replaceObjectIdWithString(obj[key]);
            }
        }
    }

    replaceObjectIdWithString(plainObject);
    return plainObject;
}
