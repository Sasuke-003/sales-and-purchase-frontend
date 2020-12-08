import axios from "axios";
import { validate, valid } from "../validator";

const validItem = valid.item;

const url = {
    search: "/item",
    add: "/item/add",
    stock: "/item/stock",
    sales: "/item/sales",
    update: "/item/update",
    detail: "/item/detail",
    purchases: "/item/purchases",
};

export const item = {
    search: async (ItemName) => {
        await validate(validItem.search, { ItemName });
        const query = `?ItemName=${ItemName}`;
        return await axios.get(url.search + query);
    },

    add: async (newItemData) => {
        await validate(validItem.add, newItemData);
        return await axios.post(url.add, newItemData);
    },

    detail: async (ItemName) => {
        await validate(validItem.detail, { ItemName });
        const query = `?ItemName=${ItemName}`;
        return await axios.get(url.detail + query);
    },

    update: async (updatedItemData) => {
        await validate(validItem.update, updatedItemData);
        return await axios.post(url.update, updatedItemData);
    },

    stock: async (PageNo) => {
        await validate(validItem.stock, { PageNo });
        const query = `?PageNo=${PageNo}`;
        return await axios.get(url.stock + query);
    },

    purchases: async (PageNo, ItemName) => {
        await validate(validItem.purchases, { PageNo, ItemName });
        const query = `?PageNo=${PageNo}&ItemName=${ItemName}`;
        return await axios.get(url.purchases + query);
    },

    sales: async (PageNo, ItemName) => {
        await validate(validItem.sales, { PageNo, ItemName });
        const query = `?PageNo=${PageNo}&ItemName=${ItemName}`;
        return await axios.get(url.sales + query);
    },
};
