import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";

const Input = (props) => {
  const {
    placeholder,
    id,
    name,
    statushandler,
    submitHandler,
    maxLength,
    minLength,
    ...others
  } = props;
  const [inputValue, setValue] = useState("");
  const [updatedData, setData] = useState({});
  const [validationError, setError] = useState(false);
  const [keyValidation, setValdation] = useState(false);
  const reg = /^\d(\d{1,2})\.(\d{2,3})\.(\d{2,3})\.(\d{2,3})/g;
  const onPaste = useRef(null);

  useEffect(() => {
    window.addEventListener("paste", () => {
      onPaste.current = true;
    });
    return () => {
      window.addEventListener("paste", () => {
        onPaste.current = false;
      });
    };
  }, []);

  const validation = () => {
    if (keyValidation || onPaste.current) {
      return true;
    }
    return false;
  };

  const keyPressHandler = useCallback((e) => {
    if ((e.key >= 0 && e.key <= 9) || e.key === "." || e.key === "Backspace") {
      setValdation(true);
    } else {
      setValdation(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", (e) => keyPressHandler(e));
    return () => {
      window.removeEventListener("keydown", (e) => keyPressHandler(e));
    };
  }, [keyPressHandler]);

  const changeHandler = (e) => {
    let { value } = e.target;
    let { type } = e;
    if (validation()) {
      setValue(value);
    }
    if (
      (type === "blur" || type === "focus") &&
      (!reg.test(value) || inputValue < minLength || inputValue === "")
    ) {
      setError(true);
    } else {
      setError(false);
    }
    setData((prev) => {
      return {
        ...prev,
        value: inputValue,
        eventType: type,
        error: validationError,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (validationError || inputValue.length === 0) {
      return;
    }
    submitHandler(e, updatedData);
    setError(false);
    setValue("");
  };

  return (
    <>
      <form className={styles.input__container} onSubmit={onSubmitHandler}>
        <input
          value={inputValue}
          type={"text"}
          className={styles.input}
          placeholder={placeholder}
          onChange={changeHandler}
          onFocus={changeHandler}
          onBlur={changeHandler}
          id={id}
          name={name}
          {...others}
          maxLength={maxLength}
          minLength={minLength}
        />
        <button type="submit" className={styles.input__button}>
          {">"}
        </button>
      </form>

      <span
        style={{
          color: "white",
          fontSize: "1.4rem",
          fontWeight: "500",
          padding: "0.5rem 0 0 0.5rem",
        }}
      >
        {validationError && "Please enter a valid IP"}
      </span>
    </>
  );
};

export default Input;
