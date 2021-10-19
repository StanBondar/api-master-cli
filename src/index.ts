#!/usr/bin/env node

import {createRouteStructure} from './utils/create-route';

  if(process.argv.length <= 2) console.error("Please, provide route name");

  if(process.argv.length > 2) {
    createRouteStructure(process.argv[2]);
  }
