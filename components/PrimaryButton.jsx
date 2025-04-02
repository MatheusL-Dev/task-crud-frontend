"use client";

import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";

export default function PrimaryButton({children, disabled, onClick, isLoading, color, type}) {
  return (
    <LoadingButton type={type} color={color} disabled={disabled} onClick={onClick}
    loading={isLoading} variant="contained" disableElevation>{children}</LoadingButton>
  )
}

PrimaryButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  color: PropTypes.oneOf(['inherit' , 'primary' , 'secondary' , 'success' , 'error' , 'info' , 'warning']),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
}

PrimaryButton.defaultProps = {
  color: 'primary',
  disabled: false,
  isLoading: false,
  type: "button",
};