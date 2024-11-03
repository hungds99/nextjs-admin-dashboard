'use client';

import { DataTableColumnHeader } from '@/components/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { User } from '@/schema/user';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<User>[] = [
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
    accessorKey: 'avatar',
    header: ({ column }) => <DataTableColumnHeader column={column} title='' />,
    cell: ({ row }) => {
      return (
        <div className='space-x-2'>
          <Avatar className='rounded-sm'>
            <AvatarImage src={row.getValue('avatar')} />
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
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => {
      return <div>{row.getValue('email')}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'position',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Position' />,
    cell: ({ row }) => {
      return <span>{row.getValue('position')}</span>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'website',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Website' />,
    cell: ({ row }) => {
      return <span>{row.getValue('website')}</span>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Phone' />,
    cell: ({ row }) => {
      return <span>{row.getValue('phone')}</span>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'address',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Address' />,
    cell: ({ row }) => {
      return <span>{row.getValue('address')}</span>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
