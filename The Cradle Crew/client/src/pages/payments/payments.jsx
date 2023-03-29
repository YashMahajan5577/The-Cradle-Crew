import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Api from "../../routes/api";
import { useNavigate } from "react-router-dom";
const Payments = () => {
  const navigate = useNavigate();

  const dateRef = useRef();
  const timeRef = useRef();
  const hoursRef = useRef();

  useEffect(() => {
    if (window.localStorage.getItem("t34") !== "true") {
      dateRef.current.value = "2022-09-08";
      timeRef.current.value = "21:47";
      hoursRef.current.value = 5;
    }
  }, []);

  function getTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    return yyyy + "-" + mm + "-" + dd;
  }

  return (
    <div>
      <div className="flex">
        <div
          style={{
            display:
              window.localStorage.getItem("t34") === "true" ? "none" : "block",
          }}
          class="py-12 w-full bg-white md:py-24 mt-5"
        >
          <div class="max-w-lg px-4 mx-auto lg:px-8">
            <form class="grid grid-cols-6 gap-4">
              <div class="col-span-3">
                <label
                  class="block mb-1 text-sm text-pink-600"
                  for="first_name"
                >
                  Date
                </label>

                <input
                  class="rounded-lg shadow-sm bg-gray-100 w-full text-sm p-2.5"
                  type="date"
                  min={getTodayDate()}
                  ref={dateRef}
                  id="date"
                />
              </div>

              <div class="col-span-3">
                <label class="block mb-1 text-sm text-pink-600" for="last_name">
                  Time
                </label>

                <input
                  class="rounded-lg shadow-sm bg-gray-100 w-full text-sm p-2.5"
                  type="time"
                  ref={timeRef}
                  id="time"
                />
              </div>

              <div class="col-span-6">
                <label class="block mb-1 text-sm text-pink-600" for="email">
                  Number Of Hours
                </label>

                <input
                  class="rounded-lg shadow-sm bg-gray-100 w-full text-sm p-2.5"
                  type="number"
                  placeholder="5"
                  ref={hoursRef}
                  min={5}
                  id="hours"
                />
              </div>
            </form>
          </div>
        </div>

        <div class="py-12 w-full bg-white md:py-24 mt-5">
          <div class="max-w-lg px-4 mx-auto lg:px-8">
            <form
              class="grid grid-cols-6 gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                const username = window.localStorage.getItem("id");
                let date = dateRef.current.value | "";
                let time = timeRef.current.value | "";
                let hours = hoursRef.current.value | "";

                Api.bookBabysitter(
                  {
                    username,
                    appointee: localStorage.getItem("user"),
                    date,
                    time,
                    hours,
                  },
                  (response) => {
                    if (response.data.status) {
                      alert("Payment Successful.");
                      navigate(-1, { replace: true });
                    } else {
                      alert("Error Occurred!");
                    }
                  }
                );
              }}
            >
              <div class="col-span-3">
                <label
                  class="block mb-1 text-sm text-pink-600"
                  for="first_name"
                >
                  First Name
                </label>

                <input
                  class="rounded-lg shadow-sm bg-gray-100 w-full text-sm p-2.5"
                  type="text"
                  value={"John"}
                  id="frst_name"
                />
              </div>

              <div class="col-span-3">
                <label class="block mb-1 text-sm text-pink-600" for="last_name">
                  Last Name
                </label>

                <input
                  class="rounded-lg shadow-sm bg-gray-100 w-full text-sm p-2.5"
                  type="text"
                  value={"Cooper"}
                  id="last_name"
                />
              </div>

              <div class="col-span-6">
                <label class="block mb-1 text-sm text-pink-600" for="email">
                  Email
                </label>

                <input
                  class="rounded-lg shadow-sm bg-gray-100 w-full text-sm p-2.5"
                  type="email"
                  value={"john123@gmail.com"}
                  id="email"
                />
              </div>

              <div class="col-span-6">
                <label class="block mb-1 text-sm text-pink-600" for="phone">
                  Phone
                </label>

                <input
                  class="rounded-lg shadow-sm bg-gray-100 w-full text-sm p-2.5"
                  type="tel"
                  value={"+1 43928473"}
                  id="phone"
                />
              </div>

              <fieldset class="col-span-6">
                <legend class="block mb-1 text-sm text-pink-600">
                  Card Details
                </legend>

                <div class="-space-y-px bg-white rounded-lg shadow-sm">
                  <div>
                    <label class="sr-only" for="card-number">
                      Card Number
                    </label>

                    <input
                      class="bg-gray-100 relative rounded-t-lg w-full focus:z-10 text-sm p-2.5 placeholder-pink-400"
                      type="text"
                      name="card-number"
                      id="card-number"
                      value={"0923 2132 8370"}
                      placeholder="Card number"
                    />
                  </div>

                  <div class="flex -space-x-px">
                    <div class="flex-1">
                      <label class="sr-only" for="card-expiration-date">
                        Expiration Date
                      </label>

                      <input
                        class="border-pink-200 relative rounded-bl-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                        type="text"
                        name="card-expiration-date"
                        value={"03/29"}
                        id="card-expiration-date"
                        placeholder="MM / YY"
                      />
                    </div>

                    <div class="flex-1">
                      <label class="sr-only" for="card-cvc">
                        CVC
                      </label>

                      <input
                        class="border-pink-200 relative rounded-br-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                        type="text"
                        name="card-cvc"
                        value={"238"}
                        id="card-cvc"
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="col-span-6">
                <legend class="block mb-1 text-sm text-pink-600">
                  Billing Address
                </legend>

                <div class="-space-y-px bg-white rounded-lg shadow-sm">
                  <div>
                    <label class="sr-only" for="country">
                      Country
                    </label>

                    <select
                      class="border-pink-200 relative rounded-t-lg w-full focus:z-10 text-sm p-2.5"
                      id="country"
                      name="country"
                      autocomplete="country-name"
                    >
                      <option>England</option>
                      <option>Wales</option>
                      <option>Scotland</option>
                      <option>France</option>
                      <option>Belgium</option>
                      <option>Japan</option>
                    </select>
                  </div>

                  <div>
                    <label class="sr-only" for="postal-code">
                      ZIP/Post Code
                    </label>

                    <input
                      class="border-pink-200 relative rounded-b-lg w-full focus:z-10 text-sm p-2.5 placeholder-pink-400"
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      value={"416009"}
                      autocomplete="postal-code"
                      placeholder="ZIP/Post Code"
                    />
                  </div>
                </div>
              </fieldset>

              <div class="col-span-6">
                <button
                  class="rounded-lg bg-pink-500 text-sm p-2.5 text-white w-full block"
                  type="submit"
                >
                  Checkout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
