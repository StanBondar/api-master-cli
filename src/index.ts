#!/usr/bin/env node

import {createRouteStructure} from './utils/createRoute';

// console.log("hello from here js");
console.log(process.cwd());
process.argv.length > 2
  ? console.log(process.argv.slice(2))
  : console.error("Please, provide route name");

  if(process.argv.length > 2) {
    createRouteStructure(process.argv[2]);
  }
