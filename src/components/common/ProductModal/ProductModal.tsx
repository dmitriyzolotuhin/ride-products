import React, { FC } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

import { Product } from "types/product";

import { ProductCardContent } from "components/common/ProductCard";

interface ProductModalProps {
  isOpen: boolean;
  product: Product;
  topics: string;
  onClose(): void;
}

export const ProductModal: FC<ProductModalProps> = (props) => {
  const classes = useStyles();

  return (
    <Dialog
      onClose={props.onClose}
      open={props.isOpen}
      classes={{ paper: classes.paper }}
    >
      <IconButton
        onClick={props.onClose}
        aria-label="close"
        className={classes.closeButton}
        size="small"
      >
        <Close fontSize="large" />
      </IconButton>
      <DialogContent dividers>
        <ProductCardContent product={props.product} topics={props.topics} />
        <Button className={classes.getItButton}>Get It</Button>
      </DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles({
  paper: {
    backgroundColor: "#f3f3f3",
  },
  closeButton: {
    position: "fixed",
    top: "30px",
    left: "30px",
    backgroundColor: "#fff",

    "&:hover": {
      backgroundColor: "#fff",
      color: "#cc4d29",
    },
  },
  getItButton: {
    marginTop: "35px",
    width: "100%",
    color: "#fff",
    backgroundColor: "#cc4d29",

    "&:hover": {
      backgroundColor: "#DA552F",
    },
  },
});
