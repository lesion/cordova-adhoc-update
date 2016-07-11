/* global fetch */
/* eslint-disable camelcase */
import semver from 'semver'
export default {
  update_url: null, // update
  current_release: '0.0.0', // app release
  last_release: {},

  upgrade () {
    return window.open(this.metadata.url)
    // window.open(`itms-services://?action=download-manifest&url=${this.metadata.url}`)
  },

  /**
   * initialize appupdate & check for new update !
   * @param  {Object} data {update_url: 'http://update.remote.server/manifest.json', '0.0.2'}
   * @return {Promise} [description]
   */
  init (data) {
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
        return (semver.gt(last_release.release, this.current_release) ? last_release : false)
      })
  }
}

/*
  {
    "release": "0.0.1",
    "changelog": "- this is changed !" 
    "plist_url": "http://myPlistURL/manifest.plist",
    "date" : "31237182"
  }
*/
