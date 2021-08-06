import React, { FC, useMemo, useState } from "react";
import { Card, makeStyles } from "@material-ui/core";

import { Product } from "types/product";

import { ProductModal } from "components/common/ProductModal";
import { ProductCardContent } from "./ProductCardContent";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = (props) => {
  const classes = useStyles();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const onClickCard = () => setIsProductModalOpen(true);
  const onCloseProductModal = () => setIsProductModalOpen(false);

  const topics = useMemo(
    () => props.product.topics.edges.map(({ node }) => node.name).join(", "),
    [props.product.topics.edges]
  );

  return (
    <>
      <Card component="button" className={classes.card} onClick={onClickCard}>
        <ProductCardContent product={props.product} topics={topics} />
      </Card>
      {isProductModalOpen && (
        <ProductModal
          isOpen={isProductModalOpen}
          product={props.product}
          topics={topics}
          onClose={onCloseProductModal}
        />
      )}
    </>
  );
};

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    height: 125,
    padding: "16px",
    border: "unset",
    cursor: "pointer",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 10%)",

    "&:hover": {
      backgroundColor: "#f9f9f9",
    },

    "&:not(:first-child)": {
      marginTop: "16px",
    },
  },
});
