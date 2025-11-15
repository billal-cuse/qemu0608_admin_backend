import {createColumnHelper} from "@tanstack/react-table";
import {Payment} from "./index";
import DeleteActions from "./DeleteActions";

const columnHelper = createColumnHelper<Payment>();

export const PaymentColumns = [
  columnHelper.display({
    id: "index",
    header: "#",
    cell: (info) => info.row.index + 1,
  }),
  columnHelper.accessor("transactionId", {
    header: "Transaction Id",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => new Date(info.getValue()).toLocaleTimeString(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "Date",
    cell: (info) => new Date(info.getValue()).toDateString(),
  }),

  columnHelper.display({
    header: "Actions",
    cell: ({row}) => {
      return (
          <DeleteActions id={row.original.id} />
      )
    },
  }),
];
