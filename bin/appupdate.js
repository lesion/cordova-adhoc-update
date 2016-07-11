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
      description: 'AppUpdater example: `cordova-adhoc-app-update `'
    })

    parser.addArgument(['-u', '--url'], {
      help: 'manifest url'
    })

    parser.addArgument(['-c', '--changelog'], {
      help: 'update message'
    })

    return parser.parseArgs()
  },

  init () {
    const path = require('path')
    const args = this.parseArgs()
    const currentPackage = require(path.join(process.cwd(), '/package.json'))
    const url = args.url || path.join(currentPackage.homepage, '/appupdate.json')
    console.log({
      release: currentPackage.version,
      changelog: args.changelog || 'New release: ' + currentPackage.version,
      url,
      date: Date().toString()
    })
  }
}

if (require.main === module) {
  console.error(process.cwd())
  appupdate.init()
}
