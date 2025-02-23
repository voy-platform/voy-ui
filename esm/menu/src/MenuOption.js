import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useClickable, useStyleConfig } from '../../hooks';
import { TickIcon } from '../../icons';
import { Pane } from '../../layers';
import { pseudoSelectors } from '../../table/src/TableRow';
import { Text } from '../../typography';

var noop = function noop() {};

var internalStyles = {
  display: 'flex',
  alignItems: 'center'
};
var MenuOption = /*#__PURE__*/memo(function MenuOption(props) {
  var id = props.id,
      children = props.children,
      _props$appearance = props.appearance,
      appearance = _props$appearance === void 0 ? 'default' : _props$appearance,
      _props$onSelect = props.onSelect,
      onSelect = _props$onSelect === void 0 ? noop : _props$onSelect,
      secondaryText = props.secondaryText,
      _props$isSelected = props.isSelected,
      isSelected = _props$isSelected === void 0 ? false : _props$isSelected;
  var handleClick = useCallback(function (e) {
    return onSelect(e);
  }, [onSelect]);

  var _useClickable = useClickable(),
      onKeyDown = _useClickable.onKeyDown,
      tabIndex = _useClickable.tabIndex;

  var themedProps = useStyleConfig('MenuItem', {
    appearance: appearance
  }, pseudoSelectors, internalStyles);
  var textProps = isSelected ? {
    color: 'selected',
    fontWeight: 500,
    marginLeft: 16
  } : {
    marginLeft: 44
  };
  return /*#__PURE__*/React.createElement(Pane, _extends({
    id: id,
    role: "menuitemradio",
    tabIndex: tabIndex,
    onClick: handleClick,
    onKeyDown: onKeyDown,
    "data-isselectable": "true",
    "aria-checked": isSelected,
    height: 40
  }, themedProps), isSelected && /*#__PURE__*/React.createElement(TickIcon, {
    "aria-hidden": true,
    color: "selected",
    marginLeft: 16,
    marginRight: -4,
    size: 16,
    flexShrink: 0
  }), /*#__PURE__*/React.createElement(Text, _extends({}, textProps, {
    marginRight: 16,
    flex: 1
  }), children), secondaryText && /*#__PURE__*/React.createElement(Text, {
    marginRight: 16,
    color: "muted"
  }, secondaryText));
});
MenuOption.propTypes = {
  /**
   * The id attribute of the menu option.
   */
  id: PropTypes.string,

  /**
   * Function that is called on click and enter/space keypress.
   */
  onSelect: PropTypes.func,

  /**
   * The icon before the label.
   */
  isSelected: PropTypes.bool,

  /**
   * The children of the component.
   */
  children: PropTypes.node,

  /**
   * Secondary text shown on the right.
   */
  secondaryText: PropTypes.node,

  /**
   * The default theme only supports one default appearance.
   */
  appearance: PropTypes.string
};
export default MenuOption;