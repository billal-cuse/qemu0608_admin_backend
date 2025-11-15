import {Submission} from "./index";
import {useTable} from "@refinedev/react-table";
import {submissionColumns} from "./columns";
import {flexRender} from "@tanstack/react-table";
import {Fragment} from "react";

const SubmissionList: React.FC = () => {
    const table = useTable<Submission>({
        refineCoreProps: {
            resource: "submissions",
            pagination: {
                mode: "server",
                current: 1,
                pageSize: 10,
            },
        },
        columns: submissionColumns,
    });


    const {pageIndex, pageSize} = table.getState().pagination;
    const rowCount = table.getRowModel().rows.length;
    const totalItems = table.getRowCount();

    const start = pageIndex * pageSize + 1;
    const end = start + rowCount - 1;

    return (
        <div className="w-full flex flex-col gap-3 bg-white p-4">
            <table className="border-0 rounded w-full font-[500] text-[12px] text-[#303F47]">
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="border-0 text-left">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row, index) => (
                    <Fragment key={row.id}>
                        <tr className={index % 2 !== 0 ? "bg-white" : "bg-[#E7E7E7]"}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="border-0 overflow-hidden">
                                        <span>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </span>
                                </td>
                            ))}
                        </tr>
                        {index < table.getRowModel().rows.length - 1 && (
                            <tr>
                                <td colSpan={row.getVisibleCells().length} className="border-0 p-0.5">
                                    <div className=""/>
                                </td>
                            </tr>
                        )}
                    </Fragment>
                ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex gap-5 items-center">
                <button
                    onClick={() => table.previousPage()}
                    className="border font-[500] text-[12px] text-[#303F47] border-[#303F47] px-3 py-1 rounded-md"
                    disabled={!table.getCanPreviousPage()}
                >
                    Prev
                </button>
                <span>Page {pageIndex + 1}</span>
                <button
                    className="border font-[500] text-[12px] text-[#303F47] border-[#303F47] px-3 py-1 rounded-md"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </button>

                <select
                    value={pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                    className="border border-[#303F47] rounded-md px-2 py-1 text-[12px]"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            <p className="text-[12px] text-[#303F47] font-medium">
                Showing {rowCount > 0 ? `${start} to ${end}` : "0"} of {totalItems} submissions
            </p>
        </div>
    );
};

export default SubmissionList;
