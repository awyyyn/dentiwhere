
import { Accessibility } from "@/types/types.ts";
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table.tsx";
import {useAtomValue, useSetAtom} from "jotai";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import AccessibilityDialog from "./accesibility-dialog.tsx";
import { accessbilityDialogAtom } from "@/atoms/dialogs-atom.ts";
import { Edit, Trash2} from "lucide-react";
import {Tooltip} from "@/pages/admin/__components/tooltip.tsx";
import {accessibilitiesAtom, accessibilitiesDataAtom} from "@/atoms/accessibility-atom.ts";

export default function ManageAccessibility() {
	const accessibilities  = useAtomValue(accessibilitiesAtom);
	const setAccessibilityData = useSetAtom(accessibilitiesDataAtom);
	const setAccessibilityDialog = useSetAtom(accessbilityDialogAtom);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState("");


	const columns: ColumnDef<Accessibility>[] = [
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
			cell: ({ row }) => <h1 className="w-[]"> {row.getValue("name")}</h1>,
		},
		{
			id: "actions",
			enableHiding: false,
			header: () => <div className=" text-right pr-4  ">Actions</div>,
			cell: ({ row, }) => {
				return <div className="flex gap-1 justify-end ">
					<Tooltip tooltip="Edit" delayDuration={500}  side="left">
						<Button
							size="icon"
							className="bg-emerald-600 hover:bg-emerald-600"
							onClick={() =>  {
								setAccessibilityData(row.original)
								setAccessibilityDialog({mode: "edit", open: true});
							}}>
							<Edit size={18} />
						</Button>
					</Tooltip>
					<Tooltip tooltip="Delete" delayDuration={500} >
						<Button
							size="icon"
							variant="destructive"
							onClick={() => {
								setAccessibilityData(row.original)
								setAccessibilityDialog({mode: "delete", open: true})
							}}>
							<Trash2 size={18} />
						</Button>
					</Tooltip>
				</div>;
			},
		},
	];


	const table = useReactTable({
		data: accessibilities,
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
		<div className="mr-5 ml-2  ">
			<h1 className="mb-5 text-xl lg:text-3xl ">Accessibility</h1>
			<div className="w-full p-2 bg-white rounded-lg shadow-xl">
				<div className="flex items-center justify-between py-4">
					<Input
						placeholder="Search..."
						value={globalFilter}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className="max-w-sm"
					/>
					<div className="flex">
						<Button onClick={() => setAccessibilityDialog({mode: "create", open: true})}>Add Accessibility</Button>
					</div>
					{/* <DropdownMenu>
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
					</DropdownMenu> */}
				</div>
				<div className="rounded-md border">
					<Table>
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
											<TableCell  key={cell.id}>
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
			<AccessibilityDialog />
		</div>
	);
}
