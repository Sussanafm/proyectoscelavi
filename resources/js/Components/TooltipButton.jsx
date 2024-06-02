import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const TooltipButton = ({ message, onClick, columna, orden, campos, index }) => {
    return (
        <Tooltip title={message} arrow placement="top">
            <button
                className="btn btn-sm bg-white border border-secondary hover:bg-white"
                onClick={(e) => onClick(e, campos[index])}
            >
                {columna}
                {orden.campo === campos[index] && (orden.ascendente ? ' ▲' : ' ▼')}
            </button>
        </Tooltip>
    );
};

export default TooltipButton;


