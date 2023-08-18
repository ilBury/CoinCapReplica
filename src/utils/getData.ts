export const getData = async (currentPage: number) => {
    const resp = await fetch(`https://api.coincap.io/v2/assets?limit=${currentPage}`);
    return await resp.json();
}

export const getCoin = async (id: string) => {
    const resp = await fetch(`https://api.coincap.io/v2/assets?ids=${id}`);
    return await resp.json();
}

export const getHistory = async (id: string) => {
    const resp = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`)
    return await resp.json();
}

