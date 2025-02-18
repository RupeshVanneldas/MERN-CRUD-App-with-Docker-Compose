/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Record Component - Represents a single row in the employee records table.
 * @param {Object} props - Contains record details and deleteRecord function.
 */
const Record = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle">{props.record.name}</td>
    <td className="p-4 align-middle">{props.record.position}</td>
    <td className="p-4 align-middle">{props.record.level}</td>
    <td className="p-4 align-middle">
      <div className="flex gap-2">
        {/* Edit Button - Navigates to the edit page */}
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background 
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.record._id}`}
        >
          Edit
        </Link>

        {/* Delete Button - Calls the delete function */}
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background 
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:pointer-events-none disabled:opacity-50 border border-input bg-background 
          hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          type="button"
          onClick={() => props.deleteRecord(props.record._id)}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

/**
 * RecordList Component - Displays a list of employee records in a table format.
 */
export default function RecordList() {
  // State to store the list of employee records
  const [records, setRecords] = useState([]);

  // Fetch records from the database when the component mounts
  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch("http://localhost:5050/record/");

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const records = await response.json();
        setRecords(records);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    }

    getRecords();
  }, [records.length]); // Refresh records when the length changes

  // Function to delete a record from the database
  async function deleteRecord(id) {
    try {
      await fetch(`http://localhost:5050/record/${id}`, {
        method: "DELETE",
      });

      // Remove the deleted record from the state
      setRecords(records.filter((record) => record._id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  }

  // Function to render the list of records
  function recordList() {
    return records.map((record) => (
      <Record
        record={record}
        deleteRecord={() => deleteRecord(record._id)}
        key={record._id}
      />
    ));
  }

  // Render the records table
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Employee Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            {/* Table Header */}
            <thead>
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Position
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Level
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>{recordList()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
