import React, { FC, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { Button, Container, makeStyles } from "@material-ui/core";

import { PRODUCT_GQL } from "graphql/product";

import { Product } from "types/product";

import { ProductCard } from "components/common/ProductCard";
import { ProgressLoader } from "components/common/ProgressLoader";

export const Home: FC = () => {
  const classes = useStyles();
  const [isFeatured, setIsFeatured] = useState(true);

  const { data, loading } = useQuery(PRODUCT_GQL, {
    variables: {
      cursor: "MA==",
      featured: isFeatured,
      includeAds: false,
      visibleOnHomepage: true,
      includeLayout: false,
    },
  });

  const onClickPopular = () => setIsFeatured(true);
  const onClickNewest = () => setIsFeatured(false);

  const getFilterClassName = (isActive: boolean) =>
    isActive ? classes.activeButtonFilter : classes.buttonFilter;

  const products: JSX.Element[] = useMemo(() => {
    if (!(data?.sections?.edges.length > 0)) return [];

    return data.sections.edges[0].node.posts.edges.map(
      ({ node }: { node: Product }) => (
        <ProductCard key={node.id} product={node} />
      )
    );
  }, [data?.sections.edges]);

  return (
    <ProgressLoader isLoading={loading}>
      <Container className={classes.container}>
        <div className={classes.filters}>
          <Button
            className={getFilterClassName(isFeatured)}
            onClick={onClickPopular}
          >
            POPULAR
          </Button>
          <Button
            className={getFilterClassName(!isFeatured)}
            onClick={onClickNewest}
          >
            NEWEST
          </Button>
        </div>
        {products}
      </Container>
    </ProgressLoader>
  );
};

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "24px",
    paddingBottom: "24px",
  },
  filters: {
    display: "flex",
    justifyContent: "flex-end",

    "& > button:not(:first-child)": {
      marginLeft: "5px",
    },
  },
  buttonFilter: {
    color: "#4b587c",

    "&:hover": {
      backgroundColor: "unset",
    },
  },
  activeButtonFilter: {
    color: "#fff",
    backgroundColor: "#DA552F",

    "&:hover": {
      backgroundColor: "#DA552F",
    },
  },
});
