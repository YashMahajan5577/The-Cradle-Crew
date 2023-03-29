const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const Users = require("./schemas/Users");
// const ParentDetails = require("./schemas/ParentDetails");
// const BabySitterDetails = require("./schemas/BabySitterDetails");
// const CrecheDetails = require("./schemas/CrecheDetails");
const Appointments = require("./schemas/Appointments");
const Feedbacks = require("./schemas/Feedback");
const RegistrationRequests = require("./schemas/RegistrationRequests");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const { request, response } = require("express");
// -----------------------------------------------------------

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(
  session({
    key: "userId",
    secret: "some_very_long_secret_text",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// used to verify user is logged in
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) res.json({ auth: false, message: "Need authentication token" });
  else {
    jwt.verify(token, "json_web_token_long_secret", (err, decoded) => {
      if (err) res.json({ auth: false, message: "failed to authenticate" });
      else {
        require.userId = decoded.id;
        next();
      }
    });
  }
};

// // 1. babysitter accept ->
// // parent show accepted status and video link which babysitter generated

// // make api to accept booking for babysitter
// //make api to add meeting link in database
// // make api to show video link of babysitter to parent
// // another user appoint same babysitter
//
//
//
//
//
// ! APIs --------------------------------------------------------------

app.delete("/api/appoint/accept", (req, res) => {
  const username = req.body.username;
  const parentUsername = req.body.parentUsername;

  Appointments.findOneAndUpdate(
    { username, "appointments.username": parentUsername },
    {
      $pull: {
        appointments: { username: parentUsername },
      },
    },
    { new: true },
    (err, user) => {
      if (err) res.send({ auth: false, result: err });
      else res.send({ auth: true, result: "request deleted successfully" });
    }
  );

  // res.send(parentUsername);
});

// babysitter can accept appointment requests and send meeting links through this api
app.post("/api/appoint/accept", (req, res) => {
  const username = req.body.username;
  const parentUsername = req.body.parentUsername;
  const meetingLink = req.body.meetingLink;

  Appointments.findOneAndUpdate(
    { username, "appointments.username": parentUsername },
    {
      $set: {
        "appointments.$[].accepted": true,
        "appointments.$[].meetingLink": meetingLink,
      },
    },
    { new: true },
    (err, user) => {
      if (err) res.send({ auth: false, result: err });
      else res.send({ auth: true, result: "Submitted Successfully." });
    }
  );

  // Appointments.find(
  //   { username, "appointments.username": parentUsername },
  //   (err, users) => {
  //     if (err) res.json({ status: false, message: "error occurred: " + err });
  //     else {
  //       res.json({ status: true, message: users });
  //     }
  //   }
  // );
});

// on baby sitter profile->show booking of parent
app.post("/api/appoint/get", (req, res) => {
  const username = req.body.username;

  Appointments.find({ username }, (err, users) => {
    if (err) res.json({ status: false, message: "error occurred: " + err });
    else {
      res.json({ status: true, message: users });
    }
  });
});

// on Parent profile->show booking of baby sitter
app.post("/api/appoint/parent", (req, res) => {
  const username = req.body.username;
  let babysitter = new Array();
  let details = new Array();
  let length = 0;

  Appointments.find(
    {
      "appointments.username": username,
    },
    {
      username: "$username",
      appointments: { $elemMatch: { username: username } },
    },
    function (err, appointment) {
      if (err) {
        return res.json({ status: false, message: "error occurred: " + err });
      } else {
        // res.send(user)
        if (appointment.length > 0) {
          appointment?.map((item) => {
            Users.findOne({ username: item.username })
              .exec()
              .then((result) => {
                const value = item.appointments[0];

                details.unshift({
                  date: value.date,
                  time: value.time,
                  hours: value.hours,
                  accepted: value.accepted,
                  meetingLink: value.meetingLink,
                });

                length = babysitter.unshift({
                  babysitter: result.data[0].data[0],
                  details: details[0],
                });
              })
              .finally(() => {
                if (appointment.length === length) {
                  res.send({ status: true, message: babysitter });
                }
              });
          });
        } else {
          res.send({ status: false, message: "user not found" });
        }
      }
    }
  );

  //   // res.sendStatus(200);
});
// !-------------------------------------------------------------------
// parent can appoint babysitter through this api
app.post("/api/appoint/", (req, res) => {
  const username = req.body.username;
  const appointee = req.body.appointee;
  const date = req.body.date;
  const time = req.body.time;
  const hours = req.body.hours;

  Users.find({ username: appointee }, (err, resu) => {
    if (err) res.send({ auth: false, data: err });
    else {
      const appointee2 = resu[0].data[0].data[0];

      // console.log(appointee2);

      Appointments.find({ username }, async (e, r) => {
        if (e) res.send({ auth: false, data: e });
        else {
          if (r[0]) {
            // exists

            Appointments.findOneAndUpdate(
              { username },
              {
                $push: {
                  appointments: {
                    ...appointee2,
                    date: date,
                    time: time,
                    hours: hours,
                    accepted: false,
                  },
                },
              },
              (error, result) => {
                if (error) res.send({ auth: false, data: error });
                else {
                  res.json({
                    status: true,
                    message: "Request submitted successfully.",
                  });
                }
              }
            );
          } else {
            // not found

            const appoint = new Appointments({
              username: username,
              appointments: [
                {
                  ...appointee2,
                  date: date,
                  time: time,
                  hours: hours,
                  accepted: false,
                },
              ],
            });

            try {
              await appoint.save();
              res.json({
                status: true,
                message: "Request submitted successfully.",
              });
            } catch (exception) {
              res.json({
                status: false,
                message: "error occurred: " + exception,
              });
            }
          }
        }
      });
    }
  });
});

app.get("/api/admin/get/users", (req, res) => {
  Users.find({ username: { $ne: "admin@gmail.com" } }, (err, result) => {
    if (err) res.send({ status: false, result: err });
    else {
      if (result.length > 0) res.send({ status: true, result: result });
      else{
        res.send({ status: true, result: null });
      }
    }
  });
});

// app.post("/api/appoint/babysitter", (req, res) => {
//   const parentDetails = req.body.parentDetails;
//   const babysitterUsername = req.body.babysitterUsername;
//   const dat

//   app.get("/api/appoint/babysitter", (req, res) => {
//     // const parentDetails = req.body.parentDetails;
//     // const babysitterUsername = req.body.babysitterUsername;
//     // Users.find({ "data.data.username": babysitterUsername }, (err, u1) => {
//     //   if (err) res.send(err);
//     //   else {
//     //     const d1 = u1[0].data[0].data[0];
//     //     Appointments.findOneAndReplace({username: babysitterUsername}, {appo})
//     //     res.send(d1);
//     //   }
//   });

//   // Users.find({ "data.data.username": babysitterUsername }, (err, user) => {
//   //   if (err) res.send(err);
//   //   else {
//   //     const data = user[0].data[0].data[0];

//   //     if (data) {
//   //       Users.findOneAndUpdate(
//   //         { "data.data.username": babysitterUsername },
//   //         {
//   //           $set: {
//   //             "data.$.data.$[].appointments": [

//   //             ],
//   //           },
//   //         },
//   //         { new: true },
//   //         (err, user) => {
//   //           if (err) res.send(err);
//   //           else res.send(user);
//   //         }
//   //       );
//   //     }
//   //   }
//   // });
// });

// ! ----------------

app.post(process.env.API_USERS_REGISTER, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Users.find({ username: username }, (err, users) => {
    if (users.length > 0) {
      res.json({ auth: false, message: "user already exists" });
    } else {
      // user not already registered

      bcrypt.hash(password, saltRounds, async (error, hash) => {
        if (error) console.log(error);
        // --------

        const users = new Users({
          username: username,
          password: hash,
          // type: "ADMIN"
        });

        try {
          const result = await users.save();
          // const id = result._id.valueOf();

          // const token = jwt.sign({ id }, "json_web_token_long_secret", {
          //   expiresIn: 300,
          // });

          res.json({ auth: true, message: "added successfully" });

          // console.log(result);

          // req.session.user = users;
          // console.log({ auth: true, token: token, result: users });
          // res.json({ auth: true, token: token, result: users });
        } catch (err) {
          console.log(err);
          res.json({ auth: false, message: err });
        }
      });
    }
  });
});

app.post(process.env.API_USERS_LOGIN, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Users.find({ username: username }, (err, users) => {
    if (users.length > 0) {
      bcrypt.compare(password, users[0].password, (error, response) => {
        if (response) {
          const id = users[0]._id.valueOf();

          const token = jwt.sign({ id }, "json_web_token_long_secret", {
            expiresIn: "2 days",
          });

          req.session.user = users;
          res.json({
            auth: true,
            token: token,
            username: users[0].username,
            type: users[0].type,
          });
        } else {
          console.log(1, err);
          res.json({ auth: false, message: "Wrong username or password." });
        }
      });
    } else {
      console.error("User not found.");
      res.json({ auth: false, message: "User not found." });
    }
  });
});

// !-------------
app.get(process.env.API_GET_BABYSITTER, (req, res) => {
  const username = req.query.username;

  if (username) {
    Users.find({ type: "BABYSITTER", username: username }, (err, result) => {
      if (err) res.send({ auth: false, message: "error occurred: " + err });
      if (result.length > 0) {
        res.send({ auth: true, result: result[0] });
      } else {
        res.json({ auth: false, message: "No Results" });
      }
    });
  } else {
    Users.find({ type: "BABYSITTER" }, (err, result) => {
      if (err) res.send({ auth: false, message: "error occurred: " + err });
      if (result.length > 0) {
        res.send({ auth: true, result: result });
      } else {
        res.json({ auth: false, message: "No Results" });
      }
    });
  }
});

app.get(process.env.API_GET_CRECHE, (req, res) => {
  const lat = req.query.lat;
  const long = req.query.long;

  console.log(lat, long);

  if (lat && long) {
    Users.find(
      {
        "data.data.lat": Number(lat),
        "data.data.long": Number(long),
      },
      (err, result) => {
        if (err) res.send({ auth: false, message: "error occurred: " + err });
        else if (result.length > 0) {
          res.send({ auth: true, result: result[0] });
        } else {
          res.json({ auth: false, message: "No Results" });
        }
      }
    );
  } else {
    Users.find({ type: "CRECHE" }, (err, result) => {
      if (err) res.send({ auth: false, message: "error occurred: " + err });
      if (result.length > 0) {
        res.send({ auth: true, result: result });
      } else {
        res.json({ auth: false, message: "No Results" });
      }
    });
  }
});

// !-------------
app.put(process.env.API_PUT_ADMIN, (req, res) => {
  const username = req.body.username;
  const action = req.body.action;

  const actions = {
    0: "delete",
    1: "accept",
  };

  RegistrationRequests.findOneAndDelete(
    { username: username },
    async (err, result) => {
      if (err) res.send({ auth: false, message: "Error occurred: " + err });
      else {
        if (action == 1) {
          const users = new Users({
            username: username,
            password: result.data[0].password,
            data: [result],
            type: result.type,
          });
          try {
            const r = await users.save();

            res.send({ auth: true, message: "User accepted" });
          } catch (err) {
            res.send({ auth: false, message: "Error occurred :" + err });
          }
        } else {
          res.send({ auth: true, message: "User removed" });
        }
      }
    }
  );
});

app.get(process.env.API_GET_ADMIN, (req, res) => {
  if (req.body.username) {
    RegistrationRequests.find(
      { username: req.body.username },
      (err, result) => {
        if (err) res.send({ auth: false, message: "error occurred: " + err });

        if (result.length > 0) {
          res.send({ auth: true, result: result });
        } else {
          res.json({ auth: false, message: "No Results" });
        }
      }
    );
  } else {
    RegistrationRequests.find((err, result) => {
      if (err) res.send({ auth: false, message: "error occurred: " + err });
      if (result.length > 0) {
        res.send({ auth: true, result: result });
      } else {
        res.json({ auth: false, message: "No Results" });
      }
    });
  }
});

// !------------- GET USER INFO for ADMIN AND RESPECTIVE USER
app.get(process.env.API_GET_USER_INFO, verifyJWT, (req, res) => {
  const username = req.query.username;

  if (username) {
    Users.find({ username: username }, (err, result) => {
      // console.log(result);
      if (result.length > 0) {
        res.send({
          auth: true,
          message: "User found",
          type: result[0].data[0].type | "PARENT",
          data: result[0].data[0].data,
        });
      } else {
        res.send({ auth: false, message: "User not found" });
      }
    });
  } else {
    res.send({ auth: false, message: "Username invalid" });
  }
});

// !------------- REQUEST REGISTRATION FOR Parents/Babysitter/Creche
app.post(process.env.API_NEW_PARENT, async (req, res) => {
  RegistrationRequests.find({ username: req.body.username }, (err, users) => {
    if (users.length > 0) {
      res.json({ status: false, message: "user already exists" });
    } else {
      // user not already registered

      bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
        if (error) console.log(error);
        // --------

        const registrationRequests = new RegistrationRequests({
          username: req.body.username,
          data: [
            {
              username: req.body.username,
              password: hash,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              contact_info: req.body.contact_info,
              email: req.body.email,
              phone: req.body.phone,
              address: req.body.address,
              state: req.body.state,
              city: req.body.city,
              pin_code: req.body.pin_code,
              building: req.body.building,
              kids_info: req.body.kids_info,
              kids_array: req.body.kids_array,
              profile_photo: req.body.profile_photo,
              identity_photo: req.body.identity_photo,
              identity_number: req.body.identity_number,
            },
          ],
          type: "PARENT",
        });

        try {
          const r = await registrationRequests.save();

          res.json({
            status: true,
            message: "Request submitted successfully.",
          });
        } catch (err) {
          console.log(err);
          res.json({ status: false, message: "error occurred: " + err });
        }
      });
    }
  });
});

app.post(process.env.API_NEW_BABYSITTER, async (req, res) => {
  RegistrationRequests.find({ username: req.body.username }, (err, users) => {
    if (users.length > 0) {
      res.json({ status: false, message: "user already exists" });
    } else {
      // user not already registered

      bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
        if (error) console.log(error);
        // --------

        const registrationRequests = new RegistrationRequests({
          username: req.body.username,
          data: [
            {
              username: req.body.username,
              password: hash,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              phone: req.body.phone,
              profile_photo: req.body.profile_photo,
              address: req.body.address,
              state: req.body.state,
              city: req.body.city,
              pin_code: req.body.pin_code,
              pricing: req.body.pricing,
              activities: req.body.activities,
              services_offered: req.body.services_offered,
              special_features: req.body.special_features,
              gallery_photos: req.body.gallery_photos,
              birth_date: req.body.birth_date,
              identity_number: req.body.identity_number,
              identity_photo: req.body.identity_photo,
              about_yourself: req.body.about_yourself,
            },
          ],
          type: "BABYSITTER",
        });

        try {
          const r = await registrationRequests.save();

          res.json({
            status: true,
            message: "Request submitted successfully.",
          });
        } catch (err) {
          console.log(err);
          res.json({ status: false, message: "error occurred: " + err });
        }
      });
    }
  });
});

app.post(process.env.API_NEW_CRECHE, async (req, res) => {
  RegistrationRequests.find({ username: req.body.username }, (err, users) => {
    if (users.length > 0) {
      res.json({ status: false, message: "user already exists" });
    } else {
      // user not already registered

      bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
        if (error) console.log(error);
        // --------

        const registrationRequests = new RegistrationRequests({
          username: req.body.username,
          data: [
            {
              username: req.body.username,
              password: hash,
              director_name: req.body.director_name,
              creche_name: req.body.creche_name,
              profile_photo: req.body.profile_photo,
              email: req.body.email,
              phone: req.body.phone,
              address: req.body.address,
              state: req.body.state,
              city: req.body.city,
              pin_code: req.body.pin_code,
              pricing: req.body.pricing,
              activities: req.body.activities,
              services_offered: req.body.services_offered,
              special_features: req.body.special_features,
              gallery_photos: req.body.gallery_photos,
              lat: req.body.lat,
              long: req.body.long,
              capacity: req.body.capacity,
              identity_number: req.body.identity_number,
              identity_photo: req.body.identity_photo,
              daycare_license_number_kyc: req.body.daycare_license_number_kyc,
              daycare_license_photo_kyc: req.body.daycare_license_photo_kyc,
            },
          ],
          type: "CRECHE",
        });

        try {
          const r = await registrationRequests.save();

          res.json({
            status: true,
            message: "Request submitted successfully.",
          });
        } catch (err) {
          console.log(err);
          res.json({ status: false, message: "error occurred: " + err });
        }
      });
    }
  });
});

app.delete("/api/users/profile", (req, res) => {
  Users.findOneAndDelete({ username: req.body.username }, (err, result) => {
    console.log(err, result);
    if (err) res.json({ status: false, message: "error occurred: 0 :" + err });
    else {
      Appointments.findOneAndDelete(
        { username: req.body.username },
        (err1, result1) => {
          console.log(err1, result1);
          if (err1)
            res.json({ status: false, message: "error occurred: 1 :" + err1 });
          else {
            Appointments.findOneAndUpdate(
              {},
              { $pull: { appointments: { username: req.body.username } } },
              { safe: true, multi: true },
              (err2, result2) => {
                console.log(err2, result2);
                if (err2)
                  res.json({
                    status: false,
                    message: "error occurred: 2 :" + err2,
                  });
                else {
                  res.json({
                    status: true,
                    message: "Deleted Successfully.",
                  });
                }
              }
            );
          }
        }
      );
    }
  });
});

app.put("/api/users/profile/update", (req, res) => {
  let data;

  console.log(req.body.type);
  switch (req.body.type) {
    case "PARENT": {
      data = {
        username: req.body.username,
        data: [
          {
            username: req.body.username,
            data: [
              {
                username: req.body.username,
                password: req.body.password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                contact_info: req.body.contact_info,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                state: req.body.state,
                city: req.body.city,
                pin_code: req.body.pin_code,
                building: req.body.building,
                kids_info: req.body.kids_info,
                kids_array: req.body.kids_array,
                profile_photo: req.body.profile_photo,
                identity_photo: req.body.identity_photo,
                identity_number: req.body.identity_number,
              },
            ],
            type: "PARENT",
          },
        ],
        type: "PARENT",
      };
      break;
    }
    case "BABYSITTER": {
      data = {
        username: req.body.username,
        data: [
          {
            username: req.body.username,
            data: [
              {
                username: req.body.username,
                password: req.body.password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
                profile_photo: req.body.profile_photo,
                address: req.body.address,
                state: req.body.state,
                city: req.body.city,
                pin_code: req.body.pin_code,
                pricing: req.body.pricing,
                activities: req.body.activities,
                services_offered: req.body.services_offered,
                special_features: req.body.special_features,
                gallery_photos: req.body.gallery_photos,
                birth_date: req.body.birth_date,
                identity_number: req.body.identity_number,
                identity_photo: req.body.identity_photo,
                about_yourself: req.body.about_yourself,
              },
            ],
            type: "BABYSITTER",
          },
        ],
        type: "BABYSITTER",
      };

      break;
    }
    case "CRECHE": {
      data = {
        username: req.body.username,
        data: [
          {
            username: req.body.username,
            data: [
              {
                username: req.body.username,
                password: req.body.password,
                director_name: req.body.director_name,
                creche_name: req.body.creche_name,
                profile_photo: req.body.profile_photo,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                state: req.body.state,
                city: req.body.city,
                pin_code: req.body.pin_code,
                pricing: req.body.pricing,
                activities: req.body.activities,
                services_offered: req.body.services_offered,
                special_features: req.body.special_features,
                gallery_photos: req.body.gallery_photos,
                lat: req.body.lat,
                long: req.body.long,
                capacity: req.body.capacity,
                identity_number: req.body.identity_number,
                identity_photo: req.body.identity_photo,
                daycare_license_number_kyc: req.body.daycare_license_number_kyc,
                daycare_license_photo_kyc: req.body.daycare_license_photo_kyc,
              },
            ],
            type: "CRECHE",
          },
        ],
        type: "CRECHE",
      };
      break;
    }
  }
  Users.findOneAndUpdate(
    { username: req.body.username },
    data,
    (err, result) => {
      if (err) res.json({ status: false, message: "error occurred: " + err });
      else {
        res.json({
          status: true,
          message: "Profile Updated.",
        });
      }
    }
  );
});

// ! --------------------------------------------------------------------------------

app.get("/api/users/feedback", function (req, res) {
  Feedbacks.find({}, function (err, feedback) {
    if (err) res.send({ auth: false, message: err });
    else {
      res.send({ auth: true, message: feedback });
    }
  });
});

app.post("/api/users/feedback", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const feedback = new Feedbacks({
    name,
    email,
    message,
  });

  try {
    feedback.save();

    res.send({ auth: true, message: "feedback saved" });
  } catch (err) {
    res.send({ auth: false, message: err });
  }
});
// connect to mongo db
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected");
  }
);

app.listen(3001, () => {
  console.log("listening on port 3001");
});
