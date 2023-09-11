import React, { useState, useEffect } from "react";
import "./style.scss";
// import { SideBar } from '../../components';
import { NavBar, AddNewPatient } from "../../components";
import { AvatarsContainer } from "../../components";
import { sharedColors } from "../../theme/sharedColor";
// import { UserDataComponent } from '../../components';
import { GET_PATIENTS_LIST } from "../../store/actionNames/homePageActions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";

export const PatientPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [mainPart, setMainPart] = useState("intro");
  const [openNewPatient, setOpenNewPatient] = useState(false);
  const patientList = useSelector((state) => state.patientsList);

  useEffect(() => {
    console.log("<<<<<<>>>>>>======>", patientList);
  }, [patientList]);

  useEffect(() => {
    const checkUserToken = () => {
      var token = localStorage.getItem("token");
      if (!token) {
        history.push("/login");
      }
    };
    dispatch({ type: GET_PATIENTS_LIST });
    checkUserToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Style for the highlighted text color.
  const specialColorFont = {
    color: sharedColors.primaryFontColor,
  };

  // Set main section
  const setMainSection = (part) => setMainPart(part);

  const handleNewPatient = (val) => {
    setOpenNewPatient((val) => !val);
  };

  return (
    <div className="patient-page">
      {/* <SideBar select={"patient"} /> */}
      <NavBar />
      <div className="main-section">
        <AvatarsContainer
          setMainSection={setMainSection}
          setSectionTitle="Patients"
          handleNewPatient={handleNewPatient}
        />
        <div className="patient-detail">
          <div className="patient-info">
            <div className="patient-avatar">
              <Avatar
                alt="Remy Sharp"
                src="/assets/images/avatar3.png"
                sx={{ width: 130, height: 130 }}
              />
              <div className="d-flex">
                <span className="small-text">Bradley Stanley</span>
                <span className="small-text">46 yo</span>
              </div>
            </div>
            <div className="patient-info-header">
              <div className="patient-info-header-section">
                <span className="medium-text">DOB: &nbsp;</span>
                <span className="small-text">hhhhh</span>
              </div>
              <div className="patient-info-header-section">
                <span className="medium-text">PHONE: &nbsp;</span>
                <span className="small-text"> 454541313</span>
              </div>
            </div>
            <div className="patient-info-header">
              <div className="patient-info-header-section">
                <span className="medium-text">STREET ADDRESS: &nbsp;</span>
                <span className="small-text">sdf sadf 324</span>
              </div>
              <div className="patient-info-header-section">
                <span className="medium-text">
                  CITY, STATE ZIP CODE: &nbsp;
                </span>
                <span className="small-text"> Paris, 32432</span>
              </div>
            </div>
          </div>
          <div className="patient-trial">
            <h3 style={{ fontFamily: "boldTitles", paddingLeft: '20px' }}>Trial #01</h3>
            <ul className="trial-list">
              <li className="trial-list-item">
                <div style={{ flex: 1 }}>
                    <span className="d-block" style={{ color: '#4939E3', fontSize: '25px', fontFamily: "mediumText" }}>Trial Medication 1 - 0.25mcg</span>
                    <span className="d-block" style={{ color: '#333333', fontSize: '20px', fontFamily: "mediumText" }}>Qty: 20/60 Tablets Remaining</span>
                </div>
                <div style={{ flex: 1 }}>
                    <span className="d-block" style={{ color: '#4939E3', fontSize: '25px', fontFamily: "mediumText" }}>4/75 days of Therapy Completed</span>
                    <span className="d-block" style={{ color: '#333333', fontSize: '20px', fontFamily: "mediumText" }}>Adherence: 85% (4 missed doses)</span>
                </div>
              </li>
              <li className="trial-list-item">
                <div style={{ flex: 1 }}>
                    <span className="d-block" style={{ color: '#4939E3', fontSize: '25px', fontFamily: "mediumText" }}>Trial Medication 1 - 0.25mcg</span>
                    <span className="d-block" style={{ color: '#333333', fontSize: '20px', fontFamily: "mediumText" }}>Qty: 20/60 Tablets Remaining</span>
                </div>
                <div style={{ flex: 1 }}>
                    <span className="d-block" style={{ color: '#4939E3', fontSize: '25px', fontFamily: "mediumText" }}>4/75 days of Therapy Completed</span>
                    <span className="d-block" style={{ color: '#333333', fontSize: '20px', fontFamily: "mediumText" }}>Adherence: 85% (4 missed doses)</span>
                </div>
              </li>
              <li className="trial-list-item">
                <div style={{ flex: 1 }}>
                    <span className="d-block" style={{ color: '#4939E3', fontSize: '25px', fontFamily: "mediumText" }}>Trial Medication 1 - 0.25mcg</span>
                    <span className="d-block" style={{ color: '#333333', fontSize: '20px', fontFamily: "mediumText" }}>Qty: 20/60 Tablets Remaining</span>
                </div>
                <div style={{ flex: 1 }}>
                    <span className="d-block" style={{ color: '#4939E3', fontSize: '25px', fontFamily: "mediumText" }}>4/75 days of Therapy Completed</span>
                    <span className="d-block" style={{ color: '#333333', fontSize: '20px', fontFamily: "mediumText" }}>Adherence: 85% (4 missed doses)</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <AddNewPatient
          isOpen={openNewPatient}
          handleNewPatient={handleNewPatient}
        />
        {/* <div className="intro-section-part">
                    {mainPart === "intro" ?
                        <div className="intro-page-intro-section">
                            <div>
                                <h1 className="intro-title">Good Morning<span style={specialColorFont}>,</span><br />Dr<span style={specialColorFont}>.</span> Smith</h1>
                                <p className="intro-description">Click on a patient on the left to view<br />their medical record</p>
                            </div>
                        </div>
                        : <UserDataComponent />
                    }
                </div> */}
      </div>
    </div>
  );
};
