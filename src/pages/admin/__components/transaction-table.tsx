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
import { useAtomValue } from "jotai";

/* STATES */
import { paymentsAtom } from "@/atoms";

/* COMPONENTS */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

/* ASSETS */
// import { CircleCheck, CircleX, PencilIcon, TrashIcon } from "lucide-react";

/* TYPES */
import { formatDate } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { PaymentPartialInfo } from "@/types/types";

export default function TransactionaTable() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [globalFilter, setGlobalFilter] = React.useState("");
	const payments = useAtomValue(paymentsAtom);
	// const setSubscriptionData = useSetAtom(subscriptionDataAtom);

	console.log("asdasdasd asdasdasd", payments);

	const columns: ColumnDef<PaymentPartialInfo>[] = [
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
			header: "Name",
			cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
		},
		{
			accessorKey: "email",
			header: () => {
				return <div className="text-start">Email</div>;
			},
			cell: ({ row }) => {
				return <div className="  text-start  ">{row.original.email}</div>;
			},
		},
		{
			accessorKey: "amount",
			header: () => <div className="text-start">Amount</div>,
			cell: ({ row }) => {
				return (
					<div className="text-start  ">
						{new Intl.NumberFormat("en-PH", {
							style: "currency",
							currency: "PHP",
						}).format(Number(row.original?.amount.toString().slice(0, -2)))}
					</div>
				);
			},
		},
		{
			accessorKey: "description",
			header: () => <div className="text-start">Description</div>,
			cell: ({ row }) => {
				return <p className="truncate">{row.original?.description}</p>;
			},
		},
		{
			accessorKey: "paid_at",
			header: () => <div className="text-start">Paid At</div>,
			cell: ({ row }) => {
				const status = row.original?.status;
				const isPaid = status === "paid";
				return (
					<p>
						{isPaid
							? formatDate(
									new Date(row.original.paid_at).toString(),
									"MMM dd, yyyy"
							  )
							: "N / A"}
					</p>
				);
			},
		},
		{
			accessorKey: "status",
			header: () => <div className="text-start">Status</div>,
			cell: ({ row }) => {
				const status = row.original?.status;
				const isPaid = status === "paid";
				return (
					<Badge
						className={`${
							isPaid
								? "bg-emerald-500 text-white"
								: "bg-destructive text-destructive-foreground"
						} uppercase`}>
						{status}
					</Badge>
				);
			},
		},
	];

	const table = useReactTable({
		data: payments,
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
				<div className="w-full lg:max-w-2xl">
					<Input
						placeholder="Search..."
						value={globalFilter}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className=" lg:max-w-sm  "
					/>
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
		</div>
	);
}
