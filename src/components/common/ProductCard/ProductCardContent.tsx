import React, { FC } from "react";
import { makeStyles, Typography } from "@material-ui/core";

import { Product } from "types/product";

interface ProductCardContentProps {
  product: Product;
  topics: string;
}

export const ProductCardContent: FC<ProductCardContentProps> = (props) => {
  const classes = useStyles();
  const posterUrl = `${process.env.REACT_APP_POSTER_URL}${props.product.thumbnail.imageUuid}`;

  return (
    <div className={classes.content}>
      <div>
        <video loop poster={posterUrl} className={classes.image} />
      </div>
      <div className={classes.info}>
        <div>
          <Typography component="h2" variant="h5">
            {props.product.name}
          </Typography>
          <Typography className={classes.tagline}>
            {props.product.tagline}
          </Typography>
        </div>
        <div className={classes.topics}>
          <div>{`Comments: ${props.product.commentsCount}`}</div>
          <div>{`Topics: ${props.topics}`}</div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    height: "100%",
  },
  image: {
    width: "93px",
    height: "93px",
    marginRight: "10px",
    objectFit: "cover",
  },
  tagline: {
    color: "#6f6f6f",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topics: {
    display: "flex",
    flexDirection: "row",
    color: "#6f6f6f",

    "& > div:not(:first-child)": {
      marginLeft: "10px",
    },
  },
});
