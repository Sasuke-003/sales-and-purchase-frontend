import React from "react";

import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const ViewItemPopup = ({ historyData }) => {
    return (
        <div>
            <Paper style={{ maxHeight: 500, overflow: "auto" }}>
                <List dense={true}>
                    {historyData.map((h, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`${h.Name} ${h.Qty} ${h.Unit}`} primaryTypographyProps={{ style: { fontSize: "20px" } }} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
};

export default ViewItemPopup;
