import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ReceiptIcon from "@material-ui/icons/Receipt";
import IconButton from "@material-ui/core/IconButton";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import { makeStyles } from "@material-ui/core/styles";

import { setCurrentUser } from "../../redux/user/user.actions";

import "./header.styles.scss";

import { user } from "../../server/apis/user.api";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: "space-between",
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },

    title: {
        flexGrow: 1,
    },

    list: {
        width: 250,
    },
}));

const Header = ({ currentUser, setCurrentUser, history }) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor, currentUser) => (
        <div className={classes.list} role='presentation' onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
            <List>
                <ListItem
                    button
                    key={0}
                    onClick={() => {
                        history.push("/");
                    }}>
                    <ListItemIcon>
                        {" "}
                        <ReceiptIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary='BILLING' />
                </ListItem>

                {currentUser && currentUser.Type === "a" ? (
                    <ListItem
                        button
                        key={1}
                        onClick={() => {
                            history.push("/purchase");
                        }}>
                        <ListItemIcon>
                            {" "}
                            <ShoppingCartIcon />{" "}
                        </ListItemIcon>
                        <ListItemText primary='PURCHASE' />
                    </ListItem>
                ) : null}

                {currentUser && currentUser.Type === "a" ? (
                    <ListItem
                        button
                        key={2}
                        onClick={() => {
                            history.push("/stock");
                        }}>
                        <ListItemIcon>
                            {" "}
                            <ShowChartIcon />{" "}
                        </ListItemIcon>
                        <ListItemText primary='STOCK' />
                    </ListItem>
                ) : null}
            </List>

            <Divider />

            <List>
                {currentUser && currentUser.Type === "a" ? (
                    <ListItem
                        button
                        key={3}
                        onClick={() => {
                            history.push("/additem");
                        }}>
                        <ListItemIcon>
                            {" "}
                            <AddShoppingCartIcon />{" "}
                        </ListItemIcon>
                        <ListItemText primary='ADD ITEM' />
                    </ListItem>
                ) : null}

                {currentUser && currentUser.Type === "a" ? (
                    <ListItem
                        button
                        key={4}
                        onClick={() => {
                            history.push("/addseller");
                        }}>
                        <ListItemIcon>
                            {" "}
                            <AddBoxIcon />{" "}
                        </ListItemIcon>
                        <ListItemText primary='ADD SELLER' />
                    </ListItem>
                ) : null}

                {currentUser && currentUser.Type === "a" ? (
                    <ListItem
                        button
                        key={5}
                        onClick={() => {
                            history.push("/signup");
                        }}>
                        <ListItemIcon>
                            {" "}
                            <PersonAddIcon />{" "}
                        </ListItemIcon>
                        <ListItemText primary='ADD USER' />
                    </ListItem>
                ) : null}
            </List>
        </div>
    );

    return (
        <div className={`${classes.root} header`}>
            <AppBar position='fixed'>
                <Toolbar>
                    {currentUser ? (
                        <React.Fragment key={0}>
                            <IconButton
                                edge='start'
                                className={classes.menuButton}
                                color='inherit'
                                aria-label='menu'
                                onClick={toggleDrawer("left", true)}>
                                <MenuIcon />
                            </IconButton>

                            <SwipeableDrawer
                                anchor='left'
                                open={state["left"]}
                                onClose={toggleDrawer("left", false)}
                                onOpen={toggleDrawer("left", true)}>
                                {list("left", currentUser)}
                            </SwipeableDrawer>
                        </React.Fragment>
                    ) : null}

                    <div className='options'>
                        {currentUser ? (
                            <Button
                                color='inherit'
                                className='option'
                                onClick={() => {
                                    user.signOut();
                                }}>
                                LOG OUT
                            </Button>
                        ) : null}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStatetoProps = (state) => ({
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(Header));
