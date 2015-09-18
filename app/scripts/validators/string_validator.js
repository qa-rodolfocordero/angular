'use strict';

//Email Validator
Object.defineProperty(String.prototype,'isEmail',{
  get: function()
  {
    var re=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return re.test(this);
  }
});
// set max and min lenght
Object.defineProperty(String.prototype,'setMaxLength',{
  get: function(number)
  {
    this.maxLength=number;
  }
});
Object.defineProperty(String.prototype,'getMaxLength',{
  get: function()
  {
    return this.maxLength;
  }
});
//is lenght Max valid
Object.defineProperty(String.prototype,'isLengthMaxValid',{
  get: function()
  {
    document.write(this.maxLength);
     return this.length>=this.maxLength;
  }
});

Object.defineProperty(String.prototype,'isEmpty',{
  get: function()
  {
    return (this || "").replace( /^(\s|\u00A0)+|(\s|\u00A0)+$/g, "" )==="";
  }
});
