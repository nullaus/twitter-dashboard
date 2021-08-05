import React, { KeyboardEvent, useState } from "react";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  InputBase,
  Toolbar,
  Typography,
  GridList,
  GridListTile,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import { useAppBarStyles, useCardStyles } from "./Styles";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";

import { fetchAsync, selectPopular } from "./popularSlice";

export function Popular() {
  const popular = useAppSelector(selectPopular);
  const [handle, setHandle] = useState("");
  const classes = useAppBarStyles();
  const dispatch = useAppDispatch();

  const handleChange = function (value: string) {
    if (value.charAt(0) === "@") {
      value = value.substring(1);
    }
    setHandle(value);
  };

  const handleKeypress = function (e: KeyboardEvent) {
    if (e.key === "Enter") {
      dispatch(fetchAsync(handle));
    }
  };

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.header} position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Twitter Dashboard
          </Typography>
          <div className={classes.twitterHandle}>
            <div className={classes.twitterHandleIcon}>
              <TwitterIcon />
            </div>
            <div className={classes.twitterHandle}></div>
            <InputBase
              placeholder="Twitter Handle…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => handleChange(e.target.value)}
              onKeyPress={handleKeypress}
            />
          </div>
        </Toolbar>
      </AppBar>
      <PopularTweetCards props={popular} />
    </Container>
  );
}

function PopularTweetCards(props: any) {
  let latest;
  if (props.props.latest) {
    latest = (
      <GridListTile>
        <PopularTweetCard props={props.props.latest} />
      </GridListTile>
    );
  }
  return (
    <GridList cellHeight="auto" cols={1} spacing={4}>
      {latest}
    </GridList>
  );
}

function PopularTweetCard(props: any) {
  props = props.props;
  const classes = useCardStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        ></Typography>
        <Typography variant="h5" component="h2">
          {props?.Tweet?.public_metrics.retweet_count} Retweets
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props?.Tweet?.public_metrics.like_count} Likes
        </Typography>
        <Typography variant="body2" component="p">
          {props?.Tweet?.text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View on Twitter</Button>
      </CardActions>
    </Card>
  );
}
