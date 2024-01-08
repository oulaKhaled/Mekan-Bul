import React from "react";
const InputWithLabel = ({
    id,
    label,
    value,
    type,
    onInputChange,
    isFocused,
    name,
    placeholder,
  }) => {
    const inputRef = React.useRef();
    React.useEffect(() => {
      if (isFocused && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isFocused]);
    return (
      <div>
        <label htmlFor={id}>{label}</label>&nbsp;
        <input
          id={id}
          type={type}
          value={value}
          onChange={onInputChange}
          ref={inputRef}
          name={name}
          placeholder={placeholder}
        />
      </div>
    );
  };
  export default InputWithLabel;