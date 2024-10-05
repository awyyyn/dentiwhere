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
import { Link } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

/* STATES */
import {
	subscriptionDataAtom,
	subscriptionDialogAtom,
	subscriptionsAtom,
} from "@/atoms";

/* COMPONENTS */
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
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
import { Tooltip } from "../../../components/shared/tooltip/tooltip";

/* ASSETS */
import { CircleCheck, CircleX, PencilIcon, TrashIcon } from "lucide-react";

/* TYPES */
import { Subscription } from "@/types/types";
import { AddSubscriptionDialog } from "./add-subscription-dialog";
import { monthsToYears } from "date-fns";

export default function SubscriptionTable() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [globalFilter, setGlobalFilter] = React.useState("");
	const setSubscriptionDialog = useSetAtom(subscriptionDialogAtom);
	const subscriptions = useAtomValue(subscriptionsAtom);
	const setSubscriptionData = useSetAtom(subscriptionDataAtom);

	const columns: ColumnDef<Subscription>[] = [
		{
			accessorKey: "id",
			id: "id",
			enableHiding: false,
			header: () => <p className="hidsden">#</p>,
			cell: ({ row }) => <p className="s">{row.index + 1}</p>,
		},
		{
			enableHiding: false,
			accessorKey: "name",
			header: "Subscription Name",
			cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
		},
		{
			accessorKey: "months",
			header: () => {
				return <div className="text-start">Duration</div>;
			},
			cell: ({ row }) => {
				const months = row.original.months;
				const years = months >= 12 ? monthsToYears(months) : 0;
				const remainingMonths = months % 12;

				return (
					<div className="  text-start  ">
						{years
							? remainingMonths === 0
								? "1 year"
								: `${years} year(s) and ${remainingMonths} month(s)`
							: `${row.original.months} month(s)`}
					</div>
				);
			},
		},
		{
			accessorKey: "price",
			header: () => <div className="text-start">Price</div>,
			cell: ({ row }) => {
				return (
					<div className="text-start  ">
						{new Intl.NumberFormat("en-PH", {
							style: "currency",
							currency: "PHP",
						}).format(row.original.price)}
					</div>
				);
			},
		},
		{
			accessorKey: "description",
			header: () => <div className="text-start">Description</div>,
			cell: ({ row }) => {
				return <p className="truncate">{row.original.description}</p>;
			},
		},
		{
			id: "actions",
			enableHiding: false,

			header: () => <div className="justify-end flex   ">Actions</div>,
			cell: ({ row }) => {
				return (
					<div className="flex  justify-end mr-2">
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
									onClick={() => {
										setSubscriptionData(row.original);
										setSubscriptionDialog({
											mode: "edit",
											open: true,
										});
									}} // Add your edit action handler here
									className="cursor-pointer hover:bg-gray-800/10">
									<PencilIcon className="h-4 w-4 mr-2" />
									Edit
								</DropdownMenuItem>
								{row.original.id !== 8 && (
									<DropdownMenuItem
										onClick={() => {
											setSubscriptionData(row.original);
											setSubscriptionDialog({
												mode: "delete",
												open: true,
											});
										}} // Add your delete action handler here
										className="cursor-pointer hover:bg-gray-800/10">
										<TrashIcon className="h-4 w-4 mr-2" />
										Delete
									</DropdownMenuItem>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
	];

	const table = useReactTable({
		data: subscriptions,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
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
			<div className="flex items-center py-4 flex-wrap space-y-2 lg:space-y-0 lg:justify-between">
				<div className="w-full lg:max-w-fit">
					<Input
						placeholder="Search..."
						value={globalFilter}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className=" lg:max-w-sm  "
					/>
				</div>

				<div className="flex gap-2 flex-wrap ">
					<Button
						onClick={() =>
							setSubscriptionDialog({ open: true, mode: "create" })
						}
						className="w-full lg:max-w-fit">
						Add New Subscription
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="lg:ml-auto w-full lg:max-w-fit">
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

			<AddSubscriptionDialog />
		</div>
	);
}
