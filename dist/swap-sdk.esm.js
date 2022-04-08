import JSBI from 'jsbi';
export { default as JSBI } from 'jsbi';
import invariant from 'tiny-invariant';
import warning from 'tiny-warning';
import { getAddress, getCreate2Address } from '@ethersproject/address';
import _Big from 'big.js';
import toFormat from 'toformat';
import _Decimal from 'decimal.js-light';
import { keccak256, pack } from '@ethersproject/solidity';
import { Contract } from '@ethersproject/contracts';
import { getNetwork } from '@ethersproject/networks';
import { getDefaultProvider } from '@ethersproject/providers';

var _FACTORY_ADDRESS, _INIT_CODE_HASH, _SOLIDITY_TYPE_MAXIMA;
var ChainId;

(function (ChainId) {
  ChainId[ChainId["MAINNET"] = 56] = "MAINNET";
  ChainId[ChainId["TESTNET"] = 97] = "TESTNET";
})(ChainId || (ChainId = {}));

var TradeType;

(function (TradeType) {
  TradeType[TradeType["EXACT_INPUT"] = 0] = "EXACT_INPUT";
  TradeType[TradeType["EXACT_OUTPUT"] = 1] = "EXACT_OUTPUT";
})(TradeType || (TradeType = {}));

var Rounding;

(function (Rounding) {
  Rounding[Rounding["ROUND_DOWN"] = 0] = "ROUND_DOWN";
  Rounding[Rounding["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
  Rounding[Rounding["ROUND_UP"] = 2] = "ROUND_UP";
})(Rounding || (Rounding = {}));

var FACTORY_ADDRESS = (_FACTORY_ADDRESS = {}, _FACTORY_ADDRESS[ChainId.MAINNET] = "0x96A3CbC01DFe417813258Feb50E2FdF3e2eF55F9", _FACTORY_ADDRESS[ChainId.TESTNET] = "0x288f840c23DeDa5bbB1Ca950C2033C354CEaF4ad", _FACTORY_ADDRESS);
var INIT_CODE_HASH = (_INIT_CODE_HASH = {}, _INIT_CODE_HASH[ChainId.MAINNET] = "0x6cbd54185813805bfdf336e0600bf3c272e510df5d084bda83e7793458f3f22b", _INIT_CODE_HASH[ChainId.TESTNET] = '0x6cbd54185813805bfdf336e0600bf3c272e510df5d084bda83e7793458f3f22b', _INIT_CODE_HASH);
var MINIMUM_LIQUIDITY = /*#__PURE__*/JSBI.BigInt(1000); // exports for internal consumption

var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1);
var TWO = /*#__PURE__*/JSBI.BigInt(2);
var THREE = /*#__PURE__*/JSBI.BigInt(3);
var FIVE = /*#__PURE__*/JSBI.BigInt(5);
var TEN = /*#__PURE__*/JSBI.BigInt(10);
var _100 = /*#__PURE__*/JSBI.BigInt(100);
var _9975 = /*#__PURE__*/JSBI.BigInt(9975);
var _10000 = /*#__PURE__*/JSBI.BigInt(10000);
var ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
var SolidityType;

(function (SolidityType) {
  SolidityType["uint8"] = "uint8";
  SolidityType["uint256"] = "uint256";
})(SolidityType || (SolidityType = {}));

var SOLIDITY_TYPE_MAXIMA = (_SOLIDITY_TYPE_MAXIMA = {}, _SOLIDITY_TYPE_MAXIMA[SolidityType.uint8] = /*#__PURE__*/JSBI.BigInt('0xff'), _SOLIDITY_TYPE_MAXIMA[SolidityType.uint256] = /*#__PURE__*/JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'), _SOLIDITY_TYPE_MAXIMA);

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// see https://stackoverflow.com/a/41102306
var CAN_SET_PROTOTYPE = ('setPrototypeOf' in Object);
/**
 * Indicates that the pair has insufficient reserves for a desired output amount. I.e. the amount of output cannot be
 * obtained by sending any amount of input.
 */

var InsufficientReservesError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(InsufficientReservesError, _Error);

  function InsufficientReservesError() {
    var _this;

    _this = _Error.call(this) || this;
    _this.isInsufficientReservesError = true;
    _this.name = _this.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof InsufficientReservesError ? this.constructor : void 0).prototype);
    return _this;
  }

  return InsufficientReservesError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Indicates that the input amount is too small to produce any amount of output. I.e. the amount of input sent is less
 * than the price of a single unit of output after fees.
 */

var InsufficientInputAmountError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(InsufficientInputAmountError, _Error2);

  function InsufficientInputAmountError() {
    var _this2;

    _this2 = _Error2.call(this) || this;
    _this2.isInsufficientInputAmountError = true;
    _this2.name = _this2.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this2), (this instanceof InsufficientInputAmountError ? this.constructor : void 0).prototype);
    return _this2;
  }

  return InsufficientInputAmountError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

function validateSolidityTypeInstance(value, solidityType) {
  !JSBI.greaterThanOrEqual(value, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, value + " is not a " + solidityType + ".") : invariant(false) : void 0;
  !JSBI.lessThanOrEqual(value, SOLIDITY_TYPE_MAXIMA[solidityType]) ? process.env.NODE_ENV !== "production" ? invariant(false, value + " is not a " + solidityType + ".") : invariant(false) : void 0;
} // warns if addresses are not checksummed

function validateAndParseAddress(address) {
  try {
    var checksummedAddress = getAddress(address);
    process.env.NODE_ENV !== "production" ? warning(address === checksummedAddress, address + " is not checksummed.") : void 0;
    return checksummedAddress;
  } catch (error) {
     process.env.NODE_ENV !== "production" ? invariant(false, address + " is not a valid address.") : invariant(false) ;
  }
}
function parseBigintIsh(bigintIsh) {
  return bigintIsh instanceof JSBI ? bigintIsh : typeof bigintIsh === 'bigint' ? JSBI.BigInt(bigintIsh.toString()) : JSBI.BigInt(bigintIsh);
} // mock the on-chain sqrt function

function sqrt(y) {
  validateSolidityTypeInstance(y, SolidityType.uint256);
  var z = ZERO;
  var x;

  if (JSBI.greaterThan(y, THREE)) {
    z = y;
    x = JSBI.add(JSBI.divide(y, TWO), ONE);

    while (JSBI.lessThan(x, z)) {
      z = x;
      x = JSBI.divide(JSBI.add(JSBI.divide(y, x), x), TWO);
    }
  } else if (JSBI.notEqual(y, ZERO)) {
    z = ONE;
  }

  return z;
} // given an array of items sorted by `comparator`, insert an item into its sort index and constrain the size to
// `maxSize` by removing the last item

function sortedInsert(items, add, maxSize, comparator) {
  !(maxSize > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MAX_SIZE_ZERO') : invariant(false) : void 0; // this is an invariant because the interface cannot return multiple removed items if items.length exceeds maxSize

  !(items.length <= maxSize) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ITEMS_SIZE') : invariant(false) : void 0; // short circuit first item add

  if (items.length === 0) {
    items.push(add);
    return null;
  } else {
    var isFull = items.length === maxSize; // short circuit if full and the additional item does not come before the last item

    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add;
    }

    var lo = 0,
        hi = items.length;

    while (lo < hi) {
      var mid = lo + hi >>> 1;

      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }

    items.splice(lo, 0, add);
    return isFull ? items.pop() : null;
  }
}

/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */

var Currency =
/**
 * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
 * @param decimals decimals of the currency
 * @param symbol symbol of the currency
 * @param name of the currency
 */
function Currency(decimals, symbol, name) {
  validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8);
  this.decimals = decimals;
  this.symbol = symbol;
  this.name = name;
};
/**
 * The only instance of the base class `Currency`.
 */

Currency.ETHER = /*#__PURE__*/new Currency(18, 'BNB', 'BNB');
var ETHER = Currency.ETHER;

var _WETH;
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */

var Token = /*#__PURE__*/function (_Currency) {
  _inheritsLoose(Token, _Currency);

  function Token(chainId, address, decimals, symbol, name, projectLink) {
    var _this;

    _this = _Currency.call(this, decimals, symbol, name) || this;
    _this.chainId = chainId;
    _this.address = validateAndParseAddress(address);
    _this.projectLink = projectLink;
    return _this;
  }
  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */


  var _proto = Token.prototype;

  _proto.equals = function equals(other) {
    // short circuit on reference equality
    if (this === other) {
      return true;
    }

    return this.chainId === other.chainId && this.address === other.address;
  }
  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  ;

  _proto.sortsBefore = function sortsBefore(other) {
    !(this.chainId === other.chainId) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_IDS') : invariant(false) : void 0;
    !(this.address !== other.address) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ADDRESSES') : invariant(false) : void 0;
    return this.address.toLowerCase() < other.address.toLowerCase();
  };

  return Token;
}(Currency);
/**
 * Compares two currencies for equality
 */

function currencyEquals(currencyA, currencyB) {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB);
  } else if (currencyA instanceof Token) {
    return false;
  } else if (currencyB instanceof Token) {
    return false;
  } else {
    return currencyA === currencyB;
  }
}
var WETH = (_WETH = {}, _WETH[ChainId.MAINNET] = /*#__PURE__*/new Token(ChainId.MAINNET, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB'), _WETH[ChainId.TESTNET] = /*#__PURE__*/new Token(ChainId.TESTNET, '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', 18, 'WBNB', 'Wrapped BNB'), _WETH);

var _toSignificantRoundin, _toFixedRounding;
var Decimal = /*#__PURE__*/toFormat(_Decimal);
var Big = /*#__PURE__*/toFormat(_Big);
var toSignificantRounding = (_toSignificantRoundin = {}, _toSignificantRoundin[Rounding.ROUND_DOWN] = Decimal.ROUND_DOWN, _toSignificantRoundin[Rounding.ROUND_HALF_UP] = Decimal.ROUND_HALF_UP, _toSignificantRoundin[Rounding.ROUND_UP] = Decimal.ROUND_UP, _toSignificantRoundin);
var toFixedRounding = (_toFixedRounding = {}, _toFixedRounding[Rounding.ROUND_DOWN] = 0, _toFixedRounding[Rounding.ROUND_HALF_UP] = 1, _toFixedRounding[Rounding.ROUND_UP] = 3, _toFixedRounding);
var Fraction = /*#__PURE__*/function () {
  function Fraction(numerator, denominator) {
    if (denominator === void 0) {
      denominator = ONE;
    }

    this.numerator = parseBigintIsh(numerator);
    this.denominator = parseBigintIsh(denominator);
  } // performs floor division


  var _proto = Fraction.prototype;

  _proto.invert = function invert() {
    return new Fraction(this.denominator, this.numerator);
  };

  _proto.add = function add(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.add(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.add(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.subtract = function subtract(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.subtract(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.subtract(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.lessThan = function lessThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.lessThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.equalTo = function equalTo(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.equal(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.greaterThan = function greaterThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.greaterThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.multiply = function multiply(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.numerator), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.divide = function divide(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(this.denominator, otherParsed.numerator));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(significantDigits) ? process.env.NODE_ENV !== "production" ? invariant(false, significantDigits + " is not an integer.") : invariant(false) : void 0;
    !(significantDigits > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, significantDigits + " is not positive.") : invariant(false) : void 0;
    Decimal.set({
      precision: significantDigits + 1,
      rounding: toSignificantRounding[rounding]
    });
    var quotient = new Decimal(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(decimalPlaces) ? process.env.NODE_ENV !== "production" ? invariant(false, decimalPlaces + " is not an integer.") : invariant(false) : void 0;
    !(decimalPlaces >= 0) ? process.env.NODE_ENV !== "production" ? invariant(false, decimalPlaces + " is negative.") : invariant(false) : void 0;
    Big.DP = decimalPlaces;
    Big.RM = toFixedRounding[rounding];
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(decimalPlaces, format);
  };

  _createClass(Fraction, [{
    key: "quotient",
    get: function get() {
      return JSBI.divide(this.numerator, this.denominator);
    } // remainder after floor division

  }, {
    key: "remainder",
    get: function get() {
      return new Fraction(JSBI.remainder(this.numerator, this.denominator), this.denominator);
    }
  }]);

  return Fraction;
}();

var Big$1 = /*#__PURE__*/toFormat(_Big);
var CurrencyAmount = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(CurrencyAmount, _Fraction);

  // amount _must_ be raw, i.e. in the native representation
  function CurrencyAmount(currency, amount) {
    var _this;

    var parsedAmount = parseBigintIsh(amount);
    validateSolidityTypeInstance(parsedAmount, SolidityType.uint256);
    _this = _Fraction.call(this, parsedAmount, JSBI.exponentiate(TEN, JSBI.BigInt(currency.decimals))) || this;
    _this.currency = currency;
    return _this;
  }
  /**
   * Helper that calls the constructor with the ETHER currency
   * @param amount ether amount in wei
   */


  CurrencyAmount.ether = function ether(amount) {
    return new CurrencyAmount(ETHER, amount);
  };

  var _proto = CurrencyAmount.prototype;

  _proto.add = function add(other) {
    !currencyEquals(this.currency, other.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    return new CurrencyAmount(this.currency, JSBI.add(this.raw, other.raw));
  };

  _proto.subtract = function subtract(other) {
    !currencyEquals(this.currency, other.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    return new CurrencyAmount(this.currency, JSBI.subtract(this.raw, other.raw));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    if (rounding === void 0) {
      rounding = Rounding.ROUND_DOWN;
    }

    return _Fraction.prototype.toSignificant.call(this, significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = this.currency.decimals;
    }

    if (rounding === void 0) {
      rounding = Rounding.ROUND_DOWN;
    }

    !(decimalPlaces <= this.currency.decimals) ? process.env.NODE_ENV !== "production" ? invariant(false, 'DECIMALS') : invariant(false) : void 0;
    return _Fraction.prototype.toFixed.call(this, decimalPlaces, format, rounding);
  };

  _proto.toExact = function toExact(format) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    Big$1.DP = this.currency.decimals;
    return new Big$1(this.numerator.toString()).div(this.denominator.toString()).toFormat(format);
  };

  _createClass(CurrencyAmount, [{
    key: "raw",
    get: function get() {
      return this.numerator;
    }
  }]);

  return CurrencyAmount;
}(Fraction);

var TokenAmount = /*#__PURE__*/function (_CurrencyAmount) {
  _inheritsLoose(TokenAmount, _CurrencyAmount);

  // amount _must_ be raw, i.e. in the native representation
  function TokenAmount(token, amount) {
    var _this;

    _this = _CurrencyAmount.call(this, token, amount) || this;
    _this.token = token;
    return _this;
  }

  var _proto = TokenAmount.prototype;

  _proto.add = function add(other) {
    !this.token.equals(other.token) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    return new TokenAmount(this.token, JSBI.add(this.raw, other.raw));
  };

  _proto.subtract = function subtract(other) {
    !this.token.equals(other.token) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    return new TokenAmount(this.token, JSBI.subtract(this.raw, other.raw));
  };

  return TokenAmount;
}(CurrencyAmount);

var Price = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Price, _Fraction);

  // denominator and numerator _must_ be raw, i.e. in the native representation
  function Price(baseCurrency, quoteCurrency, denominator, numerator) {
    var _this;

    _this = _Fraction.call(this, numerator, denominator) || this;
    _this.baseCurrency = baseCurrency;
    _this.quoteCurrency = quoteCurrency;
    _this.scalar = new Fraction(JSBI.exponentiate(TEN, JSBI.BigInt(baseCurrency.decimals)), JSBI.exponentiate(TEN, JSBI.BigInt(quoteCurrency.decimals)));
    return _this;
  }

  Price.fromRoute = function fromRoute(route) {
    var prices = [];

    for (var _iterator = _createForOfIteratorHelperLoose(route.pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pair = _step$value[1];
      prices.push(route.path[i].equals(pair.token0) ? new Price(pair.reserve0.currency, pair.reserve1.currency, pair.reserve0.raw, pair.reserve1.raw) : new Price(pair.reserve1.currency, pair.reserve0.currency, pair.reserve1.raw, pair.reserve0.raw));
    }

    return prices.slice(1).reduce(function (accumulator, currentValue) {
      return accumulator.multiply(currentValue);
    }, prices[0]);
  };

  var _proto = Price.prototype;

  _proto.invert = function invert() {
    return new Price(this.quoteCurrency, this.baseCurrency, this.numerator, this.denominator);
  };

  _proto.multiply = function multiply(other) {
    !currencyEquals(this.quoteCurrency, other.baseCurrency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;

    var fraction = _Fraction.prototype.multiply.call(this, other);

    return new Price(this.baseCurrency, other.quoteCurrency, fraction.denominator, fraction.numerator);
  } // performs floor division on overflow
  ;

  _proto.quote = function quote(currencyAmount) {
    !currencyEquals(currencyAmount.currency, this.baseCurrency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;

    if (this.quoteCurrency instanceof Token) {
      return new TokenAmount(this.quoteCurrency, _Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient);
    }

    return CurrencyAmount.ether(_Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient);
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    return this.adjusted.toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 4;
    }

    return this.adjusted.toFixed(decimalPlaces, format, rounding);
  };

  _createClass(Price, [{
    key: "raw",
    get: function get() {
      return new Fraction(this.numerator, this.denominator);
    }
  }, {
    key: "adjusted",
    get: function get() {
      return _Fraction.prototype.multiply.call(this, this.scalar);
    }
  }]);

  return Price;
}(Fraction);

var PAIR_ADDRESS_CACHE = {};
var Pair = /*#__PURE__*/function () {
  function Pair(tokenAmountA, tokenAmountB, baseToken, totalFee) {
    if (baseToken === void 0) {
      baseToken = ZERO_ADDRESS;
    }

    if (totalFee === void 0) {
      totalFee = 1400;
    }

    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    this.liquidityToken = new Token(tokenAmounts[0].token.chainId, Pair.getAddress(tokenAmounts[0].token, tokenAmounts[1].token, tokenAmounts[0].token.chainId), 18, 'PYE-LP', 'PYESwap-LP');
    this.baseToken = baseToken;
    this.totalFee = !baseToken || baseToken === ZERO_ADDRESS ? JSBI.BigInt("0") : JSBI.BigInt(totalFee);
    this.tokenAmounts = tokenAmounts;
  }

  Pair.getAddress = function getAddress(tokenA, tokenB, chainId) {
    var _PAIR_ADDRESS_CACHE, _PAIR_ADDRESS_CACHE$t;

    if (chainId === void 0) {
      chainId = ChainId.TESTNET;
    }

    var tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]; // does safety checks

    if (((_PAIR_ADDRESS_CACHE = PAIR_ADDRESS_CACHE) === null || _PAIR_ADDRESS_CACHE === void 0 ? void 0 : (_PAIR_ADDRESS_CACHE$t = _PAIR_ADDRESS_CACHE[tokens[0].address]) === null || _PAIR_ADDRESS_CACHE$t === void 0 ? void 0 : _PAIR_ADDRESS_CACHE$t[tokens[1].address]) === undefined) {
      var _PAIR_ADDRESS_CACHE2, _extends2, _extends3;

      PAIR_ADDRESS_CACHE = _extends({}, PAIR_ADDRESS_CACHE, (_extends3 = {}, _extends3[tokens[0].address] = _extends({}, (_PAIR_ADDRESS_CACHE2 = PAIR_ADDRESS_CACHE) === null || _PAIR_ADDRESS_CACHE2 === void 0 ? void 0 : _PAIR_ADDRESS_CACHE2[tokens[0].address], (_extends2 = {}, _extends2[tokens[1].address] = getCreate2Address( // @ts-ignore
      FACTORY_ADDRESS[chainId || tokenA.chainId], keccak256(['bytes'], [pack(['address', 'address'], [tokens[0].address, tokens[1].address])]), INIT_CODE_HASH[chainId || tokenA.chainId]), _extends2)), _extends3));
    }

    return PAIR_ADDRESS_CACHE[tokens[0].address][tokens[1].address];
  }
  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  ;

  var _proto = Pair.prototype;

  _proto.involvesToken = function involvesToken(token) {
    return token.equals(this.token0) || token.equals(this.token1);
  }
  /**
   * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
  ;

  /**
   * Return the price of the given token in terms of the other token in the pair.
   * @param token token to return price of
   */
  _proto.priceOf = function priceOf(token) {
    !this.involvesToken(token) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    return token.equals(this.token0) ? this.token0Price : this.token1Price;
  }
  /**
   * Returns the chain ID of the tokens in the pair.
   */
  ;

  _proto.reserveOf = function reserveOf(token) {
    !this.involvesToken(token) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    return token.equals(this.token0) ? this.reserve0 : this.reserve1;
  };

  _proto.getOutputAmount = function getOutputAmount(inputAmount) {
    !this.involvesToken(inputAmount.token) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;

    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO)) {
      throw new InsufficientReservesError();
    }

    var fee = this.baseToken === ZERO_ADDRESS ? _9975 : JSBI.subtract(_9975, this.totalFee);
    var inputReserve = this.reserveOf(inputAmount.token);
    var outputReserve = this.reserveOf(inputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var inputAmountWithFee = JSBI.multiply(inputAmount.raw, fee);
    var numerator = JSBI.multiply(inputAmountWithFee, outputReserve.raw);
    var denominator = JSBI.add(JSBI.multiply(inputReserve.raw, _10000), inputAmountWithFee);
    var outputAmount = new TokenAmount(inputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.divide(numerator, denominator));

    if (JSBI.equal(outputAmount.raw, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount), this.baseToken, JSBI.toNumber(this.totalFee))];
  };

  _proto.getInputAmount = function getInputAmount(outputAmount) {
    !this.involvesToken(outputAmount.token) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;

    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO) || JSBI.greaterThanOrEqual(outputAmount.raw, this.reserveOf(outputAmount.token).raw)) {
      throw new InsufficientReservesError();
    }

    var fee = this.baseToken === ZERO_ADDRESS ? _9975 : JSBI.subtract(_9975, this.totalFee);
    var outputReserve = this.reserveOf(outputAmount.token);
    var inputReserve = this.reserveOf(outputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var numerator = JSBI.multiply(JSBI.multiply(inputReserve.raw, outputAmount.raw), _10000);
    var denominator = JSBI.multiply(JSBI.subtract(outputReserve.raw, outputAmount.raw), fee);
    var inputAmount = new TokenAmount(outputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.add(JSBI.divide(numerator, denominator), ONE));
    return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount), this.baseToken, JSBI.toNumber(this.totalFee))];
  };

  _proto.getLiquidityMinted = function getLiquidityMinted(totalSupply, tokenAmountA, tokenAmountB) {
    !totalSupply.token.equals(this.liquidityToken) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY') : invariant(false) : void 0;
    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    !(tokenAmounts[0].token.equals(this.token0) && tokenAmounts[1].token.equals(this.token1)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    var liquidity;

    if (JSBI.equal(totalSupply.raw, ZERO)) {
      liquidity = JSBI.subtract(sqrt(JSBI.multiply(tokenAmounts[0].raw, tokenAmounts[1].raw)), MINIMUM_LIQUIDITY);
    } else {
      var amount0 = JSBI.divide(JSBI.multiply(tokenAmounts[0].raw, totalSupply.raw), this.reserve0.raw);
      var amount1 = JSBI.divide(JSBI.multiply(tokenAmounts[1].raw, totalSupply.raw), this.reserve1.raw);
      liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1;
    }

    if (!JSBI.greaterThan(liquidity, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return new TokenAmount(this.liquidityToken, liquidity);
  };

  _proto.getLiquidityValue = function getLiquidityValue(token, totalSupply, liquidity, feeOn, kLast) {
    if (feeOn === void 0) {
      feeOn = false;
    }

    !this.involvesToken(token) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    !totalSupply.token.equals(this.liquidityToken) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOTAL_SUPPLY') : invariant(false) : void 0;
    !liquidity.token.equals(this.liquidityToken) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY') : invariant(false) : void 0;
    !JSBI.lessThanOrEqual(liquidity.raw, totalSupply.raw) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY') : invariant(false) : void 0;
    var totalSupplyAdjusted;

    if (!feeOn) {
      totalSupplyAdjusted = totalSupply;
    } else {
      !!!kLast ? process.env.NODE_ENV !== "production" ? invariant(false, 'K_LAST') : invariant(false) : void 0;
      var kLastParsed = parseBigintIsh(kLast);

      if (!JSBI.equal(kLastParsed, ZERO)) {
        var rootK = sqrt(JSBI.multiply(this.reserve0.raw, this.reserve1.raw));
        var rootKLast = sqrt(kLastParsed);

        if (JSBI.greaterThan(rootK, rootKLast)) {
          var numerator = JSBI.multiply(totalSupply.raw, JSBI.subtract(rootK, rootKLast));
          var denominator = JSBI.add(JSBI.multiply(rootK, FIVE), rootKLast);
          var feeLiquidity = JSBI.divide(numerator, denominator);
          totalSupplyAdjusted = totalSupply.add(new TokenAmount(this.liquidityToken, feeLiquidity));
        } else {
          totalSupplyAdjusted = totalSupply;
        }
      } else {
        totalSupplyAdjusted = totalSupply;
      }
    }

    return new TokenAmount(token, JSBI.divide(JSBI.multiply(liquidity.raw, this.reserveOf(token).raw), totalSupplyAdjusted.raw));
  };

  _createClass(Pair, [{
    key: "token0Price",
    get: function get() {
      return new Price(this.token0, this.token1, this.tokenAmounts[0].raw, this.tokenAmounts[1].raw);
    }
    /**
     * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
     */

  }, {
    key: "token1Price",
    get: function get() {
      return new Price(this.token1, this.token0, this.tokenAmounts[1].raw, this.tokenAmounts[0].raw);
    }
  }, {
    key: "chainId",
    get: function get() {
      return this.token0.chainId;
    }
  }, {
    key: "token0",
    get: function get() {
      return this.tokenAmounts[0].token;
    }
  }, {
    key: "token1",
    get: function get() {
      return this.tokenAmounts[1].token;
    }
  }, {
    key: "reserve0",
    get: function get() {
      return this.tokenAmounts[0];
    }
  }, {
    key: "reserve1",
    get: function get() {
      return this.tokenAmounts[1];
    }
  }]);

  return Pair;
}();

var Route = /*#__PURE__*/function () {
  function Route(pairs, input, output) {
    !(pairs.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'PAIRS') : invariant(false) : void 0;
    !pairs.every(function (pair) {
      return pair.chainId === pairs[0].chainId;
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_IDS') : invariant(false) : void 0;
    !(input instanceof Token && pairs[0].involvesToken(input) || input === ETHER && pairs[0].involvesToken(WETH[pairs[0].chainId])) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT') : invariant(false) : void 0;
    !(typeof output === 'undefined' || output instanceof Token && pairs[pairs.length - 1].involvesToken(output) || output === ETHER && pairs[pairs.length - 1].involvesToken(WETH[pairs[0].chainId])) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT') : invariant(false) : void 0;
    var path = [input instanceof Token ? input : WETH[pairs[0].chainId]];

    for (var _iterator = _createForOfIteratorHelperLoose(pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pair = _step$value[1];
      var currentInput = path[i];
      !(currentInput.equals(pair.token0) || currentInput.equals(pair.token1)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'PATH') : invariant(false) : void 0;

      var _output = currentInput.equals(pair.token0) ? pair.token1 : pair.token0;

      path.push(_output);
    }

    this.pairs = pairs;
    this.path = path;
    this.midPrice = Price.fromRoute(this);
    this.input = input;
    this.output = output !== null && output !== void 0 ? output : path[path.length - 1];
  }

  _createClass(Route, [{
    key: "chainId",
    get: function get() {
      return this.pairs[0].chainId;
    }
  }]);

  return Route;
}();

var _100_PERCENT = /*#__PURE__*/new Fraction(_100);

var Percent = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Percent, _Fraction);

  function Percent() {
    return _Fraction.apply(this, arguments) || this;
  }

  var _proto = Percent.prototype;

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 5;
    }

    return this.multiply(_100_PERCENT).toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 2;
    }

    return this.multiply(_100_PERCENT).toFixed(decimalPlaces, format, rounding);
  };

  return Percent;
}(Fraction);

/**
 * Returns the percent difference between the mid price and the execution price, i.e. price impact.
 * @param midPrice mid price before the trade
 * @param inputAmount the input amount of the trade
 * @param outputAmount the output amount of the trade
 */

function computePriceImpact(midPrice, inputAmount, outputAmount) {
  var exactQuote = midPrice.raw.multiply(inputAmount.raw); // calculate slippage := (exactQuote - outputAmount) / exactQuote

  var slippage = exactQuote.subtract(outputAmount.raw).divide(exactQuote);
  return new Percent(slippage.numerator, slippage.denominator);
} // comparator function that allows sorting trades by their output amounts, in decreasing order, and then input amounts
// in increasing order. i.e. the best trades have the most outputs for the least inputs and are sorted first


function inputOutputComparator(a, b) {
  // must have same input and output token for comparison
  !currencyEquals(a.inputAmount.currency, b.inputAmount.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT_CURRENCY') : invariant(false) : void 0;
  !currencyEquals(a.outputAmount.currency, b.outputAmount.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT_CURRENCY') : invariant(false) : void 0;

  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      return 0;
    } // trade A requires less input than trade B, so A should come first


    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
} // extension of the input output comparator that also considers other dimensions of the trade in ranking them

function tradeComparator(a, b) {
  var ioComp = inputOutputComparator(a, b);

  if (ioComp !== 0) {
    return ioComp;
  } // consider lowest slippage next, since these are less likely to fail


  if (a.priceImpact.lessThan(b.priceImpact)) {
    return -1;
  } else if (a.priceImpact.greaterThan(b.priceImpact)) {
    return 1;
  } // finally consider the number of hops since each hop costs gas


  return a.route.path.length - b.route.path.length;
}
/**
 * Given a currency amount and a chain ID, returns the equivalent representation as the token amount.
 * In other words, if the currency is ETHER, returns the WETH token amount for the given chain. Otherwise, returns
 * the input currency amount.
 */

function wrappedAmount(currencyAmount, chainId) {
  if (currencyAmount instanceof TokenAmount) return currencyAmount;
  if (currencyAmount.currency === ETHER) return new TokenAmount(WETH[chainId], currencyAmount.raw);
   process.env.NODE_ENV !== "production" ? invariant(false, 'CURRENCY') : invariant(false) ;
}

function wrappedCurrency(currency, chainId) {
  if (currency instanceof Token) return currency;
  if (currency === ETHER) return WETH[chainId];
   process.env.NODE_ENV !== "production" ? invariant(false, 'CURRENCY') : invariant(false) ;
}
/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */


var Trade = /*#__PURE__*/function () {
  function Trade(route, amount, tradeType) {
    var amounts = new Array(route.path.length);
    var nextPairs = new Array(route.pairs.length);

    if (tradeType === TradeType.EXACT_INPUT) {
      !currencyEquals(amount.currency, route.input) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT') : invariant(false) : void 0;
      amounts[0] = wrappedAmount(amount, route.chainId);

      for (var i = 0; i < route.path.length - 1; i++) {
        var pair = route.pairs[i];

        var _pair$getOutputAmount = pair.getOutputAmount(amounts[i]),
            outputAmount = _pair$getOutputAmount[0],
            nextPair = _pair$getOutputAmount[1];

        amounts[i + 1] = outputAmount;
        nextPairs[i] = nextPair;
      }
    } else {
      !currencyEquals(amount.currency, route.output) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT') : invariant(false) : void 0;
      amounts[amounts.length - 1] = wrappedAmount(amount, route.chainId);

      for (var _i = route.path.length - 1; _i > 0; _i--) {
        var _pair = route.pairs[_i - 1];

        var _pair$getInputAmount = _pair.getInputAmount(amounts[_i]),
            inputAmount = _pair$getInputAmount[0],
            _nextPair = _pair$getInputAmount[1];

        amounts[_i - 1] = inputAmount;
        nextPairs[_i - 1] = _nextPair;
      }
    }

    this.route = route;
    this.tradeType = tradeType;
    this.inputAmount = tradeType === TradeType.EXACT_INPUT ? amount : route.input === ETHER ? CurrencyAmount.ether(amounts[0].raw) : amounts[0];
    this.outputAmount = tradeType === TradeType.EXACT_OUTPUT ? amount : route.output === ETHER ? CurrencyAmount.ether(amounts[amounts.length - 1].raw) : amounts[amounts.length - 1];
    this.executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.raw, this.outputAmount.raw);
    this.nextMidPrice = Price.fromRoute(new Route(nextPairs, route.input));
    this.priceImpact = computePriceImpact(route.midPrice, this.inputAmount, this.outputAmount);
  }
  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */


  Trade.exactIn = function exactIn(route, amountIn) {
    return new Trade(route, amountIn, TradeType.EXACT_INPUT);
  }
  /**
   * Constructs an exact out trade with the given amount out and route
   * @param route route of the exact out trade
   * @param amountOut the amount returned by the trade
   */
  ;

  Trade.exactOut = function exactOut(route, amountOut) {
    return new Trade(route, amountOut, TradeType.EXACT_OUTPUT);
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  var _proto = Trade.prototype;

  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SLIPPAGE_TOLERANCE') : invariant(false) : void 0;

    if (this.tradeType === TradeType.EXACT_OUTPUT) {
      return this.outputAmount;
    } else {
      var slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(this.outputAmount.raw).quotient;
      return this.outputAmount instanceof TokenAmount ? new TokenAmount(this.outputAmount.token, slippageAdjustedAmountOut) : CurrencyAmount.ether(slippageAdjustedAmountOut);
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SLIPPAGE_TOLERANCE') : invariant(false) : void 0;

    if (this.tradeType === TradeType.EXACT_INPUT) {
      return this.inputAmount;
    } else {
      var slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(this.inputAmount.raw).quotient;
      return this.inputAmount instanceof TokenAmount ? new TokenAmount(this.inputAmount.token, slippageAdjustedAmountIn) : CurrencyAmount.ether(slippageAdjustedAmountIn);
    }
  }
  /**
   * Given a list of pairs, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param currencyAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param originalAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactIn = function bestTradeExactIn(pairs, currencyAmountIn, currencyOut, _temp, // used in recursion.
  currentPairs, originalAmountIn, bestTrades) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$maxNumResults = _ref.maxNumResults,
        maxNumResults = _ref$maxNumResults === void 0 ? 3 : _ref$maxNumResults,
        _ref$maxHops = _ref.maxHops,
        maxHops = _ref$maxHops === void 0 ? 3 : _ref$maxHops;

    if (currentPairs === void 0) {
      currentPairs = [];
    }

    if (originalAmountIn === void 0) {
      originalAmountIn = currencyAmountIn;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pairs.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'PAIRS') : invariant(false) : void 0;
    !(maxHops > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MAX_HOPS') : invariant(false) : void 0;
    !(originalAmountIn === currencyAmountIn || currentPairs.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INVALID_RECURSION') : invariant(false) : void 0;
    var chainId = currencyAmountIn instanceof TokenAmount ? currencyAmountIn.token.chainId : currencyOut instanceof Token ? currencyOut.chainId : undefined;
    !(chainId !== undefined) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_ID') : invariant(false) : void 0;
    var amountIn = wrappedAmount(currencyAmountIn, chainId);
    var tokenOut = wrappedCurrency(currencyOut, chainId);

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]; // pair irrelevant

      if (!pair.token0.equals(amountIn.token) && !pair.token1.equals(amountIn.token)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountOut = void 0;

      try {
        ;

        var _pair$getOutputAmount2 = pair.getOutputAmount(amountIn);

        amountOut = _pair$getOutputAmount2[0];
      } catch (error) {
        // input too low
        if (error.isInsufficientInputAmountError) {
          continue;
        }

        throw error;
      } // we have arrived at the output token, so this is the final trade of one of the paths


      if (amountOut.token.equals(tokenOut)) {
        sortedInsert(bestTrades, new Trade(new Route([].concat(currentPairs, [pair]), originalAmountIn.currency, currencyOut), originalAmountIn, TradeType.EXACT_INPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length)); // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops

        Trade.bestTradeExactIn(pairsExcludingThisPair, amountOut, currencyOut, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [].concat(currentPairs, [pair]), originalAmountIn, bestTrades);
      }
    }

    return bestTrades;
  }
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pairs, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param originalAmountOut used in recursion; the original value of the currencyAmountOut parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactOut = function bestTradeExactOut(pairs, currencyIn, currencyAmountOut, _temp2, // used in recursion.
  currentPairs, originalAmountOut, bestTrades) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$maxNumResults = _ref2.maxNumResults,
        maxNumResults = _ref2$maxNumResults === void 0 ? 3 : _ref2$maxNumResults,
        _ref2$maxHops = _ref2.maxHops,
        maxHops = _ref2$maxHops === void 0 ? 3 : _ref2$maxHops;

    if (currentPairs === void 0) {
      currentPairs = [];
    }

    if (originalAmountOut === void 0) {
      originalAmountOut = currencyAmountOut;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pairs.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'PAIRS') : invariant(false) : void 0;
    !(maxHops > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MAX_HOPS') : invariant(false) : void 0;
    !(originalAmountOut === currencyAmountOut || currentPairs.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INVALID_RECURSION') : invariant(false) : void 0;
    var chainId = currencyAmountOut instanceof TokenAmount ? currencyAmountOut.token.chainId : currencyIn instanceof Token ? currencyIn.chainId : undefined;
    !(chainId !== undefined) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_ID') : invariant(false) : void 0;
    var amountOut = wrappedAmount(currencyAmountOut, chainId);
    var tokenIn = wrappedCurrency(currencyIn, chainId);

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]; // pair irrelevant

      if (!pair.token0.equals(amountOut.token) && !pair.token1.equals(amountOut.token)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountIn = void 0;

      try {
        ;

        var _pair$getInputAmount2 = pair.getInputAmount(amountOut);

        amountIn = _pair$getInputAmount2[0];
      } catch (error) {
        // not enough liquidity in this pair
        if (error.isInsufficientReservesError) {
          continue;
        }

        throw error;
      } // we have arrived at the input token, so this is the first trade of one of the paths


      if (amountIn.token.equals(tokenIn)) {
        sortedInsert(bestTrades, new Trade(new Route([pair].concat(currentPairs), currencyIn, originalAmountOut.currency), originalAmountOut, TradeType.EXACT_OUTPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length)); // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops

        Trade.bestTradeExactOut(pairsExcludingThisPair, currencyIn, amountIn, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [pair].concat(currentPairs), originalAmountOut, bestTrades);
      }
    }

    return bestTrades;
  };

  return Trade;
}();

function toHex(currencyAmount) {
  return "0x" + currencyAmount.raw.toString(16);
}

var ZERO_HEX = '0x0';
/**
 * Represents the Pancake Router, and has static methods for helping execute trades.
 */

var Router = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Router() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */


  Router.swapCallParameters = function swapCallParameters(trade, options) {
    var etherIn = trade.inputAmount.currency === ETHER;
    var etherOut = trade.outputAmount.currency === ETHER; // the router does not support both ether in and out

    !!(etherIn && etherOut) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ETHER_IN_OUT') : invariant(false) : void 0;
    !(!('ttl' in options) || options.ttl > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TTL') : invariant(false) : void 0;
    var to = validateAndParseAddress(options.recipient);
    var amountIn = toHex(trade.maximumAmountIn(options.allowedSlippage));
    var amountOut = toHex(trade.minimumAmountOut(options.allowedSlippage));
    var path = trade.route.path.map(function (token) {
      return token.address;
    });
    var deadline = 'ttl' in options ? "0x" + (Math.floor(new Date().getTime() / 1000) + options.ttl).toString(16) : "0x" + options.deadline.toString(16);
    var useFeeOnTransfer = Boolean(options.feeOnTransfer);
    var methodName;
    var args;
    var value;

    switch (trade.tradeType) {
      case TradeType.EXACT_INPUT:
        if (etherIn) {
          methodName = useFeeOnTransfer ? 'swapExactETHForTokensSupportingFeeOnTransferTokens' : 'swapExactETHForTokens'; // (uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = useFeeOnTransfer ? 'swapExactTokensForETHSupportingFeeOnTransferTokens' : 'swapExactTokensForETH'; // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = useFeeOnTransfer ? 'swapExactTokensForTokensSupportingFeeOnTransferTokens' : 'swapExactTokensForTokens'; // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        }

        break;

      case TradeType.EXACT_OUTPUT:
        !!useFeeOnTransfer ? process.env.NODE_ENV !== "production" ? invariant(false, 'EXACT_OUT_FOT') : invariant(false) : void 0;

        if (etherIn) {
          methodName = 'swapETHForExactTokens'; // (uint amountOut, address[] calldata path, address to, uint deadline)

          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = 'swapTokensForExactETH'; // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)

          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = 'swapTokensForExactTokens'; // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)

          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        }

        break;
    }

    return {
      methodName: methodName,
      args: args,
      value: value
    };
  };

  return Router;
}();

var contractName = "IPYESwapPair";
var abi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Burn",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Swap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			}
		],
		name: "Sync",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: true,
		inputs: [
		],
		name: "baseToken",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "PERMIT_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "MINIMUM_LIQUIDITY",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token0",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token1",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getReserves",
		outputs: [
			{
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			},
			{
				internalType: "uint32",
				name: "blockTimestampLast",
				type: "uint32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price0CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price1CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "kLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "burn",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount0Fee",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Fee",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "swap",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "skim",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "sync",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "_baseToken",
				type: "address"
			}
		],
		name: "setBaseToken",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	}
];
var metadata = "{\"compiler\":{\"version\":\"0.5.16+commit.9c3226ce\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"Burn\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"}],\"name\":\"Mint\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0In\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1In\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0Out\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1Out\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"Swap\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint112\",\"name\":\"reserve0\",\"type\":\"uint112\"},{\"indexed\":false,\"internalType\":\"uint112\",\"name\":\"reserve1\",\"type\":\"uint112\"}],\"name\":\"Sync\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"constant\":true,\"inputs\":[],\"name\":\"DOMAIN_SEPARATOR\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"MINIMUM_LIQUIDITY\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"PERMIT_TYPEHASH\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"baseToken\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"burn\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"factory\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getReserves\",\"outputs\":[{\"internalType\":\"uint112\",\"name\":\"reserve0\",\"type\":\"uint112\"},{\"internalType\":\"uint112\",\"name\":\"reserve1\",\"type\":\"uint112\"},{\"internalType\":\"uint32\",\"name\":\"blockTimestampLast\",\"type\":\"uint32\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"initialize\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"kLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"mint\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"liquidity\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"nonces\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"}],\"name\":\"permit\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"price0CumulativeLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"price1CumulativeLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_baseToken\",\"type\":\"address\"}],\"name\":\"setBaseToken\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"skim\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount0Out\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount1Out\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount0Fee\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount1Fee\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"swap\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"sync\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"token0\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"token1\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"project:/contracts/interfaces/IPYESwapPair.sol\":\"IPYESwapPair\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"optimizer\":{\"enabled\":true,\"runs\":999999},\"remappings\":[]},\"sources\":{\"project:/contracts/interfaces/IPYESwapPair.sol\":{\"keccak256\":\"0x7291c9f40d679f5743766b9d6e40e3d7b0745b7bce75f3b2b626d77d742f740f\",\"urls\":[\"bzz-raw://8bb55644bee013780817469581b2b7428afea6a32c3f99b3e0f3e91a988dd53e\",\"dweb:/ipfs/QmQffemEice3YRmWAjEPkW4FDaawYAimryLL3RkmyG8yY7\"]}},\"version\":1}";
var bytecode = "0x";
var deployedBytecode = "0x";
var sourceMap = "";
var deployedSourceMap = "";
var source = "pragma solidity >=0.5.0;\n\ninterface IPYESwapPair {\n    event Approval(address indexed owner, address indexed spender, uint value);\n    event Transfer(address indexed from, address indexed to, uint value);\n\n    function baseToken() external view returns (address);\n    function name() external pure returns (string memory);\n    function symbol() external pure returns (string memory);\n    function decimals() external pure returns (uint8);\n    function totalSupply() external view returns (uint);\n    function balanceOf(address owner) external view returns (uint);\n    function allowance(address owner, address spender) external view returns (uint);\n\n    function approve(address spender, uint value) external returns (bool);\n    function transfer(address to, uint value) external returns (bool);\n    function transferFrom(address from, address to, uint value) external returns (bool);\n\n    function DOMAIN_SEPARATOR() external view returns (bytes32);\n    function PERMIT_TYPEHASH() external pure returns (bytes32);\n    function nonces(address owner) external view returns (uint);\n\n    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;\n\n    event Mint(address indexed sender, uint amount0, uint amount1);\n    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);\n    event Swap(\n        address indexed sender,\n        uint amount0In,\n        uint amount1In,\n        uint amount0Out,\n        uint amount1Out,\n        address indexed to\n    );\n    event Sync(uint112 reserve0, uint112 reserve1);\n\n    function MINIMUM_LIQUIDITY() external pure returns (uint);\n    function factory() external view returns (address);\n    function token0() external view returns (address);\n    function token1() external view returns (address);\n    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);\n    function price0CumulativeLast() external view returns (uint);\n    function price1CumulativeLast() external view returns (uint);\n    function kLast() external view returns (uint);\n\n    function mint(address to) external returns (uint liquidity);\n    function burn(address to) external returns (uint amount0, uint amount1);\n    function swap(uint amount0Out, uint amount1Out, uint amount0Fee, uint amount1Fee, address to, bytes calldata data) external;\n    function skim(address to) external;\n    function sync() external;\n\n    function initialize(address, address) external;\n    function setBaseToken(address _baseToken) external;\n}\n";
var sourcePath = "G:\\projects\\pyeswap\\contracts\\compile\\swap-factory\\contracts\\interfaces\\IPYESwapPair.sol";
var ast = {
	absolutePath: "project:/contracts/interfaces/IPYESwapPair.sol",
	exportedSymbols: {
		IPYESwapPair: [
			2332
		]
	},
	id: 2333,
	nodeType: "SourceUnit",
	nodes: [
		{
			id: 2078,
			literals: [
				"solidity",
				">=",
				"0.5",
				".0"
			],
			nodeType: "PragmaDirective",
			src: "0:24:9"
		},
		{
			baseContracts: [
			],
			contractDependencies: [
			],
			contractKind: "interface",
			documentation: null,
			fullyImplemented: false,
			id: 2332,
			linearizedBaseContracts: [
				2332
			],
			name: "IPYESwapPair",
			nodeType: "ContractDefinition",
			nodes: [
				{
					anonymous: false,
					documentation: null,
					id: 2086,
					name: "Approval",
					nodeType: "EventDefinition",
					parameters: {
						id: 2085,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2080,
								indexed: true,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 2086,
								src: "70:21:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2079,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "70:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2082,
								indexed: true,
								name: "spender",
								nodeType: "VariableDeclaration",
								scope: 2086,
								src: "93:23:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2081,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "93:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2084,
								indexed: false,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 2086,
								src: "118:10:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2083,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "118:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "69:60:9"
					},
					src: "55:75:9"
				},
				{
					anonymous: false,
					documentation: null,
					id: 2094,
					name: "Transfer",
					nodeType: "EventDefinition",
					parameters: {
						id: 2093,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2088,
								indexed: true,
								name: "from",
								nodeType: "VariableDeclaration",
								scope: 2094,
								src: "150:20:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2087,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "150:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2090,
								indexed: true,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2094,
								src: "172:18:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2089,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "172:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2092,
								indexed: false,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 2094,
								src: "192:10:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2091,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "192:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "149:54:9"
					},
					src: "135:69:9"
				},
				{
					body: null,
					documentation: null,
					id: 2099,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "baseToken",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2095,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "228:2:9"
					},
					returnParameters: {
						id: 2098,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2097,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2099,
								src: "254:7:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2096,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "254:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "253:9:9"
					},
					scope: 2332,
					src: "210:53:9",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2104,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "name",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2100,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "281:2:9"
					},
					returnParameters: {
						id: 2103,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2102,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2104,
								src: "307:13:9",
								stateVariable: false,
								storageLocation: "memory",
								typeDescriptions: {
									typeIdentifier: "t_string_memory_ptr",
									typeString: "string"
								},
								typeName: {
									id: 2101,
									name: "string",
									nodeType: "ElementaryTypeName",
									src: "307:6:9",
									typeDescriptions: {
										typeIdentifier: "t_string_storage_ptr",
										typeString: "string"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "306:15:9"
					},
					scope: 2332,
					src: "268:54:9",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2109,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "symbol",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2105,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "342:2:9"
					},
					returnParameters: {
						id: 2108,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2107,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2109,
								src: "368:13:9",
								stateVariable: false,
								storageLocation: "memory",
								typeDescriptions: {
									typeIdentifier: "t_string_memory_ptr",
									typeString: "string"
								},
								typeName: {
									id: 2106,
									name: "string",
									nodeType: "ElementaryTypeName",
									src: "368:6:9",
									typeDescriptions: {
										typeIdentifier: "t_string_storage_ptr",
										typeString: "string"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "367:15:9"
					},
					scope: 2332,
					src: "327:56:9",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2114,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "decimals",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2110,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "405:2:9"
					},
					returnParameters: {
						id: 2113,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2112,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2114,
								src: "431:5:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint8",
									typeString: "uint8"
								},
								typeName: {
									id: 2111,
									name: "uint8",
									nodeType: "ElementaryTypeName",
									src: "431:5:9",
									typeDescriptions: {
										typeIdentifier: "t_uint8",
										typeString: "uint8"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "430:7:9"
					},
					scope: 2332,
					src: "388:50:9",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2119,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "totalSupply",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2115,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "463:2:9"
					},
					returnParameters: {
						id: 2118,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2117,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2119,
								src: "489:4:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2116,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "489:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "488:6:9"
					},
					scope: 2332,
					src: "443:52:9",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2126,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "balanceOf",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2122,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2121,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 2126,
								src: "519:13:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2120,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "519:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "518:15:9"
					},
					returnParameters: {
						id: 2125,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2124,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2126,
								src: "557:4:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2123,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "557:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "556:6:9"
					},
					scope: 2332,
					src: "500:63:9",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2135,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "allowance",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2131,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2128,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 2135,
								src: "587:13:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2127,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "587:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2130,
								name: "spender",
								nodeType: "VariableDeclaration",
								scope: 2135,
								src: "602:15:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2129,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "602:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "586:32:9"
					},
					returnParameters: {
						id: 2134,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2133,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2135,
								src: "642:4:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2132,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "642:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "641:6:9"
					},
					scope: 2332,
					src: "568:80:9",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2144,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "approve",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2140,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2137,
								name: "spender",
								nodeType: "VariableDeclaration",
								scope: 2144,
								src: "671:15:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2136,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "671:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2139,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 2144,
								src: "688:10:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2138,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "688:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "670:29:9"
					},
					returnParameters: {
						id: 2143,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2142,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2144,
								src: "718:4:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 2141,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "718:4:9",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "717:6:9"
					},
					scope: 2332,
					src: "654:70:9",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2153,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "transfer",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2149,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2146,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2153,
								src: "747:10:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2145,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "747:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2148,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 2153,
								src: "759:10:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2147,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "759:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "746:24:9"
					},
					returnParameters: {
						id: 2152,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2151,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2153,
								src: "789:4:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 2150,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "789:4:9",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "788:6:9"
					},
					scope: 2332,
					src: "729:66:9",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2164,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "transferFrom",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2160,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2155,
								name: "from",
								nodeType: "VariableDeclaration",
								scope: 2164,
								src: "822:12:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2154,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "822:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2157,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2164,
								src: "836:10:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2156,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "836:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2159,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 2164,
								src: "848:10:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2158,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "848:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "821:38:9"
					},
					returnParameters: {
						id: 2163,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2162,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2164,
								src: "878:4:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 2161,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "878:4:9",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "877:6:9"
					},
					scope: 2332,
					src: "800:84:9",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2169,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "DOMAIN_SEPARATOR",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2165,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "915:2:9"
					},
					returnParameters: {
						id: 2168,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2167,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2169,
								src: "941:7:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 2166,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "941:7:9",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "940:9:9"
					},
					scope: 2332,
					src: "890:60:9",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2174,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "PERMIT_TYPEHASH",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2170,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "979:2:9"
					},
					returnParameters: {
						id: 2173,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2172,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2174,
								src: "1005:7:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 2171,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "1005:7:9",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1004:9:9"
					},
					scope: 2332,
					src: "955:59:9",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2181,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "nonces",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2177,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2176,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 2181,
								src: "1035:13:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2175,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1035:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1034:15:9"
					},
					returnParameters: {
						id: 2180,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2179,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2181,
								src: "1073:4:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2178,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1073:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1072:6:9"
					},
					scope: 2332,
					src: "1019:60:9",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2198,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "permit",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2196,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2183,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 2198,
								src: "1101:13:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2182,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1101:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2185,
								name: "spender",
								nodeType: "VariableDeclaration",
								scope: 2198,
								src: "1116:15:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2184,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1116:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2187,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 2198,
								src: "1133:10:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2186,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1133:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2189,
								name: "deadline",
								nodeType: "VariableDeclaration",
								scope: 2198,
								src: "1145:13:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2188,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1145:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2191,
								name: "v",
								nodeType: "VariableDeclaration",
								scope: 2198,
								src: "1160:7:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint8",
									typeString: "uint8"
								},
								typeName: {
									id: 2190,
									name: "uint8",
									nodeType: "ElementaryTypeName",
									src: "1160:5:9",
									typeDescriptions: {
										typeIdentifier: "t_uint8",
										typeString: "uint8"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2193,
								name: "r",
								nodeType: "VariableDeclaration",
								scope: 2198,
								src: "1169:9:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 2192,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "1169:7:9",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2195,
								name: "s",
								nodeType: "VariableDeclaration",
								scope: 2198,
								src: "1180:9:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 2194,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "1180:7:9",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1100:90:9"
					},
					returnParameters: {
						id: 2197,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1199:0:9"
					},
					scope: 2332,
					src: "1085:115:9",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					anonymous: false,
					documentation: null,
					id: 2206,
					name: "Mint",
					nodeType: "EventDefinition",
					parameters: {
						id: 2205,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2200,
								indexed: true,
								name: "sender",
								nodeType: "VariableDeclaration",
								scope: 2206,
								src: "1217:22:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2199,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1217:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2202,
								indexed: false,
								name: "amount0",
								nodeType: "VariableDeclaration",
								scope: 2206,
								src: "1241:12:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2201,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1241:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2204,
								indexed: false,
								name: "amount1",
								nodeType: "VariableDeclaration",
								scope: 2206,
								src: "1255:12:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2203,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1255:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1216:52:9"
					},
					src: "1206:63:9"
				},
				{
					anonymous: false,
					documentation: null,
					id: 2216,
					name: "Burn",
					nodeType: "EventDefinition",
					parameters: {
						id: 2215,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2208,
								indexed: true,
								name: "sender",
								nodeType: "VariableDeclaration",
								scope: 2216,
								src: "1285:22:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2207,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1285:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2210,
								indexed: false,
								name: "amount0",
								nodeType: "VariableDeclaration",
								scope: 2216,
								src: "1309:12:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2209,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1309:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2212,
								indexed: false,
								name: "amount1",
								nodeType: "VariableDeclaration",
								scope: 2216,
								src: "1323:12:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2211,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1323:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2214,
								indexed: true,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2216,
								src: "1337:18:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2213,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1337:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1284:72:9"
					},
					src: "1274:83:9"
				},
				{
					anonymous: false,
					documentation: null,
					id: 2230,
					name: "Swap",
					nodeType: "EventDefinition",
					parameters: {
						id: 2229,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2218,
								indexed: true,
								name: "sender",
								nodeType: "VariableDeclaration",
								scope: 2230,
								src: "1382:22:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2217,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1382:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2220,
								indexed: false,
								name: "amount0In",
								nodeType: "VariableDeclaration",
								scope: 2230,
								src: "1414:14:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2219,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1414:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2222,
								indexed: false,
								name: "amount1In",
								nodeType: "VariableDeclaration",
								scope: 2230,
								src: "1438:14:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2221,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1438:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2224,
								indexed: false,
								name: "amount0Out",
								nodeType: "VariableDeclaration",
								scope: 2230,
								src: "1462:15:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2223,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1462:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2226,
								indexed: false,
								name: "amount1Out",
								nodeType: "VariableDeclaration",
								scope: 2230,
								src: "1487:15:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2225,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1487:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2228,
								indexed: true,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2230,
								src: "1512:18:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2227,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1512:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1372:164:9"
					},
					src: "1362:175:9"
				},
				{
					anonymous: false,
					documentation: null,
					id: 2236,
					name: "Sync",
					nodeType: "EventDefinition",
					parameters: {
						id: 2235,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2232,
								indexed: false,
								name: "reserve0",
								nodeType: "VariableDeclaration",
								scope: 2236,
								src: "1553:16:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 2231,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1553:7:9",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2234,
								indexed: false,
								name: "reserve1",
								nodeType: "VariableDeclaration",
								scope: 2236,
								src: "1571:16:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 2233,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1571:7:9",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1552:36:9"
					},
					src: "1542:47:9"
				},
				{
					body: null,
					documentation: null,
					id: 2241,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "MINIMUM_LIQUIDITY",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2237,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1621:2:9"
					},
					returnParameters: {
						id: 2240,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2239,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2241,
								src: "1647:4:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2238,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1647:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1646:6:9"
					},
					scope: 2332,
					src: "1595:58:9",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2246,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "factory",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2242,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1674:2:9"
					},
					returnParameters: {
						id: 2245,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2244,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2246,
								src: "1700:7:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2243,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1700:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1699:9:9"
					},
					scope: 2332,
					src: "1658:51:9",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2251,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "token0",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2247,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1729:2:9"
					},
					returnParameters: {
						id: 2250,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2249,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2251,
								src: "1755:7:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2248,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1755:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1754:9:9"
					},
					scope: 2332,
					src: "1714:50:9",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2256,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "token1",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2252,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1784:2:9"
					},
					returnParameters: {
						id: 2255,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2254,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2256,
								src: "1810:7:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2253,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1810:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1809:9:9"
					},
					scope: 2332,
					src: "1769:50:9",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2265,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "getReserves",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2257,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1844:2:9"
					},
					returnParameters: {
						id: 2264,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2259,
								name: "reserve0",
								nodeType: "VariableDeclaration",
								scope: 2265,
								src: "1870:16:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 2258,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1870:7:9",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2261,
								name: "reserve1",
								nodeType: "VariableDeclaration",
								scope: 2265,
								src: "1888:16:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 2260,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1888:7:9",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2263,
								name: "blockTimestampLast",
								nodeType: "VariableDeclaration",
								scope: 2265,
								src: "1906:25:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint32",
									typeString: "uint32"
								},
								typeName: {
									id: 2262,
									name: "uint32",
									nodeType: "ElementaryTypeName",
									src: "1906:6:9",
									typeDescriptions: {
										typeIdentifier: "t_uint32",
										typeString: "uint32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1869:63:9"
					},
					scope: 2332,
					src: "1824:109:9",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2270,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "price0CumulativeLast",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2266,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1967:2:9"
					},
					returnParameters: {
						id: 2269,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2268,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2270,
								src: "1993:4:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2267,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1993:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1992:6:9"
					},
					scope: 2332,
					src: "1938:61:9",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2275,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "price1CumulativeLast",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2271,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2033:2:9"
					},
					returnParameters: {
						id: 2274,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2273,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2275,
								src: "2059:4:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2272,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2059:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2058:6:9"
					},
					scope: 2332,
					src: "2004:61:9",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2280,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "kLast",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2276,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2084:2:9"
					},
					returnParameters: {
						id: 2279,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2278,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2280,
								src: "2110:4:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2277,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2110:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2109:6:9"
					},
					scope: 2332,
					src: "2070:46:9",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2287,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "mint",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2283,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2282,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2287,
								src: "2136:10:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2281,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2136:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2135:12:9"
					},
					returnParameters: {
						id: 2286,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2285,
								name: "liquidity",
								nodeType: "VariableDeclaration",
								scope: 2287,
								src: "2166:14:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2284,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2166:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2165:16:9"
					},
					scope: 2332,
					src: "2122:60:9",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2296,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "burn",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2290,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2289,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2296,
								src: "2201:10:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2288,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2201:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2200:12:9"
					},
					returnParameters: {
						id: 2295,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2292,
								name: "amount0",
								nodeType: "VariableDeclaration",
								scope: 2296,
								src: "2231:12:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2291,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2231:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2294,
								name: "amount1",
								nodeType: "VariableDeclaration",
								scope: 2296,
								src: "2245:12:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2293,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2245:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2230:28:9"
					},
					scope: 2332,
					src: "2187:72:9",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2311,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "swap",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2309,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2298,
								name: "amount0Out",
								nodeType: "VariableDeclaration",
								scope: 2311,
								src: "2278:15:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2297,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2278:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2300,
								name: "amount1Out",
								nodeType: "VariableDeclaration",
								scope: 2311,
								src: "2295:15:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2299,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2295:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2302,
								name: "amount0Fee",
								nodeType: "VariableDeclaration",
								scope: 2311,
								src: "2312:15:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2301,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2312:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2304,
								name: "amount1Fee",
								nodeType: "VariableDeclaration",
								scope: 2311,
								src: "2329:15:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2303,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2329:4:9",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2306,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2311,
								src: "2346:10:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2305,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2346:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2308,
								name: "data",
								nodeType: "VariableDeclaration",
								scope: 2311,
								src: "2358:19:9",
								stateVariable: false,
								storageLocation: "calldata",
								typeDescriptions: {
									typeIdentifier: "t_bytes_calldata_ptr",
									typeString: "bytes"
								},
								typeName: {
									id: 2307,
									name: "bytes",
									nodeType: "ElementaryTypeName",
									src: "2358:5:9",
									typeDescriptions: {
										typeIdentifier: "t_bytes_storage_ptr",
										typeString: "bytes"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2277:101:9"
					},
					returnParameters: {
						id: 2310,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2387:0:9"
					},
					scope: 2332,
					src: "2264:124:9",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2316,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "skim",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2314,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2313,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2316,
								src: "2407:10:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2312,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2407:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2406:12:9"
					},
					returnParameters: {
						id: 2315,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2427:0:9"
					},
					scope: 2332,
					src: "2393:35:9",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2319,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "sync",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2317,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2446:2:9"
					},
					returnParameters: {
						id: 2318,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2457:0:9"
					},
					scope: 2332,
					src: "2433:25:9",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2326,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "initialize",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2324,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2321,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2326,
								src: "2484:7:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2320,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2484:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2323,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2326,
								src: "2493:7:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2322,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2493:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2483:18:9"
					},
					returnParameters: {
						id: 2325,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2510:0:9"
					},
					scope: 2332,
					src: "2464:47:9",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2331,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "setBaseToken",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2329,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2328,
								name: "_baseToken",
								nodeType: "VariableDeclaration",
								scope: 2331,
								src: "2538:18:9",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2327,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2538:7:9",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2537:20:9"
					},
					returnParameters: {
						id: 2330,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2566:0:9"
					},
					scope: 2332,
					src: "2516:51:9",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				}
			],
			scope: 2333,
			src: "26:2543:9"
		}
	],
	src: "0:2570:9"
};
var legacyAST = {
	attributes: {
		absolutePath: "project:/contracts/interfaces/IPYESwapPair.sol",
		exportedSymbols: {
			IPYESwapPair: [
				2332
			]
		}
	},
	children: [
		{
			attributes: {
				literals: [
					"solidity",
					">=",
					"0.5",
					".0"
				]
			},
			id: 2078,
			name: "PragmaDirective",
			src: "0:24:9"
		},
		{
			attributes: {
				baseContracts: [
					null
				],
				contractDependencies: [
					null
				],
				contractKind: "interface",
				documentation: null,
				fullyImplemented: false,
				linearizedBaseContracts: [
					2332
				],
				name: "IPYESwapPair",
				scope: 2333
			},
			children: [
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Approval"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "owner",
										scope: 2086,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2079,
											name: "ElementaryTypeName",
											src: "70:7:9"
										}
									],
									id: 2080,
									name: "VariableDeclaration",
									src: "70:21:9"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "spender",
										scope: 2086,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2081,
											name: "ElementaryTypeName",
											src: "93:7:9"
										}
									],
									id: 2082,
									name: "VariableDeclaration",
									src: "93:23:9"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "value",
										scope: 2086,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2083,
											name: "ElementaryTypeName",
											src: "118:4:9"
										}
									],
									id: 2084,
									name: "VariableDeclaration",
									src: "118:10:9"
								}
							],
							id: 2085,
							name: "ParameterList",
							src: "69:60:9"
						}
					],
					id: 2086,
					name: "EventDefinition",
					src: "55:75:9"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Transfer"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "from",
										scope: 2094,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2087,
											name: "ElementaryTypeName",
											src: "150:7:9"
										}
									],
									id: 2088,
									name: "VariableDeclaration",
									src: "150:20:9"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "to",
										scope: 2094,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2089,
											name: "ElementaryTypeName",
											src: "172:7:9"
										}
									],
									id: 2090,
									name: "VariableDeclaration",
									src: "172:18:9"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "value",
										scope: 2094,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2091,
											name: "ElementaryTypeName",
											src: "192:4:9"
										}
									],
									id: 2092,
									name: "VariableDeclaration",
									src: "192:10:9"
								}
							],
							id: 2093,
							name: "ParameterList",
							src: "149:54:9"
						}
					],
					id: 2094,
					name: "EventDefinition",
					src: "135:69:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "baseToken",
						scope: 2332,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2095,
							name: "ParameterList",
							src: "228:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2099,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2096,
											name: "ElementaryTypeName",
											src: "254:7:9"
										}
									],
									id: 2097,
									name: "VariableDeclaration",
									src: "254:7:9"
								}
							],
							id: 2098,
							name: "ParameterList",
							src: "253:9:9"
						}
					],
					id: 2099,
					name: "FunctionDefinition",
					src: "210:53:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "name",
						scope: 2332,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2100,
							name: "ParameterList",
							src: "281:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2104,
										stateVariable: false,
										storageLocation: "memory",
										type: "string",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "string",
												type: "string"
											},
											id: 2101,
											name: "ElementaryTypeName",
											src: "307:6:9"
										}
									],
									id: 2102,
									name: "VariableDeclaration",
									src: "307:13:9"
								}
							],
							id: 2103,
							name: "ParameterList",
							src: "306:15:9"
						}
					],
					id: 2104,
					name: "FunctionDefinition",
					src: "268:54:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "symbol",
						scope: 2332,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2105,
							name: "ParameterList",
							src: "342:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2109,
										stateVariable: false,
										storageLocation: "memory",
										type: "string",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "string",
												type: "string"
											},
											id: 2106,
											name: "ElementaryTypeName",
											src: "368:6:9"
										}
									],
									id: 2107,
									name: "VariableDeclaration",
									src: "368:13:9"
								}
							],
							id: 2108,
							name: "ParameterList",
							src: "367:15:9"
						}
					],
					id: 2109,
					name: "FunctionDefinition",
					src: "327:56:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "decimals",
						scope: 2332,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2110,
							name: "ParameterList",
							src: "405:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2114,
										stateVariable: false,
										storageLocation: "default",
										type: "uint8",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint8",
												type: "uint8"
											},
											id: 2111,
											name: "ElementaryTypeName",
											src: "431:5:9"
										}
									],
									id: 2112,
									name: "VariableDeclaration",
									src: "431:5:9"
								}
							],
							id: 2113,
							name: "ParameterList",
							src: "430:7:9"
						}
					],
					id: 2114,
					name: "FunctionDefinition",
					src: "388:50:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "totalSupply",
						scope: 2332,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2115,
							name: "ParameterList",
							src: "463:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2119,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2116,
											name: "ElementaryTypeName",
											src: "489:4:9"
										}
									],
									id: 2117,
									name: "VariableDeclaration",
									src: "489:4:9"
								}
							],
							id: 2118,
							name: "ParameterList",
							src: "488:6:9"
						}
					],
					id: 2119,
					name: "FunctionDefinition",
					src: "443:52:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "balanceOf",
						scope: 2332,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "owner",
										scope: 2126,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2120,
											name: "ElementaryTypeName",
											src: "519:7:9"
										}
									],
									id: 2121,
									name: "VariableDeclaration",
									src: "519:13:9"
								}
							],
							id: 2122,
							name: "ParameterList",
							src: "518:15:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2126,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2123,
											name: "ElementaryTypeName",
											src: "557:4:9"
										}
									],
									id: 2124,
									name: "VariableDeclaration",
									src: "557:4:9"
								}
							],
							id: 2125,
							name: "ParameterList",
							src: "556:6:9"
						}
					],
					id: 2126,
					name: "FunctionDefinition",
					src: "500:63:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "allowance",
						scope: 2332,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "owner",
										scope: 2135,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2127,
											name: "ElementaryTypeName",
											src: "587:7:9"
										}
									],
									id: 2128,
									name: "VariableDeclaration",
									src: "587:13:9"
								},
								{
									attributes: {
										constant: false,
										name: "spender",
										scope: 2135,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2129,
											name: "ElementaryTypeName",
											src: "602:7:9"
										}
									],
									id: 2130,
									name: "VariableDeclaration",
									src: "602:15:9"
								}
							],
							id: 2131,
							name: "ParameterList",
							src: "586:32:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2135,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2132,
											name: "ElementaryTypeName",
											src: "642:4:9"
										}
									],
									id: 2133,
									name: "VariableDeclaration",
									src: "642:4:9"
								}
							],
							id: 2134,
							name: "ParameterList",
							src: "641:6:9"
						}
					],
					id: 2135,
					name: "FunctionDefinition",
					src: "568:80:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "approve",
						scope: 2332,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "spender",
										scope: 2144,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2136,
											name: "ElementaryTypeName",
											src: "671:7:9"
										}
									],
									id: 2137,
									name: "VariableDeclaration",
									src: "671:15:9"
								},
								{
									attributes: {
										constant: false,
										name: "value",
										scope: 2144,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2138,
											name: "ElementaryTypeName",
											src: "688:4:9"
										}
									],
									id: 2139,
									name: "VariableDeclaration",
									src: "688:10:9"
								}
							],
							id: 2140,
							name: "ParameterList",
							src: "670:29:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2144,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 2141,
											name: "ElementaryTypeName",
											src: "718:4:9"
										}
									],
									id: 2142,
									name: "VariableDeclaration",
									src: "718:4:9"
								}
							],
							id: 2143,
							name: "ParameterList",
							src: "717:6:9"
						}
					],
					id: 2144,
					name: "FunctionDefinition",
					src: "654:70:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "transfer",
						scope: 2332,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2153,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2145,
											name: "ElementaryTypeName",
											src: "747:7:9"
										}
									],
									id: 2146,
									name: "VariableDeclaration",
									src: "747:10:9"
								},
								{
									attributes: {
										constant: false,
										name: "value",
										scope: 2153,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2147,
											name: "ElementaryTypeName",
											src: "759:4:9"
										}
									],
									id: 2148,
									name: "VariableDeclaration",
									src: "759:10:9"
								}
							],
							id: 2149,
							name: "ParameterList",
							src: "746:24:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2153,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 2150,
											name: "ElementaryTypeName",
											src: "789:4:9"
										}
									],
									id: 2151,
									name: "VariableDeclaration",
									src: "789:4:9"
								}
							],
							id: 2152,
							name: "ParameterList",
							src: "788:6:9"
						}
					],
					id: 2153,
					name: "FunctionDefinition",
					src: "729:66:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "transferFrom",
						scope: 2332,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "from",
										scope: 2164,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2154,
											name: "ElementaryTypeName",
											src: "822:7:9"
										}
									],
									id: 2155,
									name: "VariableDeclaration",
									src: "822:12:9"
								},
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2164,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2156,
											name: "ElementaryTypeName",
											src: "836:7:9"
										}
									],
									id: 2157,
									name: "VariableDeclaration",
									src: "836:10:9"
								},
								{
									attributes: {
										constant: false,
										name: "value",
										scope: 2164,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2158,
											name: "ElementaryTypeName",
											src: "848:4:9"
										}
									],
									id: 2159,
									name: "VariableDeclaration",
									src: "848:10:9"
								}
							],
							id: 2160,
							name: "ParameterList",
							src: "821:38:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2164,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 2161,
											name: "ElementaryTypeName",
											src: "878:4:9"
										}
									],
									id: 2162,
									name: "VariableDeclaration",
									src: "878:4:9"
								}
							],
							id: 2163,
							name: "ParameterList",
							src: "877:6:9"
						}
					],
					id: 2164,
					name: "FunctionDefinition",
					src: "800:84:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "DOMAIN_SEPARATOR",
						scope: 2332,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2165,
							name: "ParameterList",
							src: "915:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2169,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 2166,
											name: "ElementaryTypeName",
											src: "941:7:9"
										}
									],
									id: 2167,
									name: "VariableDeclaration",
									src: "941:7:9"
								}
							],
							id: 2168,
							name: "ParameterList",
							src: "940:9:9"
						}
					],
					id: 2169,
					name: "FunctionDefinition",
					src: "890:60:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "PERMIT_TYPEHASH",
						scope: 2332,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2170,
							name: "ParameterList",
							src: "979:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2174,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 2171,
											name: "ElementaryTypeName",
											src: "1005:7:9"
										}
									],
									id: 2172,
									name: "VariableDeclaration",
									src: "1005:7:9"
								}
							],
							id: 2173,
							name: "ParameterList",
							src: "1004:9:9"
						}
					],
					id: 2174,
					name: "FunctionDefinition",
					src: "955:59:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "nonces",
						scope: 2332,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "owner",
										scope: 2181,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2175,
											name: "ElementaryTypeName",
											src: "1035:7:9"
										}
									],
									id: 2176,
									name: "VariableDeclaration",
									src: "1035:13:9"
								}
							],
							id: 2177,
							name: "ParameterList",
							src: "1034:15:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2181,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2178,
											name: "ElementaryTypeName",
											src: "1073:4:9"
										}
									],
									id: 2179,
									name: "VariableDeclaration",
									src: "1073:4:9"
								}
							],
							id: 2180,
							name: "ParameterList",
							src: "1072:6:9"
						}
					],
					id: 2181,
					name: "FunctionDefinition",
					src: "1019:60:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "permit",
						scope: 2332,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "owner",
										scope: 2198,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2182,
											name: "ElementaryTypeName",
											src: "1101:7:9"
										}
									],
									id: 2183,
									name: "VariableDeclaration",
									src: "1101:13:9"
								},
								{
									attributes: {
										constant: false,
										name: "spender",
										scope: 2198,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2184,
											name: "ElementaryTypeName",
											src: "1116:7:9"
										}
									],
									id: 2185,
									name: "VariableDeclaration",
									src: "1116:15:9"
								},
								{
									attributes: {
										constant: false,
										name: "value",
										scope: 2198,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2186,
											name: "ElementaryTypeName",
											src: "1133:4:9"
										}
									],
									id: 2187,
									name: "VariableDeclaration",
									src: "1133:10:9"
								},
								{
									attributes: {
										constant: false,
										name: "deadline",
										scope: 2198,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2188,
											name: "ElementaryTypeName",
											src: "1145:4:9"
										}
									],
									id: 2189,
									name: "VariableDeclaration",
									src: "1145:13:9"
								},
								{
									attributes: {
										constant: false,
										name: "v",
										scope: 2198,
										stateVariable: false,
										storageLocation: "default",
										type: "uint8",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint8",
												type: "uint8"
											},
											id: 2190,
											name: "ElementaryTypeName",
											src: "1160:5:9"
										}
									],
									id: 2191,
									name: "VariableDeclaration",
									src: "1160:7:9"
								},
								{
									attributes: {
										constant: false,
										name: "r",
										scope: 2198,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 2192,
											name: "ElementaryTypeName",
											src: "1169:7:9"
										}
									],
									id: 2193,
									name: "VariableDeclaration",
									src: "1169:9:9"
								},
								{
									attributes: {
										constant: false,
										name: "s",
										scope: 2198,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 2194,
											name: "ElementaryTypeName",
											src: "1180:7:9"
										}
									],
									id: 2195,
									name: "VariableDeclaration",
									src: "1180:9:9"
								}
							],
							id: 2196,
							name: "ParameterList",
							src: "1100:90:9"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2197,
							name: "ParameterList",
							src: "1199:0:9"
						}
					],
					id: 2198,
					name: "FunctionDefinition",
					src: "1085:115:9"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Mint"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "sender",
										scope: 2206,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2199,
											name: "ElementaryTypeName",
											src: "1217:7:9"
										}
									],
									id: 2200,
									name: "VariableDeclaration",
									src: "1217:22:9"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount0",
										scope: 2206,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2201,
											name: "ElementaryTypeName",
											src: "1241:4:9"
										}
									],
									id: 2202,
									name: "VariableDeclaration",
									src: "1241:12:9"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount1",
										scope: 2206,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2203,
											name: "ElementaryTypeName",
											src: "1255:4:9"
										}
									],
									id: 2204,
									name: "VariableDeclaration",
									src: "1255:12:9"
								}
							],
							id: 2205,
							name: "ParameterList",
							src: "1216:52:9"
						}
					],
					id: 2206,
					name: "EventDefinition",
					src: "1206:63:9"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Burn"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "sender",
										scope: 2216,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2207,
											name: "ElementaryTypeName",
											src: "1285:7:9"
										}
									],
									id: 2208,
									name: "VariableDeclaration",
									src: "1285:22:9"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount0",
										scope: 2216,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2209,
											name: "ElementaryTypeName",
											src: "1309:4:9"
										}
									],
									id: 2210,
									name: "VariableDeclaration",
									src: "1309:12:9"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount1",
										scope: 2216,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2211,
											name: "ElementaryTypeName",
											src: "1323:4:9"
										}
									],
									id: 2212,
									name: "VariableDeclaration",
									src: "1323:12:9"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "to",
										scope: 2216,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2213,
											name: "ElementaryTypeName",
											src: "1337:7:9"
										}
									],
									id: 2214,
									name: "VariableDeclaration",
									src: "1337:18:9"
								}
							],
							id: 2215,
							name: "ParameterList",
							src: "1284:72:9"
						}
					],
					id: 2216,
					name: "EventDefinition",
					src: "1274:83:9"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Swap"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "sender",
										scope: 2230,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2217,
											name: "ElementaryTypeName",
											src: "1382:7:9"
										}
									],
									id: 2218,
									name: "VariableDeclaration",
									src: "1382:22:9"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount0In",
										scope: 2230,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2219,
											name: "ElementaryTypeName",
											src: "1414:4:9"
										}
									],
									id: 2220,
									name: "VariableDeclaration",
									src: "1414:14:9"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount1In",
										scope: 2230,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2221,
											name: "ElementaryTypeName",
											src: "1438:4:9"
										}
									],
									id: 2222,
									name: "VariableDeclaration",
									src: "1438:14:9"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount0Out",
										scope: 2230,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2223,
											name: "ElementaryTypeName",
											src: "1462:4:9"
										}
									],
									id: 2224,
									name: "VariableDeclaration",
									src: "1462:15:9"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount1Out",
										scope: 2230,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2225,
											name: "ElementaryTypeName",
											src: "1487:4:9"
										}
									],
									id: 2226,
									name: "VariableDeclaration",
									src: "1487:15:9"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "to",
										scope: 2230,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2227,
											name: "ElementaryTypeName",
											src: "1512:7:9"
										}
									],
									id: 2228,
									name: "VariableDeclaration",
									src: "1512:18:9"
								}
							],
							id: 2229,
							name: "ParameterList",
							src: "1372:164:9"
						}
					],
					id: 2230,
					name: "EventDefinition",
					src: "1362:175:9"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Sync"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "reserve0",
										scope: 2236,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 2231,
											name: "ElementaryTypeName",
											src: "1553:7:9"
										}
									],
									id: 2232,
									name: "VariableDeclaration",
									src: "1553:16:9"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "reserve1",
										scope: 2236,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 2233,
											name: "ElementaryTypeName",
											src: "1571:7:9"
										}
									],
									id: 2234,
									name: "VariableDeclaration",
									src: "1571:16:9"
								}
							],
							id: 2235,
							name: "ParameterList",
							src: "1552:36:9"
						}
					],
					id: 2236,
					name: "EventDefinition",
					src: "1542:47:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "MINIMUM_LIQUIDITY",
						scope: 2332,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2237,
							name: "ParameterList",
							src: "1621:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2241,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2238,
											name: "ElementaryTypeName",
											src: "1647:4:9"
										}
									],
									id: 2239,
									name: "VariableDeclaration",
									src: "1647:4:9"
								}
							],
							id: 2240,
							name: "ParameterList",
							src: "1646:6:9"
						}
					],
					id: 2241,
					name: "FunctionDefinition",
					src: "1595:58:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "factory",
						scope: 2332,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2242,
							name: "ParameterList",
							src: "1674:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2246,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2243,
											name: "ElementaryTypeName",
											src: "1700:7:9"
										}
									],
									id: 2244,
									name: "VariableDeclaration",
									src: "1700:7:9"
								}
							],
							id: 2245,
							name: "ParameterList",
							src: "1699:9:9"
						}
					],
					id: 2246,
					name: "FunctionDefinition",
					src: "1658:51:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "token0",
						scope: 2332,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2247,
							name: "ParameterList",
							src: "1729:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2251,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2248,
											name: "ElementaryTypeName",
											src: "1755:7:9"
										}
									],
									id: 2249,
									name: "VariableDeclaration",
									src: "1755:7:9"
								}
							],
							id: 2250,
							name: "ParameterList",
							src: "1754:9:9"
						}
					],
					id: 2251,
					name: "FunctionDefinition",
					src: "1714:50:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "token1",
						scope: 2332,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2252,
							name: "ParameterList",
							src: "1784:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2256,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2253,
											name: "ElementaryTypeName",
											src: "1810:7:9"
										}
									],
									id: 2254,
									name: "VariableDeclaration",
									src: "1810:7:9"
								}
							],
							id: 2255,
							name: "ParameterList",
							src: "1809:9:9"
						}
					],
					id: 2256,
					name: "FunctionDefinition",
					src: "1769:50:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "getReserves",
						scope: 2332,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2257,
							name: "ParameterList",
							src: "1844:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "reserve0",
										scope: 2265,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 2258,
											name: "ElementaryTypeName",
											src: "1870:7:9"
										}
									],
									id: 2259,
									name: "VariableDeclaration",
									src: "1870:16:9"
								},
								{
									attributes: {
										constant: false,
										name: "reserve1",
										scope: 2265,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 2260,
											name: "ElementaryTypeName",
											src: "1888:7:9"
										}
									],
									id: 2261,
									name: "VariableDeclaration",
									src: "1888:16:9"
								},
								{
									attributes: {
										constant: false,
										name: "blockTimestampLast",
										scope: 2265,
										stateVariable: false,
										storageLocation: "default",
										type: "uint32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint32",
												type: "uint32"
											},
											id: 2262,
											name: "ElementaryTypeName",
											src: "1906:6:9"
										}
									],
									id: 2263,
									name: "VariableDeclaration",
									src: "1906:25:9"
								}
							],
							id: 2264,
							name: "ParameterList",
							src: "1869:63:9"
						}
					],
					id: 2265,
					name: "FunctionDefinition",
					src: "1824:109:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "price0CumulativeLast",
						scope: 2332,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2266,
							name: "ParameterList",
							src: "1967:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2270,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2267,
											name: "ElementaryTypeName",
											src: "1993:4:9"
										}
									],
									id: 2268,
									name: "VariableDeclaration",
									src: "1993:4:9"
								}
							],
							id: 2269,
							name: "ParameterList",
							src: "1992:6:9"
						}
					],
					id: 2270,
					name: "FunctionDefinition",
					src: "1938:61:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "price1CumulativeLast",
						scope: 2332,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2271,
							name: "ParameterList",
							src: "2033:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2275,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2272,
											name: "ElementaryTypeName",
											src: "2059:4:9"
										}
									],
									id: 2273,
									name: "VariableDeclaration",
									src: "2059:4:9"
								}
							],
							id: 2274,
							name: "ParameterList",
							src: "2058:6:9"
						}
					],
					id: 2275,
					name: "FunctionDefinition",
					src: "2004:61:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "kLast",
						scope: 2332,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2276,
							name: "ParameterList",
							src: "2084:2:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2280,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2277,
											name: "ElementaryTypeName",
											src: "2110:4:9"
										}
									],
									id: 2278,
									name: "VariableDeclaration",
									src: "2110:4:9"
								}
							],
							id: 2279,
							name: "ParameterList",
							src: "2109:6:9"
						}
					],
					id: 2280,
					name: "FunctionDefinition",
					src: "2070:46:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "mint",
						scope: 2332,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2287,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2281,
											name: "ElementaryTypeName",
											src: "2136:7:9"
										}
									],
									id: 2282,
									name: "VariableDeclaration",
									src: "2136:10:9"
								}
							],
							id: 2283,
							name: "ParameterList",
							src: "2135:12:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "liquidity",
										scope: 2287,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2284,
											name: "ElementaryTypeName",
											src: "2166:4:9"
										}
									],
									id: 2285,
									name: "VariableDeclaration",
									src: "2166:14:9"
								}
							],
							id: 2286,
							name: "ParameterList",
							src: "2165:16:9"
						}
					],
					id: 2287,
					name: "FunctionDefinition",
					src: "2122:60:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "burn",
						scope: 2332,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2296,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2288,
											name: "ElementaryTypeName",
											src: "2201:7:9"
										}
									],
									id: 2289,
									name: "VariableDeclaration",
									src: "2201:10:9"
								}
							],
							id: 2290,
							name: "ParameterList",
							src: "2200:12:9"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "amount0",
										scope: 2296,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2291,
											name: "ElementaryTypeName",
											src: "2231:4:9"
										}
									],
									id: 2292,
									name: "VariableDeclaration",
									src: "2231:12:9"
								},
								{
									attributes: {
										constant: false,
										name: "amount1",
										scope: 2296,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2293,
											name: "ElementaryTypeName",
											src: "2245:4:9"
										}
									],
									id: 2294,
									name: "VariableDeclaration",
									src: "2245:12:9"
								}
							],
							id: 2295,
							name: "ParameterList",
							src: "2230:28:9"
						}
					],
					id: 2296,
					name: "FunctionDefinition",
					src: "2187:72:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "swap",
						scope: 2332,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "amount0Out",
										scope: 2311,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2297,
											name: "ElementaryTypeName",
											src: "2278:4:9"
										}
									],
									id: 2298,
									name: "VariableDeclaration",
									src: "2278:15:9"
								},
								{
									attributes: {
										constant: false,
										name: "amount1Out",
										scope: 2311,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2299,
											name: "ElementaryTypeName",
											src: "2295:4:9"
										}
									],
									id: 2300,
									name: "VariableDeclaration",
									src: "2295:15:9"
								},
								{
									attributes: {
										constant: false,
										name: "amount0Fee",
										scope: 2311,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2301,
											name: "ElementaryTypeName",
											src: "2312:4:9"
										}
									],
									id: 2302,
									name: "VariableDeclaration",
									src: "2312:15:9"
								},
								{
									attributes: {
										constant: false,
										name: "amount1Fee",
										scope: 2311,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2303,
											name: "ElementaryTypeName",
											src: "2329:4:9"
										}
									],
									id: 2304,
									name: "VariableDeclaration",
									src: "2329:15:9"
								},
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2311,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2305,
											name: "ElementaryTypeName",
											src: "2346:7:9"
										}
									],
									id: 2306,
									name: "VariableDeclaration",
									src: "2346:10:9"
								},
								{
									attributes: {
										constant: false,
										name: "data",
										scope: 2311,
										stateVariable: false,
										storageLocation: "calldata",
										type: "bytes",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes",
												type: "bytes"
											},
											id: 2307,
											name: "ElementaryTypeName",
											src: "2358:5:9"
										}
									],
									id: 2308,
									name: "VariableDeclaration",
									src: "2358:19:9"
								}
							],
							id: 2309,
							name: "ParameterList",
							src: "2277:101:9"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2310,
							name: "ParameterList",
							src: "2387:0:9"
						}
					],
					id: 2311,
					name: "FunctionDefinition",
					src: "2264:124:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "skim",
						scope: 2332,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2316,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2312,
											name: "ElementaryTypeName",
											src: "2407:7:9"
										}
									],
									id: 2313,
									name: "VariableDeclaration",
									src: "2407:10:9"
								}
							],
							id: 2314,
							name: "ParameterList",
							src: "2406:12:9"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2315,
							name: "ParameterList",
							src: "2427:0:9"
						}
					],
					id: 2316,
					name: "FunctionDefinition",
					src: "2393:35:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "sync",
						scope: 2332,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2317,
							name: "ParameterList",
							src: "2446:2:9"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2318,
							name: "ParameterList",
							src: "2457:0:9"
						}
					],
					id: 2319,
					name: "FunctionDefinition",
					src: "2433:25:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "initialize",
						scope: 2332,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2326,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2320,
											name: "ElementaryTypeName",
											src: "2484:7:9"
										}
									],
									id: 2321,
									name: "VariableDeclaration",
									src: "2484:7:9"
								},
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2326,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2322,
											name: "ElementaryTypeName",
											src: "2493:7:9"
										}
									],
									id: 2323,
									name: "VariableDeclaration",
									src: "2493:7:9"
								}
							],
							id: 2324,
							name: "ParameterList",
							src: "2483:18:9"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2325,
							name: "ParameterList",
							src: "2510:0:9"
						}
					],
					id: 2326,
					name: "FunctionDefinition",
					src: "2464:47:9"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "setBaseToken",
						scope: 2332,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "_baseToken",
										scope: 2331,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2327,
											name: "ElementaryTypeName",
											src: "2538:7:9"
										}
									],
									id: 2328,
									name: "VariableDeclaration",
									src: "2538:18:9"
								}
							],
							id: 2329,
							name: "ParameterList",
							src: "2537:20:9"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2330,
							name: "ParameterList",
							src: "2566:0:9"
						}
					],
					id: 2331,
					name: "FunctionDefinition",
					src: "2516:51:9"
				}
			],
			id: 2332,
			name: "ContractDefinition",
			src: "26:2543:9"
		}
	],
	id: 2333,
	name: "SourceUnit",
	src: "0:2570:9"
};
var compiler = {
	name: "solc",
	version: "0.5.16+commit.9c3226ce.Emscripten.clang"
};
var networks = {
};
var schemaVersion = "3.4.3";
var updatedAt = "2022-01-26T12:29:39.101Z";
var devdoc = {
	methods: {
	}
};
var userdoc = {
	methods: {
	}
};
var IPYESwapPair = {
	contractName: contractName,
	abi: abi,
	metadata: metadata,
	bytecode: bytecode,
	deployedBytecode: deployedBytecode,
	sourceMap: sourceMap,
	deployedSourceMap: deployedSourceMap,
	source: source,
	sourcePath: sourcePath,
	ast: ast,
	legacyAST: legacyAST,
	compiler: compiler,
	networks: networks,
	schemaVersion: schemaVersion,
	updatedAt: updatedAt,
	devdoc: devdoc,
	userdoc: userdoc
};

var ERC20 = [
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var _TOKEN_DECIMALS_CACHE;
var TOKEN_DECIMALS_CACHE = (_TOKEN_DECIMALS_CACHE = {}, _TOKEN_DECIMALS_CACHE[ChainId.MAINNET] = {
  '0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A': 9 // DGD

}, _TOKEN_DECIMALS_CACHE);
/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */

var Fetcher = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Fetcher() {}
  /**
   * Fetch information for a given token on the given chain, using the given ethers provider.
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   * @param symbol optional symbol of the token
   * @param name optional name of the token
   */


  Fetcher.fetchTokenData = function fetchTokenData(chainId, address, provider, symbol, name) {
    try {
      var _TOKEN_DECIMALS_CACHE2, _TOKEN_DECIMALS_CACHE3;

      var _temp3 = function _temp3(parsedDecimals) {
        return new Token(chainId, address, parsedDecimals, symbol, name);
      };

      if (provider === undefined) provider = getDefaultProvider(getNetwork(chainId));

      var _temp4 = typeof ((_TOKEN_DECIMALS_CACHE2 = TOKEN_DECIMALS_CACHE) === null || _TOKEN_DECIMALS_CACHE2 === void 0 ? void 0 : (_TOKEN_DECIMALS_CACHE3 = _TOKEN_DECIMALS_CACHE2[chainId]) === null || _TOKEN_DECIMALS_CACHE3 === void 0 ? void 0 : _TOKEN_DECIMALS_CACHE3[address]) === 'number';

      return Promise.resolve(_temp4 ? _temp3(TOKEN_DECIMALS_CACHE[chainId][address]) : Promise.resolve(new Contract(address, ERC20, provider).decimals().then(function (decimals) {
        var _TOKEN_DECIMALS_CACHE4, _extends2, _extends3;

        TOKEN_DECIMALS_CACHE = _extends({}, TOKEN_DECIMALS_CACHE, (_extends3 = {}, _extends3[chainId] = _extends({}, (_TOKEN_DECIMALS_CACHE4 = TOKEN_DECIMALS_CACHE) === null || _TOKEN_DECIMALS_CACHE4 === void 0 ? void 0 : _TOKEN_DECIMALS_CACHE4[chainId], (_extends2 = {}, _extends2[address] = decimals, _extends2)), _extends3));
        return decimals;
      })).then(_temp3));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  ;

  Fetcher.fetchPairData = function fetchPairData(tokenA, tokenB, provider) {
    try {
      if (provider === undefined) provider = getDefaultProvider(getNetwork(tokenA.chainId));
      !(tokenA.chainId === tokenB.chainId) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_ID') : invariant(false) : void 0;
      var address = Pair.getAddress(tokenA, tokenB, tokenA.chainId);
      return Promise.resolve(new Contract(address, IPYESwapPair.abi, provider).getReserves()).then(function (_ref) {
        var reserves0 = _ref[0],
            reserves1 = _ref[1],
            baseToken = _ref[3];
        var balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];
        return new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]), baseToken);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Fetcher;
}();

export { ChainId, Currency, CurrencyAmount, ETHER, FACTORY_ADDRESS, Fetcher, Fraction, INIT_CODE_HASH, InsufficientInputAmountError, InsufficientReservesError, MINIMUM_LIQUIDITY, Pair, Percent, Price, Rounding, Route, Router, Token, TokenAmount, Trade, TradeType, WETH, currencyEquals, inputOutputComparator, tradeComparator };
//# sourceMappingURL=swap-sdk.esm.js.map
