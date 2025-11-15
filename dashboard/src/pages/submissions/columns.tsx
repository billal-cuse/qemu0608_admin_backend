import {createColumnHelper} from "@tanstack/react-table";
import {Submission} from "./index";
import DeleteActions from "./DeleteActions";

const columnHelper = createColumnHelper<Submission>();

export const submissionColumns = [
  columnHelper.display({
    id: "index",
    header: "#",
    cell: (info) => info.row.index + 1,
  }),
  columnHelper.accessor("deviceId", {
    header: "Device ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("date", {
    header: "Submission Time",
    cell: (info) => new Date(info.getValue()).toLocaleTimeString(),
  }),
  columnHelper.accessor("airline", {
    header: "Selected Airline",
    cell: (info) => info.getValue().name,
  }),
  // columnHelper.accessor("date", {
  //   header: "Selected Year",
  //   cell: (info) => new Date(info.getValue()).getFullYear(),
  // }),
  columnHelper.accessor("status", {
    header: "Assessment Status",
    cell: (info) => {
      const status = info.getValue()
      return (
          <span className={`${status === "PASS" ? "bg-[#A1D8CA]" : "bg-[#F2B6B3]"} p-10 `}>
            {status}
          </span>
      )
    },
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
