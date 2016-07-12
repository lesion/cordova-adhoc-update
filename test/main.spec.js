/* global describe, it */

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import appUpdate from '../cordova-adhoc-app-update'
const expect = chai.expect

chai.use(chaiAsPromised)

describe('cordova-adhoc-app-update', function () {
  it('should throw if not initialized', function () {
    return expect(appUpdate.check()).to.eventually.be.rejectedWith('[AppUpdate]')
  })

})
