import React, { useEffect, useState } from "react";
import "./stock-page.styles.css";

import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { item } from "../../server/apis/item.api";

import Stock from "../../components/Stock/Stock.component";
import StockSalesPurchases from "../../components/StockSalesPurchases/StockSalesPurchases";

const StackPage = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [popper, setPopper] = useState(false);
    const [currentItem, setCurrentItem] = useState("");

    useEffect(() => {
        const getData = async () => {
            setData(await item.stock(page));
        };
        getData();
    }, [page]);
    const setItem = (name) => {
        setCurrentItem(name);
        setPopper(true);
    };
    return (
        <div className='container'>
            <h2>STOCK</h2>
            <IconButton aria-label='delete' onClick={() => setPage(page - 1)} disabled={page === 0 ? true : false}>
                <NavigateBeforeIcon fontSize='large' />
            </IconButton>

            {page + 1}

            <IconButton aria-label='delete' onClick={() => setPage(page + 1)} disabled={data.length === 0 ? true : false}>
                <NavigateNextIcon fontSize='large' />
            </IconButton>

            <div className='stock__items'>
                {data.map(({ Name, Unit, Qty }, index) => (
                    <Stock key={Name + index} Name={Name} Unit={Unit} Qty={Qty} setItem={setItem} />
                ))}
            </div>
            <Dialog
                open={popper}
                onClose={() => setPopper(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                fullWidth
                maxWidth='md'>
                <DialogTitle id='alert-dialog-title'>{currentItem}</DialogTitle>

                <DialogContent>
                    <StockSalesPurchases ItemName={currentItem} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setPopper(false)} color='primary'>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default StackPage;
