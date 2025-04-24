import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees.employees);
  const [sorting, setSorting] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState('');

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor('firstName', { header: 'Prénom', enableSorting: true }),
      columnHelper.accessor('lastName', { header: 'Nom', enableSorting: true }),
      columnHelper.accessor('startDate', {
        header: 'Date de début',
        cell: ({ getValue }) => (getValue() ? new Date(getValue()).toLocaleDateString('fr-FR') : ''),
        enableSorting: true,
      }),
      columnHelper.accessor('department', { header: 'Département', enableSorting: true }),
      columnHelper.accessor('dateOfBirth', {
        header: 'Date de naissance',
        cell: ({ getValue }) => (getValue() ? new Date(getValue()).toLocaleDateString('fr-FR') : ''),
        enableSorting: true,
      }),
      columnHelper.accessor('street', { header: 'Rue' }),
      columnHelper.accessor('city', { header: 'Ville' }),
      columnHelper.accessor('state', { header: 'État' }),
      columnHelper.accessor('zipCode', { header: 'Code postal' }),
    ],
    [columnHelper]
  );

  const filteredEmployees = useMemo(() => {
    if (!filter) return employees;
    return employees.filter((employee) =>
      Object.values(employee).some((value) =>
        value?.toString().toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [employees, filter]);

  const table = useReactTable({
    data: filteredEmployees,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleSearch = () => {
    setFilter(searchInput);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-4xl text-center mb-8 text-gray-800">Employés actuels</h1>
      <div className="mb-4 flex items-center max-w-md">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Rechercher un employé..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
            aria-label="Rechercher"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <table className="min-w-full bg-off-white">
        <thead className="bg-deep-blue text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-4 text-left cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: ' ↑',
                    desc: ' ↓',
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={index % 2 === 0 ? 'bg-light-gray' : 'bg-white'}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4 border-b border-light-gray">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="text-blue-500 hover:text-blue-700 mt-6 block text-lg font-semibold">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default EmployeeList;