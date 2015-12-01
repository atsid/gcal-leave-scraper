#!/bin/bash

# Make sure we are in the directory above ./quickstarts so everything else loads properly
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/..

nodejs $DIR/quickstart-mine.js
