import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./style.scss";

export const NavBar = () => {
  const history = useHistory();
  
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClickUser = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorEl2(null);
  };

  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? 'simple-popover' : undefined;

  const logOutHandle = () => {
    localStorage.clear();
    history.push("login");
}

  return (
    <div className="navbar-component">
      <div className="navbar-log d-flex">
        <h1>
          n<span>.</span>
        </h1>
      </div>
      <div className="nav-main">
        <ul className="nav-list">
          <li className="nav-item-selected">Patients</li>
          <li className="nav-item-none-selected">Schedule</li>
        </ul>
        <div className="nav-tool d-flex">
          <div className="nav-notification d-flex">
            <Badge
              color="secondary"
              badgeContent={2}
              overlap="circular"
              className="notification-icon"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <img src="/assets/images/ring.png" alt="notification" />
            </Badge>
          </div>
          <div className="nav-user d-flex" aria-describedby={id2} onClick={handleClickUser}>
            <div className="nav-user-text d-flex">
              <p className="nav-user-name">Dr, Tonya West</p>
              <span className="nav-user-status">online</span>
            </div>
            <Badge
              color="success"
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <img src="/assets/images/avatar1.png" alt="avatar" />
            </Badge>
          </div>
          {/* <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseUser}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 30, left: 0 }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover> */}
          
          <Popover
                id={id2}
                open={open2}
                anchorEl={anchorEl2}
                onClose={handleCloseUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical:'bottom',
                    horizontal: 'center',
                }}
                backdropInvisible={false}
                className="popover_class"
            >
                <MenuList style={{backgroundColor:"#EFF0F6", paddingLeft:20, paddingRight:20}}>
                    <Link to="/profile">
                        <MenuItem>             
                            <ListItemText>Profile</ListItemText>
                            <ListItemIcon>
                                <ArrowForwardIosIcon fontSize="small" />
                            </ListItemIcon>                        
                        </MenuItem>
                    </Link>
                    <MenuItem onClick={logOutHandle} >                        
                        <ListItemText>Log out</ListItemText>
                        <ListItemIcon>
                            <ArrowForwardIosIcon fontSize="small" />
                        </ListItemIcon>                        
                    </MenuItem>                    
                </MenuList>
            </Popover>
        </div>
      </div>
    </div>
  );
};
