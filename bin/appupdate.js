#!/usr/bin/env node
'use strict'

const fs = require('fs-promise')
const path = require('path')
const term = require('terminal-kit').terminal
const cwd = process.cwd()

const error = () => term.bold.error.red('[ERROR]    ').red
const warning = () => term.bold.error.yellow('[WARNING] ').yellow
let info = () => term.bold.blue('[INFO]    ').blue

var appupdate = {
  parseArgs () {
    const ArgumentParser = require('argparse').ArgumentParser
    const parser = new ArgumentParser({
      version: '1.1.0',
      addHelp: true,
      description: '`cordova-adhoc-update`'
    })

    parser.addArgument(['-u', '--url'], {
      help: 'url to publish your .ipa'
    })

    parser.addArgument(['-c', '--changelog'], {
      help: 'update message'
    })

    parser.addArgument(['-o', '--outputDir'], {
      help: 'this is where all files will be stored ! [default: appupdate]'
    })

    parser.addArgument(['-p', '--package'], {
      help: 'compiled package, this will be moved (.ipa)'
    })

    return parser.parseArgs()
  },

  readCordovaConfig () {
    const xml2js = require('xml2js-es6-promise')

    return fs.readFile(path.join(cwd, 'config.xml'))
      .then(xml2js)
      .then(xml => xml.widget)
  },

  init () {
    const plistTpl = require('./plistTpl')
    const indexTpl = require('./indexTpl')

    const args = this.parseArgs()
    let npmPackage = null

    try {
      npmPackage = require(path.join(cwd, 'package.json'))
    } catch (e) {
      error()('No package.json found in current directory !')
      return
    }

    // read cordova config.xml (get app name and release from here !)
    this.readCordovaConfig()

      .then(widget => {
        const outputDir = args.output || 'appupdate'
        widget.url = args.url || npmPackage.homepage

        if (!widget.url) {
          error()('Please specify `homepage` field in your package.json or -u arg\n')
          return
        }

        fs.ensureDirSync(outputDir)

        if (npmPackage.version !== widget.$.version) {
          warning()('package.json version ').bold.red(npmPackage.version)
            .yellow(' / config.xml version ').bold.red(widget.$.version + '\n')
        }

        const releaseData = {
          release: widget.$.version,
          changelog: args.changelog || 'New release: ' + widget.$.version,
          url: `${widget.url.replace(/\/$/, '')}/app_${widget.$.version}.plist`,
          date: Date().toString()
        }

        info()('NAME    ').bold.blue(`${npmPackage.name}\n`)
        info()('BUNDLE  ').bold.blue(`${widget.$.id}\n`)
        info()('RELEASE ').bold.blue(`${releaseData.release}\n`)
        if (!widget.icon) {
          error()('ICON not found in config.xml\n')
        } else {
          info()('ICON    ').bold.blue(`${widget.icon[0].$.src}\n`)
          fs.copy(widget.icon[0].$.src, path.join(outputDir, 'icon.png'))
            .then(e => {
              info()('Icon copied!\n')
            })
            .catch(e => warning()('No icon found in ' + e).bold.yellow(widget.icon[0].$.src + '\n'))
        }

        const files = [
          { name: `app_${releaseData.release}.plist`, content: plistTpl(widget) },
          { name: 'appupdate.json', content: JSON.stringify(releaseData, null, 2) },
          { name: 'index.html', content: indexTpl(widget) }
        ]

        // move ipa file !
        if (args.package) {
          const packagePath = `${path.join(outputDir, widget.name[0])}.${widget.$.version}.ipa`
          fs.copy(args.package, packagePath)
            .then(info()('Copy ').bold.blue(args.package).blue(' to ').bold.blue(packagePath + '\n'))
            .catch(error)
        }

        files.forEach(file => {
          fs.writeFile(path.join(outputDir, file.name), file.content)
            .then(() => info()('writeFile file %s\n', path.join(outputDir, file.name)))
            .catch(e => {
              error()(e + '\n')
            })
        })
      })
      .catch(e => {
        error()('config.xml not found! Are you in a cordova project? \n')
        console.error(e)
        console.stack()
      })
  }
}

if (require.main === module) {
  appupdate.init()
}
