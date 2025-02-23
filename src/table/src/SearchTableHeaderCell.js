import React, { memo, forwardRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { SearchIcon } from '../../icons'
import { IconWrapper } from '../../icons/src/IconWrapper'
import { Text } from '../../typography'
import TableHeaderCell from './TableHeaderCell'

const noop = () => {}

/**
 * This prop is non-standard, macOS specific and unsupported by ui-box. We probably don't need it,
 * but retaining it for backwards compatibility
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth
 */
const style = {
//   Remove this -- it gives fatal error because of missing dashes (and is also just not needed)
//   '-webkit-font-smoothing': 'antialiased'
}

const SearchTableHeaderCell = memo(
  forwardRef(function SearchTableHeaderCell(props, ref) {
    const {
      value,
      children,
      onChange = noop,
      autoFocus,
      spellCheck = true,
      placeholder = 'Filter...',
      icon = SearchIcon,
      ...rest
    } = props

    const handleChange = useCallback(e => onChange(e.target.value), [onChange])

    return (
      <TableHeaderCell {...rest}>
        <IconWrapper icon={icon} color="muted" marginLeft={2} marginRight={10} size={12} />
        <Text
          is="input"
          size={300}
          flex="1"
          border="none"
          backgroundColor="transparent"
          appearance="none"
          style={style}
          selectors={{
            '&:focus': {
              outline: 'none'
            },
            '&::placeholder': {
              color: 'rgba(67, 90, 111, 0.7)'
            }
          }}
          value={value}
          onChange={handleChange}
          autoFocus={autoFocus}
          spellCheck={spellCheck}
          fontWeight={500}
          marginLeft={-2}
          paddingLeft={0}
          placeholder={placeholder}
          ref={ref}
        />
      </TableHeaderCell>
    )
  })
)

SearchTableHeaderCell.propTypes = {
  /**
   * Composes the TableHeaderCell component as the base.
   */
  ...TableHeaderCell.propTypes,

  /**
   * The value of the input.
   */
  value: PropTypes.string,

  /**
   * Handler to be called when the input changes.
   */
  onChange: PropTypes.func,

  /**
   * Sets whether the component should be automatically focused on component render.
   */
  autoFocus: PropTypes.bool,

  /**
   * Sets whether to apply spell checking to the content.
   */
  spellCheck: PropTypes.bool,

  /**
   * Text to display in the input if the input is empty.
   */
  placeholder: PropTypes.string,

  /**
   * The Evergreen or custom icon before the label.
   */
  icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.element])
}

export default SearchTableHeaderCell
