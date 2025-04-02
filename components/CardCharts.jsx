"use client"
// ICONS
import ExpandIcon from '@mui/icons-material/Expand';
import VisibilityIcon from '@mui/icons-material/Visibility';
// Mui Components
import { Dialog, DialogContent, DialogTitle, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
import React, { useState } from 'react';


export default function CardCharts({children, title}) {

    const [showLegend, setShowLegend] = useState(true)
    const [expandChart, setExpandChart] = useState(false)
    const widthExpandChart = 800;
    const heightExpandChart = 800;
    const handleShowLegend = () => {
        setShowLegend((prev) => !prev)
    }
    
    const handleExpandChart = () => {
        setExpandChart((prev) => !prev)
    }
    const wrapperChildren = React.cloneElement(children, {showLegend, widthExpandChart,heightExpandChart})

  return (
    <>
    <Stack alignItems={'center'}  sx={{border: '2px solid #B0BEC5', borderRadius: 4}}>
        <Stack width={'100%'} alignItems={'center'}  p={1} justifyContent={'space-between'} flexDirection={'row'} sx={{borderBottom: '2px solid #B0BEC5'}}>

            <TitleHeader  >{title}</TitleHeader>

            <Stack flexDirection={'row'}  gap={1}>
                <Tooltip title={ showLegend ? 'Esconder legenda'  : 'Mostrar legenda'  }>

                <IconAction onClick={handleShowLegend}>
                    <VisibilityIcon />
                </IconAction>
                
                </Tooltip>

                <Tooltip  title={ expandChart ?  'Recolher'  : 'Expandir'}>


                <IconAction onClick={handleExpandChart}>
                 <ExpandIcon />
                </IconAction>

                </Tooltip>
            </Stack>
        </Stack>
        {wrapperChildren}
    </Stack>

    <Dialog open={expandChart} onClose={handleExpandChart} >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {wrapperChildren}
                </DialogContent>
    </Dialog>
    
    </>
  )
}

const IconAction = styled(IconButton)({
    border: "1px solid #B0BEC5",
    borderRadius: "8px",
    padding: "8px"
})

const TitleHeader = styled(Typography)({
    border: "1px solid #B0BEC5",
    borderRadius: "8px",
    padding: '4px',
    fontWeight: 600,
})