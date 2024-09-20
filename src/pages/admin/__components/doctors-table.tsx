import * as React from "react";
import { ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
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

import { Button } from "@/components/ui/button";
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
import { User } from "@/types/types";
import { BadgeCheck, BadgeX, CircleEllipsis } from "lucide-react";
import { Tooltip } from "./tooltip";

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "id",
		id: "id",
		enableHiding: false,
		header: () => <p className="hidsden">#</p>,
		cell: ({ row }) => <p className="s">{row.index + 1}</p>,
	},
	{
		accessorKey: "firstName",
		header: "Name",
		enableHiding: false,
		cell: ({ row }) => (
			<h1>
				{row.getValue("firstName")} {row.renderValue("lastName")}
			</h1>
		),
	},
	{
		accessorKey: "lastName",
		enableHiding: false,
		header: () => <p className="hidden"></p>,
		cell: () => <p className="hidden" />,
	},

	{
		accessorKey: "email",
		header: () => <div className="text-start">Email</div>,
		cell: ({ row }) => (
			<div className="lowercase text-start">{row.getValue("email")}</div>
		),
	},
	{
		accessorKey: "licenseNumber",
		header: () => <div className="text-start">License Number</div>,
	},
	{
		accessorKey: "status",
		header: () => <div className="text-start">Status</div>,
		cell: ({ row }) => {
			const verified = row.getValue("status") === "VERIFIED";
			const unverified = row.getValue("status") === "UNVERIFIED";

			return (
				<div className="text-start font-medium flex">
					<Tooltip
						className={
							verified
								? "bg-green-500"
								: unverified
								? "bg-red-500"
								: "bg-slate-800"
						}
						tooltip={row.getValue("status")}
						delayDuration={300}>
						{unverified ? (
							<BadgeX size={24} className="cursor-pointer" />
						) : verified ? (
							<BadgeCheck size={24} className="cursor-pointer" />
						) : (
							<CircleEllipsis size={24} className="cursor-pointer" />
						)}
					</Tooltip>
				</div>
			);
		},
	},
	{
		id: "actions",
		enableHiding: false,
		header: () => <div className="justify-center flex   ">Actions</div>,
		cell: () => {
			return (
				<div className="flex  justify-center mr-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild className="w-full ">
							<Button variant="ghost" className="h-8 w-8 p-0 ">
								<span className="sr-only">Open menu</span>
								<DotsHorizontalIcon className="h-4 w-4 " />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
							// onClick={() => navigator.clipboard.writeText(payment.id)}
							>
								Copy payment ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>View customer</DropdownMenuItem>
							<DropdownMenuItem>View payment details</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];

export default function DataTable({ doctors }: { doctors: User[] }) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [globalFilter, setGlobalFilter] = React.useState("");

	const table = useReactTable({
		data: doctors,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		globalFilterFn: "auto",
		onGlobalFilterChange: setGlobalFilter,

		state: {
			sorting,
			columnFilters,
			columnVisibility,
			globalFilter,
		},
	});

	return (
		<div className="w-full p-2 bg-white rounded-lg shadow-xl">
			<div className="flex items-center py-4">
				<Input
					placeholder="Search..."
					value={globalFilter}
					onChange={(e) => setGlobalFilter(e.target.value)}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Show/Hide Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
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
										}>
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
									data-state={row.getIsSelected() && "selected"}>
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
									className="h-24 text-center">
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
						disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
