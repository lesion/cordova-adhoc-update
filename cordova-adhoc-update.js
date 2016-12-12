/* global fetch */
/* eslint-disable camelcase */
import { gt as newestRelease } from 'semver'
export default {
  update_url: null, // update
  current_release: '0.0.0', // app release
  release_url: '',

  update (ios = false) {
    var url
    url = ios ? `itms-services://?action=download-manifest&url=${this.release_url}` : this.release_url
    return window.open(url, '_system')
  },

  /**
   * initialize appupdate & check for new update !
   * @param  {Object} data {update_url: 'http://update.remote.server/manifest.json', release: '0.0.2'}
   * @return {Promise} [description]
   */
  check (data) {
    Object.assign(this, data)

    if (!this.update_url) {
      return Promise.reject('[AppUpdate] `update_url` not specified !')
    }

    return fetch(this.update_url)
      .then(function (response) {
        if (response.status >= 400) throw new Error(response)
        return response.json()
      })
      .then(last_release => {
        // check if remote release is newer than current one
        if (!last_release.hasOwnProperty('release')) throw new Error('`release` not found in remote manifest')
        if (!last_release.hasOwnProperty('url')) throw new Error('`url` not found in remote manifest')
        this.release_url = last_release.url

        return (newestRelease(last_release.release, this.current_release) ? last_release : false)
      })
  }
}

/*
  {
    "release": "0.0.1",
    "changelog": "- this is changed !" 
    "url": "http://url.to.release/manifest.plist",
    "date" : "31237182"
  }
*/
