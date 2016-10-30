//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [rev. #1]

module.exports = function(v, offset, count){

  if( null == offset ) offset = 0
  if( null == count ) count = v.length

  for(var j, x, i = count; i; j = parseInt(Math.random() * i), --i, x = v[ offset + i ], v[ offset + i] = v[ offset + j], v[offset + j] = x);

  return v;
};
