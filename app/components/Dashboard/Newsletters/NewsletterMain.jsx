"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MessageCircleReply, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loadar from "@/app/global/Loadar";
import { useEffect } from "react";
import ReplyEmail from "@/app/global/ReplyEmail";
function NewsletterMain() {
  const [data, setData] = React.useState([]);
  const newsletters = useSelector((state) => state.newsletters.data) || [];
  const postStatus = useSelector((state) => state.posts.status);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns = [
    {
      accessorKey: "sl",
      header: () => <h2 className="text-lg font-semibold text-black">SL.</h2>,
      cell: ({ row }) => {
        const index = row && row?.index;
        return <div>{index + 1}</div>;
      },
    },

    {
      accessorKey: "email",
      header: () => <h2 className="text-lg font-semibold text-black">Email</h2>,
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },

    {
      accessorKey: "date",
      header: () => <h2 className="text-lg font-semibold text-black">Date</h2>,
      cell: ({ row }) => {
        console.log(row);
        const date = row?.original && row?.original?.createdAt?.split("T")[0];
        return <div className="lowercase">{date}</div>;
      },
    },
    {
      accessorKey: "reply",
      header: () => (
        <h2 className="text-lg font-semibold text-black text-center">
          Replied
        </h2>
      ),
      cell: ({ row }) => {
        const reply = row?.original?.reply;
        return <div className=" text-center">{reply ? "Yes" : "No"}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => (
        <h2 className="text-lg text-center font-semibold text-black">Action</h2>
      ),
      cell: ({ row }) => {
        const id = row?.original && row?.original?._id;
        return (
          <div className="flex justify-end items-center gap-x-2">
            <ReplyEmail
              email={row?.original?.email}
              type="newsletter"
              id={row?.original?._id}
            >
              <MessageCircleReply className="text-indigo-500 cursor-pointer" />
            </ReplyEmail>
            <Trash2
              onClick={() => handleDelete(row?.original?._id)}
              className="text-red-500 cursor-pointer"
            />
          </div>
        );
      },
    },
  ];
  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // delete post
  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`/api/newsletter`, { data: { id } });
      toast.success("Delete newsletter successfully");
      if (result) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete newsletter failed");
    }
  };

  // featch newsletters
  React.useMemo(() => {
    if (newsletters) {
      setData(newsletters);
    }
  }, [newsletters]);

  return (
    <div>
      {postStatus === "loading" ? (
        <Loadar />
      ) : (
        <div className="w-full p-6 rounded bg-white">
          <div>
            <h2 className="font-semibold text-2xl">Manage Newsletters</h2>
          </div>
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter email..."
              value={table.getColumn("email")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Newsletters <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className=" cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default NewsletterMain;
