import React, { useEffect, useState } from "react";
import Api from "../../routes/api";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRef } from "react";

function FormDialog(props) {
  const item = props.open.payload;
  const inputRef = useRef();
  const [inputErr, setInputErr] = useState(false);

  const handleClose = () => {
    inputRef.current.value = "";
    setInputErr(false);
    props.close();
  };

  return (
    <div>
      <Dialog open={props.open.open} onClose={handleClose}>
        <DialogTitle>Accept Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Click on{" "}
            <a
              className="text-blue-500"
              href="https://thecradlecrew.netlify.app/"
              target={"_blank"}
            >
              https://thecradlecrew.netlify.app/
            </a>{" "}
            this link to generate the video conference link and share it with{" "}
            <span className="font-semibold">
              {item.first_name} {item.last_name}
            </span>
            . Paste the generated video conference link below and submit it.
          </DialogContentText>
          <TextField
            inputRef={inputRef}
            autoFocus
            margin="dense"
            id="link"
            sx={{ wordWrap: "break-word", breakWord: "break-word" }}
            label="Paste Link Here"
            type="text"
            error={inputErr}
            focused={inputErr}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              const parentUsername = item.username;
              const meetingLink = inputRef.current.value;

              if (!meetingLink) setInputErr(true);
              else {
                console.log("done");
                Api.acceptAppointment(
                  parentUsername,
                  meetingLink,
                  (response) => {
                    if (response.data.auth) {
                      alert(response.data.result);
                    } else {
                      alert("something went wrong!");
                    }
                    handleClose();
                    window.location.reload();
                  }
                );
              }

              //
            }}
          >
            Confirm {"&"} Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const BabysitterDashboard = () => {
  const [details, setDetails] = useState();
  const username = localStorage.getItem("user");
  const [appointments, setAppointments] = useState();
  const navigate = useNavigate();

  const [open, setOpen] = useState({ open: false, payload: {} });

  useEffect(() => {
    Api.getUserDetails(username, (response) => {
      if (response.data.auth) {
        setDetails(response.data.data[0]);
      } else {
        alert("something went wrong");
      }
    });

    Api.getBabysitterAppointments((response) => {
      if (response.data.status) {
        setAppointments(response.data.message);
      } else {
        alert("something went wrong!");
      }
    });
  }, []);

  const CardView = (props) => {
    const data = props.data;

    const DataCol = (props) => {
      if (props.value) {
        return (
          <tr>
            <td className="text-gray-800 font-light">{props.k}</td>
            <td className="px-10 text-gray-400">:</td>
            <td>{props.value}</td>
          </tr>
        );
      } else {
        return <></>;
      }
    };

    return (
      <>
        <div className="w-full h-fit bg-white rounded-xl border p-5 flex justify-between ">
          <table>
            <tbody>
              <DataCol k={"User Name"} value={data.username} />
              <DataCol k={"Password"} value={"**********"} />
              <DataCol k={"First Name"} value={data.first_name} />
              <DataCol k={"Last Name"} value={data.last_name} />
              <DataCol k={"Director Name"} value={data.director_name} />
              <DataCol k={"Creche Name"} value={data.creche_name} />
              <DataCol k={"Email Address"} value={data.email} />
              <DataCol k={"Phone Number"} value={data.phone} />
              <DataCol k={"Address"} value={data.address} />
              <DataCol k={"State"} value={data.state} />
              <DataCol k={"City"} value={data.city} />
              <DataCol k={"Pin Code"} value={data.pin_code} />
              <DataCol k={"Building"} value={data.building} />
              <DataCol k={"Contact Information"} value={data.contact_info} />
              <DataCol k={"Pricing"} value={data.pricing} />
              <DataCol k={"Capacity"} value={data.capacity} />
              <DataCol k={"Kids Information"} value={data.kids_info} />
              <DataCol k={"Identity Number"} value={data.identity_number} />
              <DataCol k={"Identity Photo"} value={data.identity_photo} />
              <DataCol k={"About"} value={data.about_yourself} />
              <DataCol
                k={"License Number"}
                value={data.daycare_license_number_kyc}
              />
              <DataCol
                k={"License Photo"}
                value={data.daycare_license_photo_kyc}
              />
            </tbody>
          </table>

          <div className="flex flex-col items-center">
            <img
              className="object-cover w-32 h-32 border rounded-full "
              src={data.profile_photo}
              alt=""
            />

            <button
              onClick={() => {
                window.localStorage.setItem("update", "BABYSITTER");
                navigate("/reg/babysitter");
              }}
              className="mt-4 hover:text-pink-500"
            >
              Edit profile
            </button>
          </div>
        </div>
      </>
    );
  };

  const Appointments = (props) => {
    const item = props.data;
    const [gid, setGid] = useState(false);
    return (
      <div className="w-full h-fit py-4 border flex  px-5 my-3 rounded bg-gray-50">
        <img
          className="w-24 h-24 my-auto rounded-full "
          src={item.profile_photo}
          alt="profile image"
        />

        <div className="h-full w-full text-sm ml-5 justify-center flex flex-col">
          <span className="text-xl mb-1 font-bold">
            {item.first_name} {item.last_name}
          </span>
          <span>{item.kids_info}</span>
          <span>{item.address}</span>
          <span>{item.email}</span>
          <div className="flex space-x-3 items-center ">
            <span>Children :</span>
            {item.kids_array?.map((item, key) => (
              <div className="text-pink-800 space-x-2 border px-2 py-px rounded bg-pink-200">
                <span>Name: {item.firstName}</span>
                <span>Age: {item.age}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-full mt-auto text-sm">
          {item.accepted ? (
            <>
              <button
                disabled
                className="px-4 mt-auto bottom-0 right-0 py-1.5 rounded disabled:opacity-60 border-gray-500 border enabled:hover:bg-pink-200 enabled:hover:text-pink-900 transition-all duration-100"
              >
                Accepted
              </button>
            </>
          ) : (
            <>
              {" "}
              <button
                onClick={() => setOpen({ open: true, payload: item })}
                className="px-4 mt-auto bottom-0 right-0 py-1.5 rounded border-pink-500 border hover:bg-pink-200 hover:text-pink-900 transition-all duration-100"
              >
                Accept
              </button>
            </>
          )}
        </div>
        {/* todo - api is done when babysitter click on 
            one button navigate to another link to generate 
            link and give them option to add it in a text file 
            and send it though api 
            */}
      </div>
    );
  };

  return (
    <div className="pb-20">
      {details && (
        <div className="w-full max-w-screen-xl mx-auto mt-20">
          <CardView data={details} />
        </div>
      )}

      <div className="w-full max-w-screen-xl mx-auto rounded border mt-10 p-5">
        <h2 className="text-4xl font-bold mb-10 mt-5 pl-5 text-gray-700">
          Appointments
        </h2>

        {appointments?.map((item, key) => {
          return item.appointments.map((i, k) => (
            <Appointments data={i} key={k} />
          ));
        })}
      </div>

      <FormDialog
        open={open}
        close={() => {
          setOpen({ open: false, payload: {} });
        }}
      />
    </div>
  );
};

export default BabysitterDashboard;
