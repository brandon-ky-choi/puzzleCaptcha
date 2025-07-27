import { useState } from "react";
import PuzzleCaptcha from "./PuzzleCaptcha";
import "./App.css";

function App() {
  const [keyValue, setKeyValue] = useState(0);

  const defaultValues = {
    image:
      "https://images.pexels.com/photos/209037/pexels-photo-209037.jpeg?auto=compress&cs=tinysrgb&w=400",
    cols: 3,
    rows: 3,
    width: 600,
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const [propValues, setPropValues] = useState(defaultValues);

  const handleVerify = () => {
    console.log("human!");
  };

  const parseNum = (val: string) => {
    return parseInt(val, 10);
  };

  const handleClick = () => {
    setPropValues(formValues);
    setKeyValue(keyValue + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target || {};
    const valueParsed =
      name === "image" ? (value ?? "") : parseNum(value ?? "0");
    name && setFormValues({ ...formValues, [name]: valueParsed });
  };

  return (
    <div className="m-4">
      <div className="mx-auto max-w-md text-white md:max-w-2xl">
        <h2 className="my-4 text-3xl font-bold">PuzzleCaptcha Demo</h2>
        <h4 className="my-4 text-xl font-semibold">Props:</h4>
        <form className="mb-8">
          <label className="mb-4 block">
            <span className="font-medium">Image URL:</span>
            <input
              className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 bg-white px-2 py-1 text-gray-900 shadow-sm transition focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="url"
              name="image"
              value={formValues.image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </label>
          <label className="mb-4 block">
            <span className="font-medium">Columns:</span>
            <input
              className="focus:ring-opacity-50 mt-1 block w-full max-w-80 rounded-md border-gray-300 bg-white px-2 py-1 text-gray-900 shadow-sm transition focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="number"
              name="cols"
              value={formValues.cols}
              onChange={handleChange}
              min={1}
              max={10}
            />
          </label>
          <label className="mb-4 block">
            <span className="font-medium">Rows:</span>
            <input
              className="focus:ring-opacity-50 mt-1 block w-full max-w-80 rounded-md border-gray-300 bg-white px-2 py-1 text-gray-900 shadow-sm transition focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="number"
              name="rows"
              value={formValues.rows}
              onChange={handleChange}
              min={1}
              max={10}
            />
          </label>
          <label className="mb-4 block">
            <span className="font-medium">Width (px):</span>
            <input
              className="focus:ring-opacity-50 mt-1 block w-full max-w-80 rounded-md border-gray-300 bg-white px-2 py-1 text-gray-900 shadow-sm transition focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="number"
              name="width"
              value={formValues.width}
              onChange={handleChange}
              min={100}
              max={1200}
            />
          </label>
          <hr className="my-4" />
          <button
            type="button"
            onClick={handleClick}
            className="w-full rounded-md bg-gray-800 px-4 py-2 font-semibold text-white shadow transition hover:bg-gray-800"
          >
            Update Puzzle Captcha
          </button>
        </form>

        <hgroup>
          <h3 className="mb-1 text-lg font-bold">Are you human?</h3>
          <h4 className="mb-4">Please select the same puzzle piece.</h4>
        </hgroup>
        <PuzzleCaptcha
          image={propValues.image}
          cols={propValues.cols}
          rows={propValues.rows}
          width={propValues.width}
          onVerify={handleVerify}
          token="sadfkjugksugjg7867245h"
          key={`PuzzleCaptcha-${keyValue}`}
        />
      </div>
    </div>
  );
}

export default App;
