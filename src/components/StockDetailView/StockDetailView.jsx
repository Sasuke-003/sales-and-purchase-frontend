import React, { useState, useEffect } from "react";

import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ToItemQtyPairList } from "../../util";
import { purchase } from "../../server/apis/purchase.api.js";
import { sale } from "../../server/apis/sale.api";
import { reqItemUnit } from "../../data";

const StockDetailView = ({ SaleID, PurchaseID }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const display = async () => {
            if (SaleID === 0) {
                let res = await purchase.detail(PurchaseID);
                res = ToItemQtyPairList(res.Items);
                for (let i = 0; i < res.length; i++) {
                    res[i]["Unit"] = await reqItemUnit(res[i].Name);
                }
                setData(res);
            } else {
                let res = await sale.detail(SaleID);
                res = ToItemQtyPairList(res.Items);
                for (let i = 0; i < res.length; i++) {
                    res[i]["Unit"] = await reqItemUnit(res[i].Name);
                }
                setData(res);
            }
        };
        display();
    }, [SaleID, PurchaseID]);

    return (
        <div>
            <Paper style={{ maxHeight: 500, overflow: "auto" }}>
                <List dense={true}>
                    {data.map((h, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`${h.Name} ${h.Qty} ${h.Unit}`} primaryTypographyProps={{ style: { fontSize: "20px" } }} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
};

export default StockDetailView;
