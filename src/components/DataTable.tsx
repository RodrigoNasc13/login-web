import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from './Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  pageIndex?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  pageIndex,
  pageSize,
  totalElements,
  totalPages,
  onPreviousPage,
  onNextPage,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const hasPaginationInfo =
    pageIndex !== undefined &&
    pageSize !== undefined &&
    totalElements !== undefined &&
    totalPages !== undefined;

  const safePageIndex = pageIndex ?? 0;
  const safePageSize = pageSize ?? data.length;
  const safeTotalElements = totalElements ?? data.length;

  const from = safeTotalElements === 0 ? 0 : safePageIndex * safePageSize + 1;
  const to =
    safeTotalElements === 0
      ? 0
      : Math.min(safePageIndex * safePageSize + data.length, safeTotalElements);

  const canGoToPreviousPage = hasPaginationInfo && safePageIndex > 0;
  const canGoToNextPage =
    hasPaginationInfo && safePageIndex < (totalPages ?? 1) - 1;

  return (
    <div>
      <div>
        <div>
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
                              header.getContext(),
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
                  <TableCell colSpan={columns.length}>
                    <div className="flex w-full items-center justify-center gap-2 text-slate-400">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      Carregando...
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between px-2 text-on-surface-variant text-sm">
        <p>
          Showing <span className="font-medium text-on-surface">{from}</span> to{' '}
          <span className="font-medium text-on-surface">{to}</span> of{' '}
          <span className="font-medium text-on-surface">
            {safeTotalElements}
          </span>{' '}
          results
        </p>
        <div className="flex space-x-2">
          <Button
            type="button"
            onClick={onPreviousPage}
            className="rounded-lg border-0 bg-transparent p-2 text-slate-400 transition-colors hover:bg-default-gray hover:text-white disabled:opacity-50"
            disabled={!canGoToPreviousPage || isLoading}
          >
            Previous
          </Button>
          <Button
            type="button"
            onClick={onNextPage}
            className="rounded-lg border-0 bg-transparent p-2 text-slate-400 transition-colors hover:bg-default-gray hover:text-white"
            disabled={!canGoToNextPage || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
