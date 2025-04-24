import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees.employees);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor('firstName', { header: 'Prénom' }),
      columnHelper.accessor('lastName', { header: 'Nom' }),
      columnHelper.accessor('startDate', {
        header: 'Date de début',
        cell: ({ getValue }) => (getValue() ? new Date(getValue()).toLocaleDateString('fr-FR') : ''),
      }),
      columnHelper.accessor('department', { header: 'Département' }),
      columnHelper.accessor('dateOfBirth', {
        header: 'Date de naissance',
        cell: ({ getValue }) => (getValue() ? new Date(getValue()).toLocaleDateString('fr-FR') : ''),
      }),
      columnHelper.accessor('street', { header: 'Rue' }),
      columnHelper.accessor('city', { header: 'Ville' }),
      columnHelper.accessor('state', { header: 'État' }),
      columnHelper.accessor('zipCode', { header: 'Code postal' }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Employés actuels</h1>
      <table className="min-w-full border-collapse border">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2 bg-gray-100">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="text-blue-500 hover:underline mt-4 block">
        Accueil
      </Link>
    </div>
  );
};

export default EmployeeList;