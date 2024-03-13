import DashboardLayout from "../../Pages/Dashboard/Dashboard";
import PageHeader from "../Header/PageHeader";
import { GoPeople } from "react-icons/go";
import { GrScheduleNew } from "react-icons/gr";
import { MdPayment } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import UpcomingTable from "../Tables/Upcoming";
// import UpcomingTable from "../Tables/Upcoming"

export default function Dashboards() {
  const id = JSON.parse(localStorage.getItem("user"))?.UserID;
  const [client, setClient] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [upcomingEvent, setUpcomingEvent] = useState([]);

  const getSchedule = async () => {
    try {
      const res = await axios.get(
        `https://plaintiff-backend.onrender.com/api_v1/schedules/all_schedules/${id}`
      );
      setSchedule(res?.data);
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  const allClient = async () => {
    try {
      const res = await axios.get(
        `https://plaintiff-backend.onrender.com/api_v1/getClients/${id}`
      );
      setClient(res?.data.data);
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };
  useEffect(() => {
    getSchedule();
    allClient();
  }, []);

  return (
    <>
      <DashboardLayout>
        <PageHeader title="Dashboard" />

        <section className=" h-[77vh]  w-full flex items-center justify-center  ">
          <div className="w-[100%]  lg:h-5/6  h-[100%] flex space-x-4 lg:justify-start justify-center ">
            <div className="w-1/5   space-y-4  items-center  py-4  rounded-sm  shadow-md   flex-col hidden lg:flex ">
              <div className="w-4/5 h-24  rounded  items-center -center flex flex-col py-2" style={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
              }}>
                <h3 className="text-lg">Total schedules</h3>

                <p className="text-sm text-#003482ff "> ({schedule.length}) </p>
              </div>
              <div className="w-4/5 h-24  bg-white rounded  items-center justify-center flex flex-col"style={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
              }}
              
              >
                <h3 className="text-lg">Total Clients</h3>
                <p className="text-sm text-#003482ff "> ( {client.length} )</p>
              </div>
              <div className="w-4/5 h-24  rounded  items-center justify-center flex flex-col" style={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
              }}>
                <h3 className="text-base first-letter:">Total schedules</h3>

                <p className="text-sm text-#003482ff "> ({schedule.length}) </p>
              </div>
            </div>

            <div className="lg:w-3/4 w-full  space-y-4 h-5/6  flex flex-col " style={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
              }}>
              <div className="h-[25%] flex space-x-4 py-4  items-center justify-center text-center " >
                <div className="w-4/5 h-24  rounded  items-center justify-center flex flex-col py-2" style={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
              }}>
                  <MdPayment style={{ color: "#003482ff" }} />
                  <Link to="/payments" className="link">
                    <p>Get a payment plan</p>
                  </Link>
                </div>
                <div className="w-4/5 h-24  rounded  items-center justify-center flex flex-col py-2" style={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
              }}>
                  <IoPersonAddOutline style={{ color: "#003482ff" }} />
                  <Link to="/clients" className="link">
                    <p>Add a client</p>
                  </Link>
                </div>
                <div className="w-4/5 h-24 rounded  items-center  justify-center flex flex-col py-2" style={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
              }}>
                  <GrScheduleNew style={{ color: "#003482ff" }} />
                  <Link to="/schedules" className="link">
                    <p>Schedule an appointment</p>
                  </Link>
                </div>
              </div>
              <div className="">
                <UpcomingTable />
              </div>
            </div>
          </div>
        </section>
      </DashboardLayout>
    </>
  );
}
