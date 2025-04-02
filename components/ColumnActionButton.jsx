import { CircularProgress, IconButton, Tooltip } from "@mui/material";

export default function ColumnActionButton({floatingLabel,icon, onClick, sx, isLoading}) {
  return (
    <Tooltip title={floatingLabel}>
    <IconButton disabled={isLoading} color="primary"  {...sx} onClick={onClick} >
        {isLoading === true ? <CircularProgress size={20} color="primary"  /> :  icon}
    </IconButton>
    </Tooltip>
  )
}
