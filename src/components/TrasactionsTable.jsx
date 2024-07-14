import React, {useState, useEffect} from "react";
import { format } from "date-fns";

import BillingService from "../services/billing.service";

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan, faEye, faCirclePlus, faEllipsisVertical, faMagnifyingGlass, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export const columns = [
  { name: "ID", uid: "id" },
  { name: "Tipo", uid: "type" },
  { name: "Monto", uid: "amount" },
  { name: "Créditos", uid: "credits" },
  { name: "Fecha", uid: "timestamp" },
  // { name: "ID Sesión Stripe", uid: "stripeSessionId" },
];

const statusColorMap = {
  deposit: "success",
  withdrawal: "danger"
};

const TrasactionsTable = ( props ) =>  {

  const [transactions, setTransactions] = useState([]);

  const { userData } = props;

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const trasactionsData = await BillingService.getCreditTransactionsHistory(userData.userId);
        setTransactions(trasactionsData);
        console.log(trasactionsData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    fetchTransactions();
  }, []);


  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "amount":
        return(
          <span className="font-semibold">
            ${cellValue}
          </span>
        );
      case "type":
        return (
          <Chip className="capitalize" color={statusColorMap[data.type]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "timestamp":
        return (
          <span>
            {format(new Date(cellValue), "dd/MM/yyyy - HH:mm")}
          </span>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
  <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={transactions}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}


export default TrasactionsTable;