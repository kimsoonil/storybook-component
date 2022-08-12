import React from "react";
import PropTypes from "prop-types";
import "./button.css";

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary,
  size,
  line,
  label,
  width,
  disabled,
  ...props
}) => {
  const variant = line ? "line" : "contained";
  return (
    <button
      type="button"
      disabled={disabled}
      style={{ width: width + "px" }}
      className={[
        "storybook-button",
        `button-${size}`,
        `button-${primary}`,
        `button-${variant}`,
      ].join(" ")}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  primary: PropTypes.oneOf(["Primary", "Secondary", "Point"]),
  line: PropTypes.bool,
  size: PropTypes.oneOf(["XL", "L", "M", "S"]),
  width: PropTypes.number,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  primary: "primary",
  line: false,
  size: "M",
  width: 140,
  label: "Button",
  disabled: false,
};
