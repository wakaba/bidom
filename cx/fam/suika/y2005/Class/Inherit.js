/**
  Defines inheritance.
  
  Example:
    - Declares inheritance:
        Subclass.inherits (Superclass);
    - Calls superclass's constructor:
        Subclass._superclass.apply (this, [arguments]);
    - Calls superclass's method:
        Superclass._super.methodName.apply (this, []);
  
  @param Super        Superclass.
  @param copyStatic_  Whether static members should be copied to subclass or not.
  @param defineSuper_ Whether |_superclass| and |_super| properties should
                      be defined or not.  If the parameter value is |undefined|
                      or set to |true|, then they are defined.
*/
Function.prototype.inherits = function (Super, copyStatic_, defineSuper_) {
  var Traits = function () {};
  Traits.prototype = Super.prototype;
  this.prototype = new Traits();
  this.prototype.constructor = this;
  if (copyStatic_) {
    for (var p in Super) {
      if (typeof this[p] == 'undefined') {
        this[p] = Super[p]
      }
    }
  }
  if (defineSuper_ == undefined || defineSuper_) {
    this._superclass = Super;
    this._super = Super.prototype;
  }
}

/* Source: <http://d.hatena.ne.jp/m-hiyama/20051018/1129605002> */
