/* global describe, it */

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import appupdate from '../appupdate'
const expect = chai.expect

chai.use(chaiAsPromised)

describe('cordova-appupdate', function () {
  it('should throw if not initialized', function () {
    return expect(appupdate.init()).to.eventually.be.rejectedWith('[AppUpdate]')
  })

  it('should do what...', function (done) {
    
  })
})