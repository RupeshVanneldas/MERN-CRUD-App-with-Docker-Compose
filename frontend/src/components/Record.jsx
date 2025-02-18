import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  // Define the initial form state
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });

  // Boolean state to check if it's a new record
  const [isNew, setIsNew] = useState(true);

  // Get parameters from URL (for editing an existing record)
  const params = useParams();
  const navigate = useNavigate();

  // Fetch record data if an ID is present (i.e., editing mode)
  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return; // If no ID, it's a new record
      setIsNew(false);

      // Fetch record details from the backend
      const response = await fetch(
        `http://localhost:5050/record/${params.id.toString()}`
      );

      if (!response.ok) {
        console.error(`An error has occurred: ${response.statusText}`);
        return;
      }

      // Parse JSON response and update form state
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/"); // Redirect to home if record not found
        return;
      }
      setForm(record);
    }

    fetchData();
  }, [params.id, navigate]); // Runs when params.id changes

  // Update form fields when the user types
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Handle form submission
  async function onSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior
    const person = { ...form };

    try {
      let response;
      if (isNew) {
        // Create a new record (POST request)
        response = await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        // Update existing record (PATCH request)
        response = await fetch(`http://localhost:5050/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding or updating a record: ", error);
    } finally {
      // Reset form and navigate back to home page
      setForm({ name: "", position: "", level: "" });
      navigate("/");
    }
  }

  // Render the form
  return (
    <>
      <h3 className="text-lg font-semibold p-4">
        {isNew ? "Create Employee Record" : "Update Employee Record"}
      </h3>

      {/* Form for adding or updating a record */}
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        {/* Form section for employee info */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Employee Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          {/* Input fields for employee details */}
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
            {/* Name input */}
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="First Last"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Position input */}
            <div className="sm:col-span-4">
              <label
                htmlFor="position"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Position
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="position"
                    id="position"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Developer Advocate"
                    value={form.position}
                    onChange={(e) => updateForm({ position: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Level selection (radio buttons) */}
            <div>
              <fieldset className="mt-4">
                <legend className="sr-only">Position Options</legend>
                <div className="flex items-center space-x-4 mt-2">
                  {["Intern", "Junior", "Senior"].map((level) => (
                    <label
                      key={level}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="level"
                        value={level}
                        checked={form.level === level}
                        onChange={(e) => updateForm({ level: e.target.value })}
                        className="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                      />
                      <span className="ml-2 text-sm font-medium text-slate-900">
                        {level}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <input
          type="submit"
          value="Save Employee Record"
          disabled={!form.name || !form.position || !form.level} // Disable if fields are empty
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}
