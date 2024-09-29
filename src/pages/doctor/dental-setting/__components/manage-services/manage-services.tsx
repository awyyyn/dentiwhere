import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";

/* STATES */
import { serviceDataAtom, servicesAtom, serviceDialogAtom } from "@/atoms";

/* TYPES */
import { Service } from "@/types/types.ts";

/* COMPONENTS */
import { Tooltip } from "@/components/shared/tooltip/tooltip.tsx";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import ServiceDialog from "./service-dialog.tsx";

/* ASSETS */
import { Edit, Trash2 } from "lucide-react";

export default function ManageServices() {
	const services = useAtomValue(servicesAtom);
	const setServiceData = useSetAtom(serviceDataAtom);
	const setServiceDialog = useSetAtom(serviceDialogAtom);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState("");

	const columns: ColumnDef<Service>[] = [
		{
			accessorKey: "id",
			id: "id",
			enableHiding: false,
			header: () => <p className="hidsden">#</p>,
			cell: ({ row }) => <p className="s">{row.index + 1}</p>,
		},
		{
			accessorKey: "name",
			header: "Name",
			enableHiding: false,
			cell: ({ row }) => (
				<h1 className="first-letter:uppercase"> {row.getValue("name")}</h1>
			),
		},
		{
			accessorKey: "description",
			header: () => (
				<h1 className="max-w-[20px] sm:max-w-max truncate">Description</h1>
			),
			enableHiding: false,
			cell: ({ row }) => (
				<h1 className="w-[]"> {row.getValue("description")}</h1>
			),
		},
		{
			accessorKey: "active",
			header: () => (
				<h1 className="max-w-[20px] sm:max-w-max truncate">Availability</h1>
			),
			enableHiding: false,
			cell: ({ row }) => (
				<h1 className="w-[]">
					{" "}
					{row.getValue("active") === true ? "Yes" : "No"}
				</h1>
			),
		},
		{
			id: "actions",
			enableHiding: false,
			header: () => <div className=" text-right pr-4  ">Actions</div>,
			cell: ({ row }) => {
				return (
					<div className="flex gap-1 justify-end ">
						<Tooltip tooltip="Edit" delayDuration={500} side="left">
							<Button
								size="icon"
								className="bg-emerald-600 hover:bg-emerald-600"
								onClick={() => {
									setServiceData(row.original);
									setServiceDialog({ mode: "edit", open: true });
								}}>
								<Edit size={18} />
							</Button>
						</Tooltip>
						<Tooltip tooltip="Delete" delayDuration={500}>
							<Button
								size="icon"
								variant="destructive"
								onClick={() => {
									setServiceData(row.original);
									setServiceDialog({ mode: "delete", open: true });
								}}>
								<Trash2 size={18} />
							</Button>
						</Tooltip>
					</div>
				);
			},
		},
	];

	const table = useReactTable({
		data: services,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		globalFilterFn: "auto",
		onGlobalFilterChange: setGlobalFilter,
		state: {
			sorting,
			columnFilters,
			globalFilter,
		},
	});

	return (
		<div className="sm:mr-5 sm:ml-2 ">
			<h1 className="mb-5 text-xl lg:text-3xl ">Services</h1>
			<div className="w-full mb-10 p-2 bg-white rounded-lg shadow-xl">
				<div className="flex items-center justify-between py-4 flex-wrap gap-2">
					<Input
						placeholder="Search..."
						value={globalFilter}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className="max-w-sm"
					/>
					<div className="flex w-full md:max-w-fit">
						<Button
							className="w-full"
							onClick={() => setServiceDialog({ mode: "create", open: true })}>
							Add Service
						</Button>
					</div>
				</div>
				<div className="rounded-md border">
					<Table className="">
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id} className="">
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
			<ServiceDialog />
		</div>
	);
}
