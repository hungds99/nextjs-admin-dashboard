'use client';

import { DataTableColumnHeader } from '@/components/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Company } from '@/schema';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Company>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'origin_logo_url',
    header: ({ column }) => <DataTableColumnHeader column={column} title='' />,
    cell: ({ row }) => {
      return (
        <div className='space-x-2'>
          <Avatar className='rounded-sm'>
            <AvatarImage src={row.getValue('origin_logo_url')} />
            <AvatarFallback className='rounded-sm'>CN</AvatarFallback>
          </Avatar>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'email_domain',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email Domain' />,
    cell: ({ row }) => {
      return <div>{row.getValue('email_domain')}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Phone' />,
    cell: ({ row }) => {
      return <span>{row.getValue('phone')}</span>;
    },
  },
  {
    accessorKey: 'website',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Website' />,
    cell: ({ row }) => {
      return <span>{row.getValue('website')}</span>;
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Address' />,
    cell: ({ row }) => {
      return <span>{row.getValue('address')}</span>;
    },
  },
  {
    accessorKey: 'country',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Country' />,
    cell: ({ row }) => {
      return <span>{row.getValue('country')}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
