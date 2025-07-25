"use client";

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Loader2, Search } from "lucide-react";
import { CalendarDatePicker } from "./calendar-date-picker";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey?: string;
  isLoading?: boolean;
  startDate?: Date;
  endDate?: Date;
  setStartDate?: (date: Date) => void;
  setEndDate?: (date: Date) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey,
  isLoading,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: DataTableProps<TData, TValue>) {
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: startDate,
    to: endDate,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  useEffect(() => {
    if (startDate && endDate) {
      setSelectedDateRange({
        from: startDate,
        to: endDate,
      });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (selectedDateRange.from && selectedDateRange.to) {
      setStartDate?.(selectedDateRange.from);
      setEndDate?.(selectedDateRange.to);
    }
  }, [selectedDateRange, setStartDate, setEndDate]);

  return (
    <div className="w-full min-w-0">
      <div className="flex items-center py-4 justify-between gap-4">
        {filterKey && (
          <Input
            placeholder={`Search ${filterKey}...`}
            value={
              (table.getColumn(filterKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filterKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            icon={<Search className="size-4" />}
          />
        )}
        {startDate && endDate && (
          <CalendarDatePicker
            date={selectedDateRange}
            onDateSelect={setSelectedDateRange}
            variant="outline"
          />
        )}
      </div>
      <div className="w-full min-w-0 rounded-lg border">
        <div className="overflow-x-auto">
          <Table className="w-full" style={{ minWidth: "600px" }}>
            <TableHeader className="bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="whitespace-nowrap">
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
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <div className="flex justify-center">
                      <Loader2 className="animate-spin size-7" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
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
            <TableFooter>
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className="flex justify-end items-center gap-2">
                    <p className="mr-">
                      Page {table.getState().pagination.pageIndex + 1} of{" "}
                      {table.getPageCount()}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        table.previousPage();
                      }}
                      disabled={!table.getCanPreviousPage() || isLoading}
                      style={{
                        opacity:
                          !table.getCanPreviousPage() || isLoading ? 0.5 : 1,
                        pointerEvents:
                          !table.getCanPreviousPage() || isLoading
                            ? "none"
                            : "auto",
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        table.nextPage();
                      }}
                      disabled={!table.getCanNextPage() || isLoading}
                      style={{
                        opacity: !table.getCanNextPage() || isLoading ? 0.5 : 1,
                        pointerEvents:
                          !table.getCanNextPage() || isLoading
                            ? "none"
                            : "auto",
                      }}
                    >
                      Next
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
