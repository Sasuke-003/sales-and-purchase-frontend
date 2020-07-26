import axios from 'axios'

export const URL = {

    login  : '/user/login',
    signup : '/user/signup',

    item       : '/item',
    itemAdd    : '/item/add',
    itemDetail : '/item/detail',
    itemUpdate : '/item/update',

    seller    : '/seller',
    sellerAdd : '/seller/add',

    purchaseCreate  : '/purchase/create',
    purchaseListAll : '/purchase/list-all',
    purchaseListMy  : '/purchase/list-my',
    purchaseDetail  : '/purchase/detail',
    purchaseDelete  : '/purchase/delete',

    saleCreate  : '/sale/create',
    saleListAll : '/sale/list-all',
    saleListMy  : '/sale/list-my',
    saleDetail  : '/sale/detail',
    saleDelete  : '/sale/delete',

}


export const req = {

    user: {

        login   : async (data) => { return await axios.post( URL.login, data ) },
        signup  : async (data) => { return await axios.post( URL.signup, data ) },

    },

    item: {

        autoCompleteData  : async (data) => { return await axios.post( URL.item, data ) },
        add               : async (data) => { return await axios.post( URL.itemAdd, data ) },
        detail            : async (data) => { return await axios.post( URL.itemDetail, data ) },
        update            : async (data) => { return await axios.post( URL.itemUpdate, data ) },

    },

    seller: {

        autoCompleteData  : async (data) => { return await axios.post( URL.seller, data ) },
        add               : async (data) => { return await axios.post( URL.sellerAdd, data ) },

    },

    purchase: {

        create  : async (data) => { return await axios.post( URL.purchaseCreate, data ) },
        listAll : async (data) => { return await axios.post( URL.purchaseListAll, data ) },
        listMy  : async (data) => { return await axios.post( URL.purchaseListMy, data ) },
        detail  : async (data) => { return await axios.post( URL.purchaseDetail, data ) }, 
        delete  : async (data) => { return await axios.post( URL.purchaseDelete, data ) },

    },

    sale: {

        create  : async (data) => { return await axios.post( URL.saleCreate, data ) },
        listAll : async (data) => { return await axios.post( URL.saleListAll, data ) },
        listMy  : async (data) => { return await axios.post( URL.saleListMy, data ) },
        detail  : async (data) => { return await axios.post( URL.saleDetail, data ) }, 
        delete  : async (data) => { return await axios.post( URL.saleDelete, data ) },

    },


}