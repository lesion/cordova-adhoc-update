#!/usr/bin/env node
'use strict'

/*
 load current package.json parsing release
 bumping major / minor or patch release depends on arguments
 write a new release.json
  {
    "release": "0.0.1",
    "changelog": "- this is changed !" 
    "plist_url": "http://myPlistURL/manifest.plist",
    "date" : "31237182"
  }}
*/

var appupdate = {
  parseArgs () {
    const ArgumentParser = require('argparse').ArgumentParser
    const parser = new ArgumentParser({
      version: '1.0.0',
      addHelp: true,
      description: 'AppUpdater example: `appupdater patch`'
    })

    parser.addArgument(['type'], {
      help: 'semver increment release (major | minor | patch)'
    })

    return parser.parseArgs()
  },

  init () {
    const args = this.parseArgs()
    
    // var currentPackage = require(process.cwd() + '/package.json')
    // console.error(currentPackage)
  }
}

if (require.main === module) {
  console.error(process.cwd())
  appupdate.init()
}
