import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["appearance", "className"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import { useStyleConfig } from '../../hooks';
import Text from './Text';
var pseudoSelectors = {};
var internalStyles = {};
var Code = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function Code(props, ref) {
  var _props$appearance = props.appearance,
      appearance = _props$appearance === void 0 ? 'default' : _props$appearance,
      className = props.className,
      restProps = _objectWithoutProperties(props, _excluded);

  var themedProps = useStyleConfig('Code', {
    appearance: appearance
  }, pseudoSelectors, internalStyles);
  return /*#__PURE__*/React.createElement(Text, _extends({
    is: "code",
    ref: ref
  }, themedProps, {
    fontFamily: "mono",
    className: className
  }, restProps));
}));
Code.propTypes = _objectSpread(_objectSpread({}, Text.propTypes), {}, {
  /**
   * The appearance of the code.
   */
  appearance: PropTypes.oneOf(['default', 'minimal']),

  /**
   * Class name passed to the Code component.
   * Only use if you know what you are doing.
   */
  className: PropTypes.string
});
export default Code;