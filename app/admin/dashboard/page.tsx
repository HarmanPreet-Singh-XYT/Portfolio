// src/components/AppDashboard.tsx
'use client'
import React from 'react';
import { useState, useMemo } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
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
  X,
} from 'lucide-react';

// Import your custom hooks
import {
  useApps,
  useCreateApp,
  useUpdateApp,
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster, toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Enhanced Zod Schema
const appFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters').max(200, 'Short description must be less than 200 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000, 'Description must be less than 2000 characters'),
  icon: z.string().url('Must be a valid URL'),
  headerImage: z.string().url('Must be a valid URL'),
  category: z.string().min(2, 'Category is required').max(30, 'Category must be less than 30 characters'),
  version: z.string().min(1, 'Version is required').regex(/^\d+\.\d+(\.\d+)?$/, 'Version must be in format X.Y or X.Y.Z'),
  size: z.string().min(1, 'App size is required'),
  developer: z.string().min(2, 'Developer name is required').max(50, 'Developer name must be less than 50 characters'),
  publisher: z.string().min(2, 'Publisher name is required').max(50, 'Publisher name must be less than 50 characters'),
  techStack: z.array(z.string().min(1, 'Technology name is required')).min(1, 'At least one technology is required'),
  storeLinks: z.array(
    z.object({
      platform: z.enum(['windows', 'android', 'ios', 'web', 'linux', 'macos', 'server']),
      url: z.string().url('Must be a valid URL'),
    }),
  ).optional(),
  developers: z.array(
    z.object({
      name: z.string().min(2, "Developer's name is required").max(50, 'Name must be less than 50 characters'),
      role: z.string().min(2, 'Role is required').max(50, 'Role must be less than 50 characters'),
      avatar: z.string().url('Avatar URL must be valid'),
      bio: z.string().min(10, 'Bio must be at least 10 characters').max(500, 'Bio must be less than 500 characters'),
    }),
  ).optional(),
});

type AppFormValues = z.infer<typeof appFormSchema>;

// Enhanced App Form Component
const AppForm = ({
  app,
  onClose,
  onSuccess,
}: {
  app: Partial<AppDetails> | null;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { createApp, loading: isCreating } = useCreateApp();
  const { updateApp, loading: isUpdating } = useUpdateApp();
  const isEditMode = !!app?.id;
  const isLoading = isCreating || isUpdating;

  const defaultValues: Partial<AppFormValues> = {
    name: app?.name ?? '',
    shortDescription: app?.shortDescription ?? '',
    description: app?.description ?? '',
    icon: app?.icon ?? '',
    headerImage: app?.headerImage ?? '',
    category: app?.additionalInfo?.category ?? '',
    version: app?.additionalInfo?.version ?? '',
    size: app?.additionalInfo?.size ?? '',
    developer: app?.additionalInfo?.developer ?? '',
    publisher: app?.additionalInfo?.publisher ?? '',
    techStack: app?.techStack ?? [],
    storeLinks: app?.storeLinks ?? [],
    developers: app?.developers ?? [],
  };

  const form = useForm<AppFormValues>({
    resolver: zodResolver(appFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({
    control: form.control,
    name: 'techStack',
  });

  const { fields: storeLinkFields, append: appendStoreLink, remove: removeStoreLink } = useFieldArray({
    control: form.control,
    name: 'storeLinks',
  });

  const { fields: developerFields, append: appendDeveloper, remove: removeDeveloper } = useFieldArray({
    control: form.control,
    name: 'developers',
  });

  const onSubmit = async (data: AppFormValues) => {
    try {
      const appData = {
        ...app,
        name: data.name,
        shortDescription: data.shortDescription,
        description: data.description,
        icon: data.icon,
        headerImage: data.headerImage,
        techStack: data.techStack,
        storeLinks: data.storeLinks,
        developers: data.developers,
        additionalInfo: {
          ...app?.additionalInfo,
          category: data.category,
          version: data.version,
          size: data.size,
          developer: data.developer,
          publisher: data.publisher,
          releaseDate: app?.additionalInfo?.releaseDate || new Date().toISOString(),
          supportedLanguages: app?.additionalInfo?.supportedLanguages || ['English'],
        }
      };

      if (isEditMode && app.id) {
        await updateApp(app.id, appData);
        toast.success('Application updated successfully!');
      } else {
        await createApp(appData);
        toast.success('Application created successfully!');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(isEditMode ? 'Failed to update application' : 'Failed to create application');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-2xl font-bold text-white">
            {isEditMode ? 'Edit Application' : 'Create New Application'}
          </SheetTitle>
          <SheetDescription className="text-zinc-400">
            {isEditMode ? `Editing details for ${app?.name}` : 'Fill in the details to create a new app entry'}
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-200">App Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., QuantumLeap" 
                          {...field}
                          className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-200">Short Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief, catchy description"
                          {...field}
                          className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-200">Full Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed description of the application"
                          {...field}
                          className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                          rows={5}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Visuals & Metadata */}
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Visuals & Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-200">Icon URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/icon.png"
                            {...field}
                            className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="headerImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-200">Header Image URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/header.jpg"
                            {...field}
                            className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-200">Category</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Productivity"
                            {...field}
                            className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="version"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-200">Version</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 1.2.0"
                            {...field}
                            className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-200">Size</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 150 MB"
                            {...field}
                            className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Developer & Publisher */}
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Developer & Publisher</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="developer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-200">Developer</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Devs Inc."
                            {...field}
                            className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="publisher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-200">Publisher</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Publishers Co."
                            {...field}
                            className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tech Stack */}
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white text-lg">Tech Stack</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendTech('')}
                    className="bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Technology
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {techFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`techStack.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="e.g., React, Node.js, MongoDB"
                              {...field}
                              className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTech(index)}
                      className="bg-red-600 border-red-600 text-white hover:bg-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {techFields.length === 0 && (
                  <p className="text-zinc-400 text-sm">No technologies added yet</p>
                )}
              </CardContent>
            </Card>

            {/* Developers Team */}
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white text-lg">Developers Team</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendDeveloper({ name: '', role: '', avatar: '', bio: '' })}
                    className="bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Developer
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {developerFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-zinc-600 rounded-lg space-y-3 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`developers.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-200">Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                                                                placeholder="Developer name"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`developers.${index}.role`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-200">Role</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                                placeholder="e.g., Frontend Developer"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name={`developers.${index}.avatar`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-200">Avatar URL</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                              placeholder="https://example.com/avatar.jpg"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`developers.${index}.bio`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-200">Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                              placeholder="Brief bio about the developer"
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-red-600 border-red-600 text-white hover:bg-red-700"
                      onClick={() => removeDeveloper(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {developerFields.length === 0 && (
                  <p className="text-zinc-400 text-sm">No developers added yet</p>
                )}
              </CardContent>
            </Card>

            {/* Store Links */}
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white text-lg">Store Links</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendStoreLink({ platform: 'web', url: '' })}
                    className="bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Store Link
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {storeLinkFields.map((field, index) => (
                  <div key={field.id} className="flex items-end gap-2">
                    <FormField
                      control={form.control}
                      name={`storeLinks.${index}.platform`}
                      render={({ field }) => (
                        <FormItem className="flex-none w-32">
                          <FormLabel className="text-zinc-200">Platform</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="web">Web</option>
                              <option value="windows">Windows</option>
                              <option value="android">Android</option>
                              <option value="ios">iOS</option>
                              <option value="linux">Linux</option>
                              <option value="macos">macOS</option>
                              <option value="server">Server</option>
                            </select>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`storeLinks.${index}.url`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-zinc-200">URL</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                              placeholder="https://example.com/download"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeStoreLink(index)}
                      className="bg-red-600 border-red-600 text-white hover:bg-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {storeLinkFields.length === 0 && (
                  <p className="text-zinc-400 text-sm">No store links added yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
        
        <Separator className="bg-zinc-700 my-4" />
        
        <SheetFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
            className="bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditMode ? 'Update App' : 'Create App'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
};

// Enhanced Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-600 text-white';
      case 'inactive':
        return 'bg-red-600 text-white';
      case 'pending':
        return 'bg-yellow-600 text-white';
      default:
        return 'bg-zinc-600 text-white';
    }
  };

  return (
    <Badge className={`${getStatusColor(status)} border-none`}>
      {status}
    </Badge>
  );
};

// Enhanced Main App Dashboard Component
export default function AppDashboard() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { apps, loading, error, refetch } = useApps();
  const { deleteApp, loading: isDeleting } = useDeleteApp();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Partial<AppDetails> | null>(null);

  const handleCreate = () => {
    setSelectedApp(null);
    setIsFormOpen(true);
  };

  const handleEdit = (app: Partial<AppDetails>) => {
    setSelectedApp(app);
    setIsFormOpen(true);
  };

  const handleDelete = (app: Partial<AppDetails>) => {
    setSelectedApp(app);
    setIsAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedApp?.id) {
      try {
        await deleteApp(selectedApp.id);
        toast.success('Application deleted successfully!');
        refetch();
      } catch (error) {
        toast.error('Failed to delete application');
      }
    }
    setIsAlertOpen(false);
    setSelectedApp(null);
  };

  const columns: ColumnDef<Partial<AppDetails>>[] = useMemo(() => [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-white hover:bg-zinc-800 p-0"
          >
            Application
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={row.original.icon}
              alt={row.original.name ?? 'App icon'}
              className="h-12 w-12 rounded-lg object-cover border border-zinc-600"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-icon.png';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-white text-base">{row.original.name}</span>
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
            className="text-white hover:bg-zinc-800 p-0"
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
        <span className="text-zinc-300 text-sm">{row.original.additionalInfo?.size}</span>
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
              className="bg-blue-600 text-white text-xs"
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
            className="text-white hover:bg-zinc-800 p-0"
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
            {date ? new Date(date).toLocaleDateString() : 'N/A'}
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
              <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800">
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
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="bg-black min-h-screen text-white">
      <Toaster richColors theme="dark" position="top-right" />
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              App Dashboard
            </h1>
            <p className="text-zinc-400 mt-2 text-lg">
              Manage all your application entries in one place
            </p>
          </div>
          <Button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 h-auto"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Create App
          </Button>
        </header>

        <Card className="bg-zinc-900 border-zinc-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">
              Applications
            </CardTitle>
            <CardDescription className="text-zinc-400">
              {apps?.length || 0} applications in your system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
                  <p className="text-zinc-400">Loading applications...</p>
                </div>
              </div>
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
            ) : (
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
                          className="border-zinc-700 hover:bg-zinc-800/50 transition-colors"
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
                          No applications found. Create your first app to get started.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Sheet for Create/Edit Form */}
      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent className="bg-zinc-900 border-l border-zinc-700 text-white w-full sm:max-w-2xl overflow-hidden">
          <AppForm
            key={selectedApp?.id || 'new'}
            app={selectedApp}
            onClose={() => setIsFormOpen(false)}
            onSuccess={refetch}
          />
        </SheetContent>
      </Sheet>

      {/* Enhanced Alert Dialog for Delete Confirmation */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-white">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              This action cannot be undone. This will permanently delete{' '}
              <span className="font-semibold text-white">
                "{selectedApp?.name}"
              </span>{' '}
              and remove all its data from the system.
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
              Delete Application
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}