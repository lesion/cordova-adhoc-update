[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## [Documentation](http://lesion.github.io/cordova-adhoc-update)


# Introduction

Few lines and some examples to show you how 
`cordova-adhoc-update` works.
First of all, forget this is something you can use
for public app (published in stores), you want to
use this only for adhoc / enterprise app.

Usually what you do to makes you users update an app,
is to publish a new `.ipa` (iOS) or `.apk` (Android)
somewhere on internet and send an email to them with
the link (ok, you have to prepare a landing page
with a link pointing to itms-something and a properly
written `.plist`).

What cordova-adhoc-update does is to automate
this process for you.

# Installation


```shell
npm i cordova-adhoc-update --save
```

# CLI Usage

`cordova-adhoc-update` comes with a beautiful cli interface that let you
do these boring operation a breeze.

Let's assume you have an `.ipa` ready for production, you only need
to make cordova-adhoc-update do its job:

```shell
cordova-adhoc-update
```

This command will do a lot of things starting from your cordova `config.xml` and
your npm `package.json` files.

1. Create a directory called `appupdate` (you can change it using __-o__ flag)
2. Create an iOS `app.plist` file based on your current cordova configuration
   The .plist needs a __package name__, a __version__ , the __bundle id__,
   and url used to publish our `.ipa` package (taken from the `homepage` field of your `package.json` file or specified with the __-u__ flag) and optionally a __description__

3. Create an nice `index.html` pointing to the previous created `app.plist` with 
  the `itms-service://` stuff...

4. Copy the icon specified in your `config.xml`

```shell
cd appupdate
python3 -m http-server

# or if you are a node.js guy
http-server -p 8000 
```
<aside class='notice'>
  At this point, you can serve content from `appupdate` directory with a http-server and open the page from your device or locally at `http://localhost:8000`
</aside>

5. Create a `manifest.json` with all the info needed by the client to know if this is a new release or the current one

# JS Usage

```javascript
import appupdate from 'cordova-adhoc-update'

appupdate.check('http://url.where.appupdate.json.is', current_app_release )
  .then( (rel) => {
    console.log('Hey man, we have a new release here')
    console.log('is the %s', rel.release)
    console.log('with this changelog: %s', rel.changelog)
    
    // if you wanna update
    appupdate.update()
  })

```
