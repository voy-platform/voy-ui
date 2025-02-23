var baseStyle = {
  fontFamily: 'fontFamilies.ui',
  border: '1px solid transparent',
  borderRadius: 'radii.1',
  color: function color(theme, _ref) {
    var _color = _ref.color;
    return theme.colors[_color] || _color || 'colors.default';
  },
  transition: 'box-shadow 80ms ease-in-out',
  selectors: {
    _focus: {
      boxShadow: 'shadows.focusRing'
    },
    _disabled: {
      cursor: 'not-allowed',
      pointerEvents: 'none'
    }
  }
};

var colorKeyForAppearanceOrIntent = function colorKeyForAppearanceOrIntent(appearance, intent) {
  if (appearance === 'destructive') {
    return 'red';
  }

  switch (intent) {
    case 'success':
      return 'green';

    case 'danger':
      return 'red';

    default:
      return 'blue';
  }
};

var colorKeyForIntent = function colorKeyForIntent(intent) {
  if (intent === 'danger') {
    return "red500";
  } else if (intent === 'success') {
    return "green500";
  } else {
    return "gray800";
  }
};

var borderColorForIntent = function borderColorForIntent(intent, isHover) {
  if (intent === 'danger') {
    return "red".concat(isHover ? 500 : 300);
  } else if (intent === 'success') {
    return "green".concat(isHover ? 400 : 300);
  } else {
    return "gray".concat(isHover ? 600 : 500);
  }
};

var getPrimaryButtonAppearance = function getPrimaryButtonAppearance(appearance, intent, textColor, theme) {
  var color = colorKeyForAppearanceOrIntent(appearance, intent);
  return {
    backgroundColor: "colors.".concat(color, "500"),
    borderColor: "colors.".concat(color, "500"),
    color: textColor || 'white',
    selectors: {
      _hover: {
        backgroundColor: "colors.".concat(color, "600"),
        borderColor: "colors.".concat(color, "600")
      },
      _disabled: {
        backgroundColor: "colors.".concat(color, "100"),
        borderColor: "colors.".concat(color, "100")
      },
      _focus: {
        backgroundColor: "colors.".concat(color, "500"),
        boxShadow: "0 0 0 2px ".concat(theme && theme.colors["".concat(color, "100")]),
        borderColor: "colors.".concat(color, "500")
      },
      _active: {
        backgroundColor: "colors.".concat(color, "700"),
        borderColor: "colors.".concat(color, "700")
      }
    }
  };
};

var appearances = {
  primary: function primary(theme, _ref2) {
    var appearance = _ref2.appearance,
        color = _ref2.color,
        intent = _ref2.intent;
    return getPrimaryButtonAppearance(appearance, intent, color, theme);
  },
  "default": {
    backgroundColor: 'white',
    border: function border(theme, props) {
      return "1px solid ".concat(theme.colors[borderColorForIntent(props.intent)]);
    },
    color: function color(theme, props) {
      return props.color || theme.colors[colorKeyForIntent(props.intent)];
    },
    selectors: {
      _disabled: {
        color: 'colors.gray500',
        borderColor: 'colors.gray300'
      },
      _hover: {
        border: function border(theme, props) {
          return "1px solid ".concat(theme.colors[borderColorForIntent(props.intent, true)]);
        },
        backgroundColor: 'colors.gray50'
      },
      _active: {
        backgroundColor: 'colors.gray100'
      }
    }
  },
  minimal: {
    backgroundColor: 'transparent',
    color: function color(theme, props) {
      return props.color || theme.colors[colorKeyForIntent(props.intent)];
    },
    selectors: {
      _disabled: {
        color: 'colors.gray500',
        opacity: 0.6
      },
      _hover: {
        backgroundColor: 'colors.gray100'
      },
      _active: {
        backgroundColor: 'colors.gray200'
      }
    }
  },
  destructive: getPrimaryButtonAppearance('destructive')
};
var sizes = {
  small: {
    height: 24,
    minWidth: 24,
    fontSize: 'fontSizes.1',
    lineHeight: '24px',
    paddingLeft: 12,
    paddingRight: 12
  },
  medium: {
    height: 32,
    minWidth: 32,
    fontSize: 'fontSizes.1',
    lineHeight: '32px',
    paddingLeft: 16,
    paddingRight: 16
  },
  large: {
    height: 40,
    minWidth: 40,
    fontSize: 'fontSizes.2',
    lineHeight: '40px',
    paddingLeft: 20,
    paddingRight: 20
  }
};
export default {
  baseStyle: baseStyle,
  appearances: appearances,
  sizes: sizes
};