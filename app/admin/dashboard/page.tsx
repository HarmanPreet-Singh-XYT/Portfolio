// src/components/AppDashboard.tsx
'use client'
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  useReactTable,
} from '@tanstack/react-table';
import {
  MoreHorizontal,
  PlusCircle,
  FilePenLine,
  Trash2,
  Loader2,
  ServerCrash,
  ArrowUpDown,
  Search,
  Download,
  RefreshCw,
  Settings2,
  CheckSquare,
  Square,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

// Import your custom hooks
import {
  useApps,
  useDeleteApp,
} from '../../../hooks/useApp';
import type { AppDetails } from '../../../types/app';

// Import ShadCN UI Components
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// Enhanced Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    active: { color: 'bg-green-600 text-white', pulse: true },
    inactive: { color: 'bg-red-600 text-white', pulse: false },
    pending: { color: 'bg-yellow-600 text-white', pulse: true },
    default: { color: 'bg-zinc-600 text-white', pulse: false },
  };

  const config = statusConfig[status?.toLowerCase() as keyof typeof statusConfig] || statusConfig.default;

  return (
    <div className="relative inline-flex">
      {config.pulse && (
        <span className={cn(
          "absolute inset-0 rounded-full opacity-75 animate-ping",
          config.color.split(' ')[0]
        )} />
      )}
      <Badge className={cn(config.color, "border-none relative")}>
        {status}
      </Badge>
    </div>
  );
};

// Loading Skeleton Component
const TableSkeleton = () => (
  <div className="space-y-3 p-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-lg bg-zinc-800" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/4 bg-zinc-800" />
          <Skeleton className="h-3 w-1/3 bg-zinc-800" />
        </div>
        <Skeleton className="h-8 w-20 bg-zinc-800" />
        <Skeleton className="h-8 w-8 rounded bg-zinc-800" />
      </div>
    ))}
  </div>
);

// Empty State Component
const EmptyState = ({ onCreateClick }: { onCreateClick: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="bg-zinc-900 rounded-full p-4 mb-4">
      <PlusCircle className="h-12 w-12 text-zinc-600" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">No applications yet</h3>
    <p className="text-zinc-400 text-center mb-6 max-w-sm">
      Get started by creating your first application. It only takes a few minutes.
    </p>
    <Button
      onClick={onCreateClick}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      <PlusCircle className="mr-2 h-4 w-4" />
      Create your first app
    </Button>
  </div>
);

// Enhanced Main App Dashboard Component
export default function AppDashboard() {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  
  const { apps, loading, error, refetch } = useApps();
  const { deleteApp, loading: isDeleting } = useDeleteApp();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Partial<AppDetails> | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  // Memoized selected apps for bulk actions
  const selectedApps = useMemo(() => {
    return Object.keys(rowSelection)
      .filter(key => rowSelection[key as keyof typeof rowSelection])
      .map(index => apps?.[parseInt(index)])
      .filter(Boolean) as Partial<AppDetails>[];
  }, [rowSelection, apps]);

  const handleCreate = () => {
    router.push('/admin/dashboard/create');
  };

  const handleEdit = (app: Partial<AppDetails>) => {
    router.push(`/admin/dashboard/modify/${app.id}`);
  };

  const handleDelete = (app: Partial<AppDetails>) => {
    setSelectedApp(app);
    setIsAlertOpen(true);
  };

  const handleBulkDelete = () => {
    if (selectedApps.length > 0) {
      setSelectedApp({ name: `${selectedApps.length} applications` });
      setIsAlertOpen(true);
    }
  };

  const confirmDelete = async () => {
    try {
      if (selectedApps.length > 0) {
        // Bulk delete
        await Promise.all(selectedApps.map(app => app.id && deleteApp(app.id)));
        toast.success(`${selectedApps.length} applications deleted successfully!`);
        setRowSelection({});
      } else if (selectedApp?.id) {
        // Single delete
        await deleteApp(selectedApp.id);
        toast.success('Application deleted successfully!');
      }
      refetch();
    } catch (error) {
      toast.error('Failed to delete application(s)');
    }
    setIsAlertOpen(false);
    setSelectedApp(null);
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      setLastRefreshed(new Date());
      toast.success('Data refreshed successfully');
    } catch (error) {
      toast.error('Failed to refresh data');
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  const exportData = useCallback(() => {
    if (!apps || apps.length === 0) {
      toast.error('No data to export');
      return;
    }

    const csvContent = [
      ['Name', 'Description', 'Version', 'Size', 'Tech Stack', 'Release Date'],
      ...apps.map(app => [
        app.name || '',
        app.shortDescription || '',
        app.additionalInfo?.version || '',
        app.additionalInfo?.size || '',
        app.techStack?.join(', ') || '',
        app.additionalInfo?.releaseDate || '',
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apps-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Data exported successfully');
  }, [apps]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            handleCreate();
            break;
          case 'r':
            e.preventDefault();
            handleRefresh();
            break;
          case 'e':
            e.preventDefault();
            exportData();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleRefresh, exportData]);

  const columns: ColumnDef<Partial<AppDetails>>[] = useMemo(() => [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-zinc-600"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-zinc-600"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-white hover:text-white hover:bg-zinc-800 p-0"
          >
            Application
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="relative group">
            <img
              src={row.original.icon}
              alt={row.original.name ?? 'App icon'}
              className="h-12 w-12 rounded-lg object-cover border border-zinc-600 transition-transform group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-icon.png';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-white text-base hover:text-blue-400 transition-colors cursor-pointer">
              {row.original.name}
            </span>
            <span className="text-sm text-zinc-400">{row.original.additionalInfo?.category}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'shortDescription',
      header: 'Description',
            cell: ({ row }) => (
        <div className="max-w-sm">
          <p className="text-zinc-300 text-sm line-clamp-2">
            {row.original.shortDescription}
          </p>
        </div>
      ),
    },
    {
      accessorKey: 'additionalInfo.version',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-white hover:text-white hover:bg-zinc-800 p-0"
          >
            Version
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-zinc-800 border-zinc-600 text-white">
          v{row.original.additionalInfo?.version}
        </Badge>
      ),
    },
    {
      accessorKey: 'additionalInfo.size',
      header: 'Size',
      cell: ({ row }) => (
        <span className="text-zinc-300 text-sm font-mono">
          {row.original.additionalInfo?.size}
        </span>
      ),
    },
    {
      accessorKey: 'techStack',
      header: 'Tech Stack',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {row.original.techStack?.slice(0, 3).map((tech, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-blue-600/20 text-blue-400 border-blue-600/30 text-xs hover:bg-blue-600/30 transition-colors"
            >
              {tech}
            </Badge>
          ))}
          {row.original.techStack && row.original.techStack.length > 3 && (
            <Badge variant="outline" className="bg-zinc-800 border-zinc-600 text-zinc-300 text-xs">
              +{row.original.techStack.length - 3}
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'additionalInfo.releaseDate',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-white hover:text-white hover:bg-zinc-800 p-0"
          >
            Release Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.original.additionalInfo?.releaseDate;
        return (
          <span className="text-zinc-300 text-sm">
            {date ? new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) : 'N/A'}
          </span>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const app = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-700 text-white">
              <DropdownMenuItem
                onClick={() => handleEdit(app)}
                className="cursor-pointer hover:bg-zinc-800 text-zinc-200"
              >
                <FilePenLine className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-700" />
              <DropdownMenuItem
                onClick={() => handleDelete(app)}
                className="cursor-pointer text-red-400 hover:bg-red-600 hover:text-white"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ], []);

  const table = useReactTable({
    data: apps ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  // Auto-refresh timer display
  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Toaster richColors theme="dark" position="top-right" />
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              App Dashboard
            </h1>
            <p className="text-zinc-400 mt-2 text-lg">
              Manage all your application entries in one place
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="icon"
              className="bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800"
              disabled={isRefreshing}
            >
              <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
            </Button>
            <Button
              onClick={exportData}
              variant="outline"
              size="icon"
              className="bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 h-auto"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Create App
            </Button>
          </div>
        </header>

        {/* Main Card */}
        <Card className="bg-zinc-900 border-zinc-700 shadow-xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl font-semibold text-white">
                  Applications
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  {apps?.length || 0} applications • Last updated {getTimeAgo(lastRefreshed)}
                </CardDescription>
              </div>
              
              {/* Filters and Controls */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                  <Input
                    placeholder="Search applications..."
                    value={globalFilter ?? ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 w-full sm:w-64"
                  />
                </div>
                
                {/* Column visibility dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                    >
                      <Settings2 className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-700">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize text-zinc-200 hover:bg-zinc-800"
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
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Bulk Actions */}
            {selectedApps.length > 0 && (
              <div className="mb-4 p-4 bg-zinc-800 rounded-lg flex items-center justify-between">
                <span className="text-zinc-300">
                  {selectedApps.length} item{selectedApps.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setRowSelection({})}
                    variant="outline"
                    size="sm"
                    className="bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600"
                  >
                    Clear selection
                  </Button>
                  <Button
                    onClick={handleBulkDelete}
                    variant="destructive"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete selected
                  </Button>
                </div>
              </div>
            )}

            {/* Table Content */}
            {loading ? (
              <TableSkeleton />
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-64 text-red-400">
                <ServerCrash className="h-16 w-16 mb-4" />
                <p className="text-xl font-semibold">Failed to load applications</p>
                <p className="text-zinc-400 mb-4">{error}</p>
                <Button
                  onClick={() => refetch()}
                  variant="outline"
                  className="bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700"
                >
                  Try Again
                </Button>
              </div>
            ) : apps?.length === 0 ? (
              <EmptyState onCreateClick={handleCreate} />
            ) : (
              <>
                <div className="rounded-lg border border-zinc-700 overflow-hidden">
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="border-zinc-700 bg-zinc-800">
                          {headerGroup.headers.map((header) => (
                            <TableHead
                              key={header.id}
                              className="text-white font-semibold px-6 py-4"
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className={cn(
                              "border-zinc-700 hover:bg-zinc-800/50 transition-colors",
                              row.getIsSelected() && "bg-zinc-800/30"
                            )}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} className="px-6 py-4">
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
                            className="h-24 text-center text-zinc-400"
                          >
                            No results found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-zinc-400">
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                      apps?.length || 0
                    )}{' '}
                    of {apps?.length || 0} results
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select
                      value={table.getState().pagination.pageSize.toString()}
                      onValueChange={(value) => table.setPageSize(Number(value))}
                    >
                      <SelectTrigger className="w-[100px] bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-700">
                        {[10, 20, 30, 50, 100].map((pageSize) => (
                          <SelectItem key={pageSize} value={pageSize.toString()} className="text-zinc-200">
                            {pageSize} / page
                          </SelectItem>
                        ))}
                                            </SelectContent>
                    </Select>
                    
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex items-center gap-1 px-2">
                        <span className="text-sm text-zinc-400">Page</span>
                        <span className="text-sm font-medium text-white">
                          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </span>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Keyboard Shortcuts Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-500">
            Quick actions: 
            <kbd className="mx-1 px-2 py-1 text-xs bg-zinc-800 border border-zinc-700 rounded">⌘N</kbd>
            Create App
            <kbd className="mx-1 px-2 py-1 text-xs bg-zinc-800 border border-zinc-700 rounded">⌘R</kbd>
            Refresh
            <kbd className="mx-1 px-2 py-1 text-xs bg-zinc-800 border border-zinc-700 rounded">⌘E</kbd>
            Export
          </p>
        </div>
      </div>

      {/* Enhanced Alert Dialog for Delete Confirmation */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-white">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              {selectedApps.length > 0 ? (
                <>
                  This action cannot be undone. This will permanently delete{' '}
                  <span className="font-semibold text-white">
                    {selectedApps.length} application{selectedApps.length > 1 ? 's' : ''}
                  </span>{' '}
                  and remove all associated data from the system.
                  
                  <div className="mt-3 p-3 bg-zinc-800 rounded-md max-h-32 overflow-y-auto">
                    {selectedApps.map((app, index) => (
                      <div key={index} className="text-sm text-zinc-300">
                        • {app.name}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  This action cannot be undone. This will permanently delete{' '}
                  <span className="font-semibold text-white">
                    "{selectedApp?.name}"
                  </span>{' '}
                  and remove all its data from the system.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete {selectedApps.length > 0 ? `${selectedApps.length} Applications` : 'Application'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}