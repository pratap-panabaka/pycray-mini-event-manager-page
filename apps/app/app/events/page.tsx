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
      } catch (_err) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(entries));
  }, [entries]);

  return (
    <div className="mx-auto mt-6 max-w-2xl space-y-6 rounded bg-orange-80 p-4 shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block font-medium text-gray-700 text-sm"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            autoComplete="off"
            required
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block font-medium text-gray-700 text-sm"
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
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
          <h2 className="mb-2 font-semibold text-gray-800 text-lg">Events</h2>
          <input
            type="text"
            placeholder="Search by Event Name..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-200"
          />
          <table className="mt-4 min-w-full divide-y divide-gray-200 border border-blue-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700 text-sm">
                  S.No
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700 text-sm">
                  Event Name
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700 text-sm">
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
                    <td className="px-4 py-2 text-gray-700 text-sm">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-sm">
                      {entry.name}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-sm">
                      {entry.date}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-sm">
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
