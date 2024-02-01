import FetchError from "../utils/FetchError";

export const fetcher = async (url: string) => {
    let tag: string;
    if (url.includes("categories")) {
        tag = "categories";
    } else if (url.includes("products")) {
        tag = "products";
    } else {
        tag = "";
    }
    const res = await fetch(url, { next: { tags: [tag] } });
    if (!res.ok) {
        const errorMessage = await res.json().then((data) => data.message);
        const error = new FetchError(errorMessage, res.status);
        throw error;
    }
    return res.json();
};
