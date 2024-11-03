"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  DeleteIcon,
  Eye,
  EyeIcon,
  Loader2,
  MoreHorizontal,
  PencilLine,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { fetchPosts } from "@/app/context/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Loadar from "@/app/global/Loadar";
function ManagePostMain() {
  const data = useSelector((state) => state.posts.data) || [];
  const postStatus = useSelector((state) => state.posts.status);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();
  const columns = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="text-lg font-semibold text-black"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "content",
      header: () => (
        <h2 className="text-lg font-semibold text-black">Content</h2>
      ),
      cell: ({ row }) => {
        const content = row?.original?.content.slice(0, 100);
        return <div dangerouslySetInnerHTML={{ __html: content }} />;
      },
    },
    {
      accessorKey: "category",
      header: () => (
        <h2 className="text-lg font-semibold text-black">Category</h2>
      ),
      cell: ({ row }) => {
        const category = row?.original?.category;
        console.log(category);
        return <div className="text-right font-medium">{category}</div>;
      },
    },
    {
      accessorKey: "tags",
      header: () => <h2 className="text-lg font-semibold text-black">Tags</h2>,
      cell: ({ row }) => {
        const tags = row?.original?.tags;
        return (
          <div className="flex justify-center items-center gap-x-1">
            {tags.map((tag) => {
              return (
                <button className="px-3 py-1 rounded bg-gray-200" key={tag}>
                  {tag}
                </button>
              );
            })}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => (
        <h2 className="text-lg font-semibold text-black">Action</h2>
      ),
      cell: ({ row }) => {
        return (
          <div>
            <div className="flex justify-end items-center gap-x-2">
              <Eye
                onClick={() => router.push(`/blogs/${row?.original?._id}`)}
                className="text-green-500 cursor-pointer"
              />
              <PencilLine className="text-blue-500 cursor-pointer" />
              <Trash2
                onClick={() => handleDelete(row?.original?._id)}
                className="text-red-500 cursor-pointer"
              />
            </div>
          </div>
        );
      },
    },
  ];
  const table = useReactTable({
    data,
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
    // Add logic for deleting the post here
    try {
      const result = await axios.delete(`/api/posts/${id}`);
      toast.success("Delete post successfully");
      if (result) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete post failed");
    }
  };

  return (
    <div>
      {postStatus === "loading" ? (
        <Loadar />
      ) : (
        <div className="w-full p-6 rounded bg-white">
          <div>
            <h2 className="font-semibold text-2xl">Manage Posts</h2>
          </div>
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter title..."
              value={table.getColumn("title")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Posts <ChevronDown className="ml-2 h-4 w-4" />
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
export default ManagePostMain;
