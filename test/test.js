
'use strict';

const { getTime } = require('../index');
const assert = require('assert');


const timestamps = 1603267335599;

describe('getTime', function() {
  it('test getTime', function() {
    assert.deepStrictEqual(getTime(timestamps), '2020-10-21 16:02:15');
    assert.deepStrictEqual(getTime(timestamps, 'yyyy/mm/dd hh:mm:ss'), '2020/10/21 16:02:15');
    assert.deepStrictEqual(getTime(timestamps, 'yyyy年mm月dd日 hh:mm:ss'), '2020年10月21日 16:02:15');
    assert.deepStrictEqual(getTime(timestamps, 'yyyy/mm/dd week hh:mm:ss'), '2020/10/21 周三 16:02:15');
    assert.deepStrictEqual(getTime(timestamps, 'yyyy/mm/dd w hh:mm:ss'), '2020/10/21 周三 16:02:15');
    assert.deepStrictEqual(getTime(timestamps, 'yyyy/mm/dd hh:mm:ss 周'), '2020/10/21 16:02:15 周三');
    assert.deepStrictEqual(getTime(timestamps, 'yyyy/mm/dd hh:mm:ss 星期'), '2020/10/21 16:02:15 星期三');
    assert.deepStrictEqual(getTime(timestamps, 'yyyy/mm/dd am hh:mm:ss'), '2020/10/21 下午 16:02:15');
    assert.deepStrictEqual(getTime(timestamps, 'yyyy/mm/dd pm hh:mm:ss'), '2020/10/21 下午 16:02:15');
    assert.deepStrictEqual(getTime(timestamps, 'yy/m/d hh:mm:ss'), '20/10/21 16:02:15');
    assert.deepStrictEqual(getTime(timestamps, 'yyyy-mm-dd'), '2020-10-21');
    assert.deepStrictEqual(getTime(timestamps, 'hh:mm:ss'), '16:02:15');
    assert.deepStrictEqual(getTime(timestamps, 'h:m:s'), '16:2:15');
    assert.deepStrictEqual(getTime(timestamps, 'hh:mm'), '16:02');
  });
});

