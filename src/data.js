import { item } from "./server/apis/item.api";

let unitStore = new Map();

export const reqItemUnit = async (name) => {
    if (!unitStore.has(name)) {
        const res = await item.detail(name);

        unitStore.set(name, res.Unit);

        return res.Unit;
    }

    return unitStore.get(name);
};
