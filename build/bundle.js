/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  update_url: null, // update url
	  current_release: '0.0', // app release
	  metadata: {},

	  init: function init(data) {
	    Object.assign(this, data);

	    // another possible way to do the same
	    // { this.update_url, this.current_release } = data
	  },
	  upgrade: function upgrade() {
	    window.open('itms-services://?action=download-manifest&url=' + this.metadata.url);
	  },
	  check: function check() {
	    if (!this.update_url) {
	      return Promise.reject('[AppUpdate] Have you specified `update_url` in metadata ?');
	    }

	    return fetch(this.update_url).then(function (response) {
	      if (response.status >= 400) throw new Error(response);

	      return response.json();
	    }).then(function (releases) {
	      console.error(releases, 'releases');

	      // search for newest releases
	    });
	  }
	};
	/*

	{
	  "releases":
	  [
	    {
	      "version": "0.0.1",
	      "changelog": "- ciao questo e' cambiato blablabla" 
	      "plist_url": "http://servizi.beste.it/reader/reader.plist",
	      "date" : "31237182"
	    },
	    {
	      "version": "0.0.2",
	      "changelog": "- ciao questo e' cambiato blablabla" 
	      "plist_url": "http://servizi.beste.it/reader/reader.plist",
	      "date" : "31237182"
	    }
	  ]
	}

	*/

/***/ }
/******/ ]);