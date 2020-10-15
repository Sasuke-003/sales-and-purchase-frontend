import axios from "axios";
import { ToItemQtyPairJson, ToItemQtyPairList } from "../util";

export const URL = {
  login: "/user/login",
  signup: "/user/signup",

  item: "/item?ItemName=",
  itemAdd: "/item/add",
  itemDetail: "/item/detail?ItemName=",
  itemUpdate: "/item/update",

  seller: "/seller?SellerName=",
  sellerAdd: "/seller/add",

  purchaseCreate: "/purchase/create",
  purchaseList: "/purchase/list?PageNo=",
  purchaseDetail: "/purchase/detail?PurchaseID=",
  purchaseDelete: "/purchase/delete",
  purchaseUpdate: "/purchase/update",

  saleCreate: "/sale/create",
  saleList: "/sale/list?PageNo=",
  saleDetail: "/sale/detail?SaleID=",
  saleDelete: "/sale/delete",
  saleUpdate: "/sale/update",
};

export const req = {
  user: {
    login: async (data) => {
      return await axios.post(URL.login, data);
    },
    signup: async (data) => {
      return await axios.post(URL.signup, data);
    },
  },

  item: {
    autoCompleteData: async (data) => {
      const res = await axios.get(URL.item + data.S);
      let arr = [];
      if (res) {
        for (let i = 0; i < res.Items.length; i++) {
          arr.push({ Name: res.Items[i] });
        }
      }
      return arr;
    },
    add: async (data) => {
      return await axios.post(URL.itemAdd, data);
    },
    detail: async (data) => {
      return await axios.get(URL.itemDetail + data.Name);
    },
    update: async (data) => {
      return await axios.post(URL.itemUpdate, data);
    },
  },

  seller: {
    autoCompleteData: async (data) => {
      const res = await axios.get(URL.seller + data.S);
      let arr = [];
      if (res) {
        for (let i = 0; i < res.SellerNames.length; i++) {
          arr.push({ Name: res.SellerNames[i] });
        }
      }
      return arr;
    },
    add: async (data) => {
      return await axios.post(URL.sellerAdd, data);
    },
  },

  purchase: {
    create: async (data) => {
      return await axios.post(URL.purchaseCreate, { SellerName: data.SellerName, Items: ToItemQtyPairJson(data.Items) });
    },
    list: async (data) => {
      if (data.uid === 0) {
        let res = await axios.get(URL.purchaseList + data.pageNo);

        for (let i = 0; i < res.length; i++) {
          res[i]["_id"] = res[i].PurchaseID;
        }
        console.log(res);
        return res;
      } else {
        let res = await axios.get(URL.purchaseList + data.pageNo + "&UserID=" + data.uid);
        for (let i = 0; i < res.length; i++) {
          res[i]["_id"] = res[i].PurchaseID;
        }
        return res;
      }
    },
    detail: async (data) => {
      const res = await axios.get(URL.purchaseDetail + data._id);
      return { Items: ToItemQtyPairList(res.Items) };
    },
    delete: async (data) => {
      return await axios.post(URL.purchaseDelete, data);
    },
    update: async (data) => {
      return await axios.post(URL.purchaseUpdate, data);
    },
  },

  sale: {
    create: async (data) => {
      return await axios.post(URL.saleCreate, { Items: ToItemQtyPairJson(data.Items) });
    },
    list: async (data) => {
      if (data.uid === 0) {
        let res = await axios.get(URL.saleList + data.P);
        for (let i = 0; i < res.length; i++) {
          res[i]["_id"] = res[i].SaleID;
        }
        return res;
      } else {
        let res = await axios.get(URL.saleList + data.P + "&UserID=" + data.uid);
        for (let i = 0; i < res.length; i++) {
          res[i]["_id"] = res[i].SaleID;
        }
        return res;
      }
    },
    detail: async (data) => {
      const res = await axios.get(URL.saleDetail + data._id);
      return { Items: ToItemQtyPairList(res.Items) };
    },
    delete: async (data) => {
      console.log(data);
      return await axios.post(URL.saleDelete, data);
    },
    update: async (data) => {
      return await axios.post(URL.saleUpdate, data);
    },
  },
};
