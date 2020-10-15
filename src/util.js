export const ToItemQtyPairJson = (itemList) => {
  const itemQtyPairJson = {};
  for (const item of itemList) itemQtyPairJson[item.Name] = item.Qty;
  return itemQtyPairJson;
};
export const ToItemQtyPairList = (itemQtyPairJson) => {
  const itemList = [];
  for (const itemName of Object.keys(itemQtyPairJson))
    itemList.push({
      Name: itemName,
      Qty: itemQtyPairJson[itemName],
    });
  return itemList;
};
