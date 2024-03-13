import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import Panel from "../Panel/Panel";
import axios from "axios";
import Search from "../Input/Search";
import { useState, useEffect } from "react";
import { CgOpenCollective } from "react-icons/cg";
import { Modal } from "antd";
import { toast } from "react-toastify";

export default function DataTable() {
  const userId = JSON.parse(localStorage.getItem("user"))?.UserID;
  const [client, setClient] = useState([]);
  // const [filter, setFilter] = useState([]);
  // const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState();
  const [deleted, setDeleted] = useState(false);

  const getDeleted = async () => {
    try {
      const res = await axios.get(
        `https://plaintiff-backend.onrender.com/api_v1/client/deleted-clients/${userId}`
      );
      setClient(res?.data);
    } catch (err) {
      console.error(err);
    }
  };

  const restoreDeleted = async () => {
    try {
      await axios.put(
        `https://plaintiff-backend.onrender.com/api_v1/client/restore/${userId}/${selectedClient}`
      );
      // refetch deleted clients
      getDeleted();
      // close modal
      setDeleted(false)
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getDeleted();
  }, []);

  return (
    <>
      <div className="mt-8">
        <Panel title="History">
          <Search />
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
              <TableColumn>First Name </TableColumn>
              <TableColumn>Last Name </TableColumn>
              <TableColumn>Email </TableColumn>
              <TableColumn>Phone Number</TableColumn>
              <TableColumn> Address</TableColumn>
              <TableColumn>Gender</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>

            <TableBody emptyContent={"No rows to display."}>
              {client?.map((row) => (
                <TableRow key={row.CaseID} className="h-14 py-5">
                  <TableCell>{row.FirstName}</TableCell>
                  <TableCell>{row.LastName}</TableCell>
                  <TableCell>{row.Email}</TableCell>
                  <TableCell>{row.ContactNumber}</TableCell>
                  <TableCell>{row.Address}</TableCell>
                  <TableCell>{row.Gender}</TableCell>
                  <TableCell>
                    <CgOpenCollective className="text-xl cursor-pointer" onClick={() => {
                      console.log('selectedClient', row)
                      setSelectedClient(row.ClientID)
                      setDeleted(true)
                    }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>
      </div>
      <Modal
        open={deleted}
        onOk={() => restoreDeleted()}
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
            Are you sure you want to restore this client?
          </p>
        </h1>
      </Modal>
    </>
  );
}
