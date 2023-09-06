import React, { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import "./style.scss";

export const NavBar = () => {
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
          <div className="nav-user d-flex">
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
        </div>
      </div>
    </div>
  );
};
