#!/bin/bash

IGNORE_ARGS=""
DEFAULT_ARGS="-I node_modules|dist|tree.sh"
ROOT_PATH=$(git rev-parse --show-toplevel)
IGNORE_FILE=$ROOT_PATH"/.treeignore"
TREE_ARGS=""

if [ -f $IGNORE_FILE ]; then
  while read -r line; do
    IGNORE_ARGS="$IGNORE_ARGS -I $line"
  done <$IGNORE_FILE
fi

if [ -z "$IGNORE_ARGS" ]; then
  TREE_ARGS=$DEFAULT_ARGS
else
  TREE_ARGS="$DEFAULT_ARGS $IGNORE_ARGS"
fi

tree $TREE_ARGS $ROOT_PATH
