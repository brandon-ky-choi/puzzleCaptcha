import { useContext } from "react";
import { PuzzleCaptchaContext } from "../const";

function Input() {
  const {
    data: { inputName, isSolved, token },
  } = useContext(PuzzleCaptchaContext);
  return (
    <input
      type="hidden"
      name={inputName || "captcha"}
      value={isSolved ? token || "verified" : ""}
    />
  );
}

export default Input;
