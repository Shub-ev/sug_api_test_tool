export const normalizeUrl = (url) => {
    try {
        return new URL(url).href;
    } catch {
        try {
            return new URL(`https://${url}`).href;
        } catch {
            return null;
        }
    }
}