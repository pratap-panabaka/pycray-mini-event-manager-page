'use client';

import { TrashIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface FormData {
  name: string;
  date: string;
  uuid: string;
}

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

const PyCray = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    date: formatDate(new Date()),
    uuid: '',
  });
  const [entries, setEntries] = useState<FormData[]>([]);
  const [filterText, setFilterText] = useState('');

  const today = new Date();
  const minDate = formatDate(today);

  const maxDateObj = new Date();
  maxDateObj.setDate(today.getDate() + 90);
  const maxDate = formatDate(maxDateObj);

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const uuid = e.currentTarget.id;
    const filter = entries.filter((o) => o.uuid !== uuid);
    setEntries(filter);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      uuid: uuidv4(),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEntries((prev) => [...prev, formData]);
    setFormData({ name: '', date: '', uuid: '' });
  };

  useEffect(() => {
    const stored = localStorage.getItem('events');
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch (_err) { }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(entries));
  }, [entries]);

  return (
    <div className="mx-auto pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24 2xl:pt-28 max-w-4xl min-h-screen space-y-6 rounded p-4 w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        Mini Event Manager
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-blue-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            autoComplete="off"
            required
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            min={minDate}
            max={maxDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-blue-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Add Event
        </button>
      </form>

      {entries.length > 0 && (
        <div className="overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-1 md:mb-0">
              Events
            </h2>
            <input
              type="text"
              placeholder="Search by Event Name..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="mt-1 block rounded-md border border-blue-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <table className="mt-4 min-w-full divide-y divide-blue-200 border border-blue-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  S.No
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Event Name
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Date
                </th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {entries
                .filter((entry) =>
                  entry.name.toLowerCase().includes(filterText.toLowerCase())
                )
                .map((entry, index) => (
                  <tr key={entry.uuid} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {entry.name}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {entry.date}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      <button id={entry.uuid} onDoubleClick={onDelete}>
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PyCray;
