import { useState } from "react";
import styled from "styled-components";

import PuzzleCaptcha from "./components/PuzzleCaptcha";

const Form = styled.form`
  max-width: 800px;
  display: block;
  margin-bottom: 2rem;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input {
    width: 100%;
    box-sizing: border-box;
  }
  hr {
    display: block;
    margin: 1rem 0;
  }
  button {
    font-size: 1.25rem;
  }
`;

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

  return (
    <>
      <h4>Props:</h4>
      <Form>
        <label>
          <strong>image:</strong>
          <input
            type="url"
            name="image"
            value={formValues.image}
            onChange={(e) =>
              setFormValues({ ...formValues, image: e.target.value })
            }
          />
        </label>
        <label>
          <strong>cols:</strong>
          <input
            type="number"
            name="cols"
            value={formValues.cols}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                cols: parseNum(e.target.value ?? 0),
              })
            }
          />
        </label>
        <label>
          <strong>rows:</strong>
          <input
            type="number"
            name="rows"
            value={formValues.rows}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                rows: parseNum(e.target.value ?? 0),
              })
            }
          />
        </label>
        <label>
          <strong>width:</strong>
          <input
            type="number"
            name="width"
            value={formValues.width}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                width: parseNum(e.target.value ?? 0),
              })
            }
          />
        </label>
        <hr />
        <button type="button" onClick={handleClick}>
          Update Puzzle Cpatcha
        </button>
      </Form>

      <hgroup>
        <h3>Are you human?</h3>
        <h4>Please select the same puzzle piece.</h4>
      </hgroup>
      <PuzzleCaptcha
        image={propValues.image}
        cols={propValues.cols}
        rows={propValues.rows}
        width={propValues.width}
        onVerify={handleVerify}
        // className={"some-class"}
        // inputName="thisCaptcha"
        // inputValue="human"
        token="sadfkjugksugjg7867245h"
        key={`PuzzleCaptcha-${keyValue}`}
      />
    </>
  );
}

export default App;
