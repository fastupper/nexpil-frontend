import React, { useState, useEffect } from "react";
import "./style.scss";
// import { SideBar } from '../../components';
import { NavBar, AddNewPatient } from "../../components";
import { AvatarsContainer } from "../../components";
import AssignedTask from "../../components/userDataComponent/assignedTask/assignedTask";
import { sharedColors } from "../../theme/sharedColor";
// import { UserDataComponent } from '../../components';
import {
  GET_PATIENTS_LIST,
  GET_TRIALS,
} from "../../store/actionNames/homePageActions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";

export const PatientPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [mainPart, setMainPart] = useState("intro");
  const [openNewPatient, setOpenNewPatient] = useState(false);
  const patientList = useSelector((state) => state.patientsList);
  const patientSelect = useSelector(state => state.patientSelect);
  // const currentSelectedUserData = useSelector(state => state.patientSelect);
  // const sss = useState(currentSelectedUserData)

  // useEffect(() => {
  //   console.log("currentSelectedUserData======>", currentSelectedUserData);
  // }, []);

  useEffect(() => {
    const checkUserToken = () => {
      var token = localStorage.getItem("token");
      if (!token) {
        history.push("/login");
      }
    };
    dispatch({ type: GET_PATIENTS_LIST });
    // dispatch({ type: GET_TRIALS });
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
        {
          patientSelect && 
          (
            <div className="patient-detail">
            <div className="patient-info">
              <div className="patient-avatar">
                <Avatar
                  alt="Remy Sharp"
                  src="/assets/images/avatar3.png"
                  sx={{ width: 130, height: 130 }}
                />
                <div className="d-flex">
                  <span className="small-text">{patientSelect.first_name + " " + patientSelect.last_name}</span>
                  {/* <span className="small-text">46 yo</span> */}
                </div>
              </div>
              <div className="patient-info-header">
                <div className="patient-info-header-section">
                  <span className="medium-text">DOB: &nbsp;</span>
                  <span className="small-text">{patientSelect.DOB}</span>
                </div>
                <div className="patient-info-header-section">
                  <span className="medium-text">PHONE: &nbsp;</span>
                  <span className="small-text"> {patientSelect.phone_number}</span>
                </div>
              </div>
              <div className="patient-info-header">
                <div className="patient-info-header-section">
                  <span className="medium-text">STREET ADDRESS: &nbsp;</span>
                  <span className="small-text">{patientSelect.address}</span>
                </div>
                <div className="patient-info-header-section">
                  <span className="medium-text">
                    CITY, STATE ZIP CODE: &nbsp;
                  </span>
                  <span className="small-text"> {patientSelect.city + ", " + patientSelect.zipcode}</span>
                </div>
              </div>
            </div>
            {
              patientSelect.trial_list.map((trial, index) => {
                return (
                  <div className="patient-trial" key={index}>
                    <h3 style={{ fontFamily: "boldTitles", paddingLeft: '20px' }}>{trial.trial_name}</h3>
                    <ul className="trial-list">
                      {
                        trial.trial_medications.map((medication, med_index) => {
                          return (
                            <li className="trial-list-item" key={med_index}>
                              <div style={{ flex: 1 }}>
                                  <span className="d-block" style={{ color: '#4939E3', fontSize: '25px', fontFamily: "mediumText" }}>{medication.medication_name} - {medication.strength}</span>
                                  <span className="d-block" style={{ color: '#333333', fontSize: '20px', fontFamily: "mediumText" }}>Qty: {medication.total_medication_quantity_till_now}/{medication.quantity} Tablets Remaining</span>
                              </div>
                              <div style={{ flex: 1 }}>
                                  <span className="d-block" style={{ color: '#4939E3', fontSize: '25px', fontFamily: "mediumText" }}>{medication.current_medication_day}/{medication.total_medication_days} days of Therapy Completed</span>
                                  <span className="d-block" style={{ color: '#333333', fontSize: '20px', fontFamily: "mediumText" }}>Adherence: {medication.adherence}% (4 {medication.missed_doses})</span>
                              </div>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                )
              })
            }
            {/* <AssignedTask
              homeUserName={"homeUserName"}
              setCreatedGroupId={undefined}
            /> */}
          </div>
          )
        }

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
