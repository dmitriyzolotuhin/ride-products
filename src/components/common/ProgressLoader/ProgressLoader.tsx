import React, { FC } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

interface ProgressLoaderProps {
  isLoading: boolean;
}

export const ProgressLoader: FC<ProgressLoaderProps> = (props) => {
  const classes = useStyles();

  if (props.isLoading) {
    return (
      <div className={classes.progressWrapper}>
        <CircularProgress className={classes.progress} />
      </div>
    );
  }

  return <>{props.children}</>;
};

const useStyles = makeStyles({
  progressWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
  },
  progress: {
    color: "#DA552F",
  },
});
