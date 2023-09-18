import * as React from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { server, axios_header } from "../../config/server";
import "./style.scss";

export const AddNewPatient = ({ isOpen, handleNewPatient }) => {
  const trials = useSelector((state) => state.getTrials);

  const [state, setState] = React.useState(isOpen);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    trials: [],
  });
  // React.useEffect(() => {
  //   console.log("trials =>>>>>>>", trials);
  // }, [trials]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
    handleNewPatient(open);
  };

  React.useEffect(() => {
    setState(isOpen);
  });

  React.useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleCheckTrial = (checked, id) => {
    let new_trials = formData.trials;
    if (new_trials.includes(id)) {
      new_trials = new_trials.filter((item) => item !== id);
    } else {
      new_trials.push(id);
    }
    setFormData({...formData, trials: new_trials});
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let user = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formData.phone,
      email: formData.email,
      trials: formData.trials
    };
    axios
      .post(server.serverURL + "v1/patients", user, axios_header)
      .then((res) => {
        var data = res.data.data;
        var patient_info = data.patient_info;
        const {
          id,
          user_id,
          usertype,
          DOB,
          email,
          first_name,
          last_name,
          phone_number,
          created_at,
          updated_at,
        } = data.patient_data;

        const payload = {
          id,
          user_id,
          DOB,
          address: null,
          age: "",
          chat_date: "",
          chat_date_time: 0,
          city: "",
          diagnosis: "",
          first_name,
          last_name,
          patient_name: first_name + " " + last_name,
          phone_number,
          recent_chat: "",
          selected: false,
          state: "",
          street_address: "",
          zip: "",
          zipcode: "",
          userimage:
            "https://twilio.nexp.xyz/storage/upload/profile/no-image.jpeg",
        };
        // dispatch({ type: "ADD_TO_PATIENTS_LIST", payload });
      })
      .catch((e) => {
        alert(`${e.response.data.error}`);
      });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 565 }}
      role="presentation"
      //   onClick={toggleDrawer(false)}
      //   onKeyDown={toggleDrawer(false)}
      component="form"
      noValidate
      autoComplete="off"
      className="new-patient"
      onSubmit={onSubmitHandler}
    >
      <div className="new-patient-header">
        <h4 className="new-patient-title">Add New Patient</h4>
        <CloseIcon onClick={toggleDrawer(false)} />
      </div>
      {/* <Divider /> */}
      <br></br>
      <div className="d-flex input-name input-text">
        <TextField
          label="Patient First Name"
          variant="filled"
          style={{ flex: 1 }}
          value={formData.firstName}
          onChange={(e) => {
            setFormData({ ...formData, firstName: e.target.value });
          }}
        />
        <TextField
          label="Patient Last Name"
          variant="filled"
          style={{ flex: 1 }}
          value={formData.lastName}
          onChange={(e) => {
            setFormData({ ...formData, lastName: e.target.value });
          }}
        />
      </div>
      <div className="input-text d-flex">
        <TextField
          label="Email Address"
          variant="filled"
          style={{ flex: 1 }}
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
      </div>
      <div className="input-text d-flex">
        <TextField
          label="Cellphone Number"
          variant="filled"
          style={{ flex: 1 }}
          value={formData.phone}
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value });
          }}
        />
      </div>
      <p
        style={{
          color: "#6E7191",
          fontSize: "13px",
          fontFamily: "regularText",
          marginTop: "13px",
          marginBottom: "13px",
        }}
      >
        Trial Enrollment
      </p>
      {trials.map((trial, index) => {
        return (
          <div
            className={
              formData.trials.includes(trial.id)
                ? "trial-checkbox-checked"
                : "trial-checkbox-unChecked"
            }
            style={{ marginBottom: "10px" }}
            key={index}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.trials.includes(trial.id)}
                  sx={{
                    color: "#914DFF",
                    "&.Mui-checked": {
                      color: "#914DFF",
                    },
                  }}
                  onChange={(e) => {
                    handleCheckTrial(e.target.checked, trial.id);
                  }}
                />
              }
              label={trial.trial_name}
              sx={{ margin: "0px", width: '100%' }}
            />
          </div>
        );
      })}

      <div style={{ flex: 1 }}> </div>
      <button className="send-invite-btn" type="submit">
        Send Invitation
      </button>
    </Box>
  );

  return (
    <div>
      {/* {['left', 'right', 'top', 'bottom'].map((anchor) => ( */}
      <React.Fragment>
        {/* <Button onClick={toggleDrawer(true)}>{"anchor"}</Button> */}
        <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)}>
          {list("right")}
        </Drawer>
      </React.Fragment>
      {/* ))} */}
    </div>
  );
};
