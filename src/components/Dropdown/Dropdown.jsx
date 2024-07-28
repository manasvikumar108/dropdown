import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';
import { Info, UserCircle } from 'phosphor-react';

const Dropdown = ({
  label,
  labelVisibility,
  status,
  labelIconVisibility,
  leftIconVisibility,
  helperText,
  required,
  text,
  type,
  activeItemIndex,
  items,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  const dropdownRef = useRef(null);
  const dropdownListRef = useRef(null);

  useEffect(() => {
    if (isOpen && dropdownRef.current && dropdownListRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const dropdownListRect = dropdownListRef.current.getBoundingClientRect();

      const spaceBelow = window.innerHeight - dropdownRect.bottom;
      const spaceAbove = dropdownRect.top;
      const spaceRight = window.innerWidth - dropdownRect.right;
      const spaceLeft = dropdownRect.left;

      if (spaceBelow >= dropdownListRect.height) {
        setDropdownPosition('bottom');
      } else if (spaceAbove >= dropdownListRect.height) {
        setDropdownPosition('top');
      } else if (spaceRight >= dropdownListRect.width) {
        setDropdownPosition('right');
      } else if (spaceLeft >= dropdownListRect.width) {
        setDropdownPosition('left');
      } else {
        setDropdownPosition('bottom');
      }
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    if (status !== 'Disabled') {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (item, index) => {
    if (status !== 'Disabled') {
      onSelect(item, index);
      setIsOpen(false);
    }
  };

  const getDropdownClassName = () => {
    switch (status) {
      case 'Filled':
        return 'dropdown filled';
      case 'Disabled':
        return 'dropdown disabled';
      case 'Error':
        return 'dropdown error';
      default:
        return 'dropdown';
    }
  };

  const getDropdownListStyle = () => {
    switch (dropdownPosition) {
      case 'top':
        return { bottom: '100%' };
      case 'right':
        return { left: '100%' };
      case 'left':
        return { right: '100%' };
      default:
        return { top: '100%' };
    }
  };

  return (
    <div className="dropdown-container">
      {labelVisibility === 'Visible' && (
        <label className="dropdown-label">
          {labelIconVisibility === 'Visible' && <Info className="label-icon" />}
          {label}
        </label>
      )}
      <div
        className={getDropdownClassName()}
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        {leftIconVisibility === 'Visible' && <UserCircle className="left-icon" />}
        <span>{text}</span>
      </div>
      {isOpen && (
        <div
          className="dropdown-list"
          style={getDropdownListStyle()}
          ref={dropdownListRef}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`dropdown-item ${index === activeItemIndex ? 'active' : ''}`}
              onClick={() => handleSelect(item, index)}
            >
              {type === 'SingleRadio' && <input type="radio" checked={index === activeItemIndex} readOnly />}
              {type === 'Multi' && <input type="checkbox" checked={index === activeItemIndex} readOnly />}
              {item}
            </div>
          ))}
        </div>
      )}
      {helperText && <small className="helper-text">{helperText}</small>}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  labelVisibility: PropTypes.oneOf(['Visible', 'Hidden']),
  status: PropTypes.oneOf(['Unfilled', 'Filled', 'Disabled', 'Error']),
  labelIconVisibility: PropTypes.oneOf(['Visible', 'Hidden']),
  leftIconVisibility: PropTypes.oneOf(['Visible', 'Hidden']),
  helperText: PropTypes.string,
  required: PropTypes.oneOf(['Yes', 'No']),
  text: PropTypes.string,
  type: PropTypes.oneOf(['SingleNoIcon', 'SingleRadio', 'Multi']),
  activeItemIndex: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired
};

Dropdown.defaultProps = {
  labelVisibility: 'Visible',
  status: 'Unfilled',
  labelIconVisibility: 'Hidden',
  leftIconVisibility: 'Hidden',
  helperText: '',
  required: 'No',
  text: 'Choose...',
  type: 'SingleNoIcon',
  activeItemIndex: -1
};

export default Dropdown;
