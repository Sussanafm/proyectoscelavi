import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TooltipButton = ({ message, icon, onClick }) => {
    return (
        <Tooltip title={message} arrow placement="top">
            <Button onClick={onClick}>
                <FontAwesomeIcon icon={icon} className="w-6 h-6 icon-black" />
            </Button>
        </Tooltip>
    );
};

export default TooltipButton;
