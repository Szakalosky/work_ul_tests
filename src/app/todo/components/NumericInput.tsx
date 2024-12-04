import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";

const NumericInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [declaredValue, setDeclaredValue] = useState<string | null>(null);
  const [numberValue, setNumberValue] = useState<number>(0);
  const numericValue = 0.0;

  const changeToNumeric = (text: string) => {
    const result = parseFloat(text) / 2;
    setDeclaredValue(result.toFixed(3));
  };

  useEffect(() => {
    changeToNumeric(inputValue);
  }, [inputValue]);
  return (
    <div className="flex flex-col mt-6 mb-6">
      <Input
        type="number"
        variant="bordered"
        color="secondary"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
          changeToNumeric(e.target.value);
          setNumberValue(parseFloat(e.target.value));
        }}
      />
      <p>{typeof inputValue}</p>
      <p>{declaredValue}</p>
      <p>{numberValue / 3}</p>
    </div>
  );
};

export default NumericInput;
