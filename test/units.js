'use strict';

const assert = require('assert');


module.exports = function(safeValue) {
  const { getString, getNumber, getBoolean, getObject, getArray, getFunction, getAny, getObjectBatch, getArrayBatch, } = safeValue;
  describe('getString', function() {
    it('test getString', function() {
      const o = {
        _undef:undefined,
        _null:null,
        str: '1',
        number: 1,
        boolTure: true,
        boolFalse: false,
        arr:['2',2,true,false,['1',2, true],{ str: '3', number:3 }],
        fn: function(age){ return age},
        fnAsync: async function(age){ return age},
        obj:{
          str: '4',
          number: 4,
          obj:{
            obj:{
              str: '7',
              number: 7,
            }
          }
        }
      }
      const a = ['2',2,true,false,['1',2, true],{ str: '3', number:3 }];

      assert.deepStrictEqual(getString(o,'_undef'), '');
      assert.deepStrictEqual(getString(o,'_null'), '');
      assert.deepStrictEqual(getString(o,'str'), '1');
      assert.deepStrictEqual(getString(o,'number'), '1');
      assert.deepStrictEqual(getString(o,'boolTure'), 'true');
      assert.deepStrictEqual(getString(o,'boolFalse'), 'false');
      assert.deepStrictEqual(getString(o,'arr[0]'), '2');
      assert.deepStrictEqual(getString(o,'arr[1]'), '2');
      assert.deepStrictEqual(getString(o,'arr[2]'), 'true');
      assert.deepStrictEqual(getString(o,'arr[3]'), 'false');
      assert.deepStrictEqual(getString(o,'arr[4]'), '');
      assert.deepStrictEqual(getString(o,'arr[4][0]'), '1');
      assert.deepStrictEqual(getString(o,'arr[4][1]'), '2');
      assert.deepStrictEqual(getString(o,'arr[4][2]'), 'true');
      assert.deepStrictEqual(getString(o,'arr[5]'), '');
      assert.deepStrictEqual(getString(o,'arr[5].str'), '3');
      assert.deepStrictEqual(getString(o,'arr[5].number'), '3');
      assert.deepStrictEqual(getString(o,'fn'), '');
      assert.deepStrictEqual(getString(o,'fnAsync'), '');
      assert.deepStrictEqual(getString(o,'obj'), '');
      assert.deepStrictEqual(getString(o,'obj.str'), '4');
      assert.deepStrictEqual(getString(o,'obj.number'), '4');
      assert.deepStrictEqual(getString(o,'obj.obj.obj.str'), '7');
      assert.deepStrictEqual(getString(o,'obj.obj.obj.number'), '7');
      assert.deepStrictEqual(getString(o,['obj','obj', 'obj','str']), '7');
      assert.deepStrictEqual(getString(o,['obj','obj', 'obj','number']), '7');

      
      assert.deepStrictEqual(getString(a,'0'), '2');
      assert.deepStrictEqual(getString(a,'1'), '2');
      assert.deepStrictEqual(getString(a,2), 'true');
      assert.deepStrictEqual(getString(a,3), 'false');
      assert.deepStrictEqual(getString(a,4), '');
      assert.deepStrictEqual(getString(a,5), '');
      assert.deepStrictEqual(getString(a,'4[0]'), '1');
      assert.deepStrictEqual(getString(a,'4[1]'), '2');
      assert.deepStrictEqual(getString(a,'4[2]'), 'true');
      assert.deepStrictEqual(getString(a,'5.str'), '3');
      assert.deepStrictEqual(getString(a,'5.number'), '3');

    });
  });

  describe('getNumber', function() {
    it('test getNumber', function() {
      const o = {
        _undef:undefined,
        _null:null,
        str: '1',
        number: 1,
        boolTure: true,
        boolFalse: false,
        arr:['2',2,true,false,['1',2, true],{ str: '3', number:3 }],
        fn: function(age){ return age},
        fnAsync: async function(age){ return age},
        obj:{
          str: '4',
          number: 4,
          obj:{
            obj:{
              str: '7',
              number: 7,
            }
          }
        }
      }
      const a = ['2',2,true,false,['1',2, true],{ str: '3', number:3 }];

      assert.deepStrictEqual(getNumber(o,'_undef'), 0);
      assert.deepStrictEqual(getNumber(o,'_null'), 0);
      assert.deepStrictEqual(getNumber(o,'str'), 1);
      assert.deepStrictEqual(getNumber(o,'number'), 1);
      assert.deepStrictEqual(getNumber(o,'boolTure'), 1);
      assert.deepStrictEqual(getNumber(o,'boolFalse'), 0);
      assert.deepStrictEqual(getNumber(o,'arr[0]'), 2);
      assert.deepStrictEqual(getNumber(o,'arr[1]'), 2);
      assert.deepStrictEqual(getNumber(o,'arr[2]'), 1);
      assert.deepStrictEqual(getNumber(o,'arr[3]'), 0);
      assert.deepStrictEqual(getNumber(o,'arr[4]'), 0);
      assert.deepStrictEqual(getNumber(o,'arr[4][0]'), 1);
      assert.deepStrictEqual(getNumber(o,'arr[4][1]'), 2);
      assert.deepStrictEqual(getNumber(o,'arr[4][2]'), 1);
      assert.deepStrictEqual(getNumber(o,'arr[5]'), 0);
      assert.deepStrictEqual(getNumber(o,'arr[5].str'), 3);
      assert.deepStrictEqual(getNumber(o,'arr[5].number'), 3);
      assert.deepStrictEqual(getNumber(o,'fn'), 0);
      assert.deepStrictEqual(getNumber(o,'fnAsync'), 0);
      assert.deepStrictEqual(getNumber(o,'obj'), 0);
      assert.deepStrictEqual(getNumber(o,'obj.str'), 4);
      assert.deepStrictEqual(getNumber(o,'obj.number'), 4);
      assert.deepStrictEqual(getNumber(o,'obj.obj.obj.str'), 7);
      assert.deepStrictEqual(getNumber(o,'obj.obj.obj.number'), 7);
      assert.deepStrictEqual(getNumber(o,['obj','obj', 'obj','str']), 7);
      assert.deepStrictEqual(getNumber(o,['obj','obj', 'obj','number']), 7);

      assert.deepStrictEqual(getNumber(a,'0'), 2);
      assert.deepStrictEqual(getNumber(a,'1'), 2);
      assert.deepStrictEqual(getNumber(a,2), 1);
      assert.deepStrictEqual(getNumber(a,3), 0);
      assert.deepStrictEqual(getNumber(a,4), 0);
      assert.deepStrictEqual(getNumber(a,5), 0);
      assert.deepStrictEqual(getNumber(a,'4[0]'), 1);
      assert.deepStrictEqual(getNumber(a,'4[1]'), 2);
      assert.deepStrictEqual(getNumber(a,'4[2]'), 1);
      assert.deepStrictEqual(getNumber(a,'5.str'), 3);
      assert.deepStrictEqual(getNumber(a,'5.number'), 3);

    });
  });


  describe('getBoolean', function() {
    it('test getBoolean', function() {
      const o = {
        _undef:undefined,
        _null:null,
        str: '1',
        number: 1,
        boolTure: true,
        boolFalse: false,
        arr:['2',2,true,false,['1',2, true],{ str: '3', number:3 }],
        fn: function(age){ return age},
        fnAsync: async function(age){ return age},
        obj:{
          str: '4',
          number: 4,
          obj:{
            obj:{
              str: '7',
              number: 7,
            }
          }
        }
      }
      const a = ['2',2,true,false,['1',2, true],{ str: '3', number:3 }];

      assert.deepStrictEqual(getBoolean(o,'_undef'), false);
      assert.deepStrictEqual(getBoolean(o,'_null'), false);
      assert.deepStrictEqual(getBoolean(o,'str'), false);
      assert.deepStrictEqual(getBoolean(o,'number'), true);
      assert.deepStrictEqual(getBoolean(o,'boolTure'), true);
      assert.deepStrictEqual(getBoolean(o,'boolFalse'), false);
      assert.deepStrictEqual(getBoolean(o,'arr[0]'), false);
      assert.deepStrictEqual(getBoolean(o,'arr[1]'), false);
      assert.deepStrictEqual(getBoolean(o,'arr[2]'), true);
      assert.deepStrictEqual(getBoolean(o,'arr[3]'), false);
      assert.deepStrictEqual(getBoolean(o,'arr[4]'), false);
      assert.deepStrictEqual(getBoolean(o,'arr[4][0]'), false);
      assert.deepStrictEqual(getBoolean(o,'arr[4][1]'), false);
      assert.deepStrictEqual(getBoolean(o,'arr[4][2]'), true);
      assert.deepStrictEqual(getBoolean(o,'arr[5]'), false);
      assert.deepStrictEqual(getBoolean(o,'arr[5].str'), false);
      assert.deepStrictEqual(getBoolean(o,'arr[5].number'), false);
      assert.deepStrictEqual(getBoolean(o,'fn'), false);
      assert.deepStrictEqual(getBoolean(o,'fnAsync'), false);
      assert.deepStrictEqual(getBoolean(o,'obj'), false);
      assert.deepStrictEqual(getBoolean(o,'obj.str'), false);
      assert.deepStrictEqual(getBoolean(o,'obj.number'), false);
      assert.deepStrictEqual(getBoolean(o,'obj.obj.obj.str'), false);
      assert.deepStrictEqual(getBoolean(o,'obj.obj.obj.number'), false);
      assert.deepStrictEqual(getBoolean(o,['obj','obj', 'obj','str']), false);
      assert.deepStrictEqual(getBoolean(o,['obj','obj', 'obj','number']), false);

      assert.deepStrictEqual(getBoolean(a,'0'), false);
      assert.deepStrictEqual(getBoolean(a,'1'), false);
      assert.deepStrictEqual(getBoolean(a,2), true);
      assert.deepStrictEqual(getBoolean(a,3), false);

    });
  });


  describe('getObject', function() {
    it('test getString', function() {
      const o = {
        _undef:undefined,
        _null:null,
        str: '1',
        number: 1,
        boolTure: true,
        boolFalse: false,
        arr:['2',2,true,false,['1',2, true],{ str: '3', number:3 }],
        fn: function(age){ return age},
        fnAsync: async function(age){ return age},
        obj:{
          str: '4',
          number: 4,
          obj:{
            obj:{
              str: '7',
              number: 7,
            }
          }
        }
      }
      const a = ['2',2,true,false,['1',2, true],{ str: '3', number:3 }];

      assert.deepStrictEqual(getObject(o,'_undef'), {});
      assert.deepStrictEqual(getObject(o,'_null'), {});
      assert.deepStrictEqual(getObject(o,'str'), {});
      assert.deepStrictEqual(getObject(o,'number'), {});
      assert.deepStrictEqual(getObject(o,'boolTure'), {});
      assert.deepStrictEqual(getObject(o,'boolFalse'), {});
      assert.deepStrictEqual(getObject(o,'arr[0]'), {});
      assert.deepStrictEqual(getObject(o,'arr[1]'), {});
      assert.deepStrictEqual(getObject(o,'arr[2]'), {});
      assert.deepStrictEqual(getObject(o,'arr[3]'), {});
      assert.deepStrictEqual(getObject(o,'arr[4]'), {});
      assert.deepStrictEqual(getObject(o,'arr[4][0]'), {});
      assert.deepStrictEqual(getObject(o,'arr[4][1]'), {});
      assert.deepStrictEqual(getObject(o,'arr[4][2]'), {});
      assert.deepStrictEqual(getObject(o,'arr[5]'), o.arr[5]);
      assert.deepStrictEqual(getObject(o,'arr[5].str'), {});
      assert.deepStrictEqual(getObject(o,'arr[5].number'), {});
      assert.deepStrictEqual(getObject(o,'fn'), {});
      assert.deepStrictEqual(getObject(o,'fnAsync'), {});
      assert.deepStrictEqual(getObject(o,'obj'), o.obj);
      assert.deepStrictEqual(getObject(o,'obj.str'), {});
      assert.deepStrictEqual(getObject(o,'obj.number'), {});
      assert.deepStrictEqual(getObject(o,'obj.obj'), o.obj.obj);
      assert.deepStrictEqual(getObject(o,'obj.obj.obj.str'), {});
      assert.deepStrictEqual(getObject(o,'obj.obj.obj.number'), {});


    });
  });


  describe('getArray', function() {
    it('test getArray', function() {
      const o = {
        _undef:undefined,
        _null:null,
        str: '1',
        number: 1,
        boolTure: true,
        boolFalse: false,
        arr:['2',2,true,false,['1',2, true],{ str: '3', number:3 }],
        fn: function(age){ return age},
        fnAsync: async function(age){ return age},
        obj:{
          str: '4',
          number: 4,
          obj:{
            obj:{
              str: '7',
              number: 7,
            }
          }
        }
      }
      const a = ['2',2,true,false,['1',2, true],{ str: '3', number:3 }];

      assert.deepStrictEqual(getArray(o,'_undef'), []);
      assert.deepStrictEqual(getArray(o,'_null'), []);
      assert.deepStrictEqual(getArray(o,'str'), []);
      assert.deepStrictEqual(getArray(o,'number'), []);
      assert.deepStrictEqual(getArray(o,'boolTure'), []);
      assert.deepStrictEqual(getArray(o,'boolFalse'), []);
      assert.deepStrictEqual(getArray(o,'arr'), o.arr);
      assert.deepStrictEqual(getArray(o,'arr[0]'), []);
      assert.deepStrictEqual(getArray(o,'arr[1]'), []);
      assert.deepStrictEqual(getArray(o,'arr[2]'), []);
      assert.deepStrictEqual(getArray(o,'arr[3]'), []);
      assert.deepStrictEqual(getArray(o,'arr[4]'), o.arr[4]);
      assert.deepStrictEqual(getArray(o,'arr[4][0]'), []);
      assert.deepStrictEqual(getArray(o,'arr[4][1]'), []);
      assert.deepStrictEqual(getArray(o,'arr[4][2]'), []);
      assert.deepStrictEqual(getArray(o,'arr[5]'), []);
      assert.deepStrictEqual(getArray(o,'arr[5].str'), []);
      assert.deepStrictEqual(getArray(o,'arr[5].number'), []);
      assert.deepStrictEqual(getArray(o,'fn'), []);
      assert.deepStrictEqual(getArray(o,'fnAsync'), []);
      assert.deepStrictEqual(getArray(o,'obj'), []);
      assert.deepStrictEqual(getArray(o,'obj.str'), []);
      assert.deepStrictEqual(getArray(o,'obj.number'), []);
      assert.deepStrictEqual(getArray(o,'obj.obj.obj.str'), []);
      assert.deepStrictEqual(getArray(o,['obj','obj', 'obj','str']),[]);
      assert.deepStrictEqual(getArray(a,'0'), []);
      assert.deepStrictEqual(getArray(a,'1'), []);
      assert.deepStrictEqual(getArray(a,2), []);
      assert.deepStrictEqual(getArray(a,3), []);
      assert.deepStrictEqual(getArray(a,4), a[4]);
      assert.deepStrictEqual(getArray(a,5), []);
    });
  });


  describe('getFunction', function() {
    it('test getFunction', function() {
      const o = {
        _undef:undefined,
        _null:null,
        str: '1',
        number: 1,
        boolTure: true,
        boolFalse: false,
        arr:['2',2,true,false,['1',2, true],{ str: '3', number:3 }],
        fn: function(age){ return age},
        fnAsync: async function(age){ return age},
        obj:{
          str: '4',
          number: 4,
          obj:{
            obj:{
              str: '7',
              number: 7,
            }
          }
        }
      }
      const a = ['2',2,true,false,['1',2, true],{ str: '3', number:3 }];
      const defaultFunction = function(){};
      assert.deepStrictEqual(getFunction(o,'_undef', defaultFunction), defaultFunction);
      assert.deepStrictEqual(getFunction(o,'fn'), o.fn);
      assert.deepStrictEqual(getFunction(o,'fnAsync', defaultFunction), o.fnAsync);

    });
  });

  describe('getAny', function() {
    it('test getAny', function() {
      const o = {
        _undef:undefined,
        _null:null,
        str: '1',
        number: 1,
        boolTure: true,
        boolFalse: false,
        arr:['2',2,true,false,['1',2, true],{ str: '3', number:3 }],
        fn: function(age){ return age},
        fnAsync: async function(age){ return age},
        obj:{
          str: '4',
          number: 4,
          obj:{
            obj:{
              str: '7',
              number: 7,
            }
          }
        }
      }
      const a = ['2',2,true,false,['1',2, true],{ str: '3', number:3 }];

      assert.deepStrictEqual(getAny(o,'_undef'), undefined);
      assert.deepStrictEqual(getAny(o,'_null'), null);
      assert.deepStrictEqual(getAny(o,'str'), '1');
      assert.deepStrictEqual(getAny(o,'number'), 1);
      assert.deepStrictEqual(getAny(o,'boolTure'), true);
      assert.deepStrictEqual(getAny(o,'boolFalse'), false);
      assert.deepStrictEqual(getAny(o,'arr'), o.arr);
      assert.deepStrictEqual(getAny(o,'fn'), o.fn);
      assert.deepStrictEqual(getAny(o,'fnAsync'), o.fnAsync);
      assert.deepStrictEqual(getAny(o,'obj'), o.obj);
      assert.deepStrictEqual(getAny(o,'hello'), undefined);

    });
  });


  describe('getObjectBatch', function() {
    it('test getObjectBatch', function() {
      const o = {
        str: '1',
        number: 1,
        bool: true,
        arr:[1,2,3],
        obj:{
          age: 40
        }
      };

      const keys = [
        ["str","string"],
        ["number","number"],
        ["bool","boolean"],
        ["arr","array"],
        ["obj","object"],
      ]

      assert.deepStrictEqual(getObjectBatch(o,keys), o);

    });
  });

  describe('getArrayBatch', function() {
    it('test getArrayBatch', function() {
      const arr = [
        {
          str: '1',
          number: 1,
          bool: true,
          arr:[1,2,3],
          obj:{
            age: 40
          }
        }
      ]

      const keys = [
        ["str","string"],
        ["number","number"],
        ["bool","boolean"],
        ["arr","array"],
        ["obj","object"],
      ]

      assert.deepStrictEqual(getArrayBatch(arr,keys), arr);

    });
  });


  

};
