export const mirrorKeys = (...obj) => {
    return obj.reduce((acc, key) => ({
        ...acc,
        [key]: key
    }), {});
}