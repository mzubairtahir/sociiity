import style from "./style/AuthBase.module.css";

const inputValidation = ({ selector }) => {
  const allInputs = document.querySelectorAll(selector);
  let anyWrong = false;

  for (const i of allInputs) {
    if (i.value === "") {
      i.classList.add(`${style.shake}`);
      setTimeout(() => {
        i.classList.remove(`${style.shake}`);
      }, 1000);
      anyWrong = true;
    }
  }
  if (!anyWrong) {
    return true;
  } else {
    return false;
  }
};

export { inputValidation };
