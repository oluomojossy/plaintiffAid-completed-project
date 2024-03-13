import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import Panel from "../Panel/Panel";
import Search from "../Input/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";



export default function ScheduleTable() {
  const id = JSON.parse(localStorage.getItem("user"))?.UserID;
  const [client, setClient] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});

  const getSchedule = async () => {
    try {
      const res = await axios.get(
        `https://plaintiff-backend.onrender.com/api_v1/schedules/all_schedules/${id}`

      );
      setClient(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  const result = client?.filter((item) => {
    const clientName = item?.clientName.toString();
    const clientEmail = item?.clientEmail
      .toLowerCase()
      .includes(search.toLowerCase());
    const Matched = clientName?.includes(search.toLowerCase());
    return clientEmail || Matched;
  });

  useEffect(() => {
    setFilter(result);
  }, [search, client]);


  const handleDelete = async (userId, scheduleId) => {
    try {
      await axios.delete(
        `https://plaintiff-backend.onrender.com/api_v1/schedule/delete/${userId}/${scheduleId}`
      );
      toast.success("Deleted Successfully");
      getSchedule();
      setDeleted(false); // Close the modal after successful deletion
    } catch (err) {
      console.error("Error deleting schedule:", err);
      toast.error("Failed to delete schedule");
    }
  };

  const results = client.filter((item) => {
    const clientName = item.clientName.toString();
    const clientEmail = item.clientEmail.toLowerCase().includes(search.toLowerCase());
    const Matched = clientName.includes(search.toLowerCase());
    return clientEmail || Matched;
  });

  const showDeleteModal = (userId, scheduleId) => {
    setSelectedClient({ userId, scheduleId });
    setDeleted(true);
  };
  return (
    <>
      <div className="mt-8">
        <Panel title="Schedule History">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />

          <Table
            removeWrapper
            isStriped
            aria-label="Wallets"
            classNames={{
              th: "px-5 py-4 text-left bg-blue-900 text-green-50",
              td: "px-5 py-5",
            }}
          >
            <TableHeader>
              <TableColumn>Client Name </TableColumn>
              <TableColumn>Email </TableColumn>
              <TableColumn>Date for Appointment</TableColumn>
              <TableColumn> Time of Appointement</TableColumn>
              <TableColumn>Schedule Detail</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>

            <TableBody emptyContent={"No rows to display."}>
              {results?.map((row) => (
                <TableRow key={row?.id} className="h-14 py-5">
                  <TableCell>{row?.clientName}</TableCell>
                  <TableCell>{row?.clientEmail}</TableCell>
                  <TableCell>{row?.dateOfAppointment}</TableCell>
                  <TableCell>{row?.timeOfAppointment}</TableCell>
                  <TableCell>{row?.scheduleDetails}</TableCell>
                  <TableCell>
                    <MdDelete
                      className="text-xl cursor-pointer"
                      onClick={() =>
                        showDeleteModal(row.userId, row.id)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>
      </div>


      <Modal
        open={deleted}
        onOk={() =>
          handleDelete(selectedClient.userId, selectedClient.scheduleId)
        }
        onCancel={() => setDeleted(false)}
        okButtonProps={{
          className: "bg-blue-900 text-white rounded w-10 text-sm px-2",
          size: "small",
        }}
        okText="Yes"
        cancelButtonProps={{ hidden: true }}
      >
        <h1>
          <p className="text-red-700">
            Are you sure you want to delete this schedule?
          </p>
        </h1>
      </Modal>
    </>
  );
}
