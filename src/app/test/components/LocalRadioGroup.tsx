import React from "react";
import { RadioGroup, Radio } from "@nextui-org/radio";

const LocalRadioGroup = () => {
  const footbalTeam = [
    { id: 0, team: "Real Madrid" },
    { id: 1, team: "Bayern" },
    { id: 2, team: "AC Milan" },
    { id: 3, team: "City" },
    { id: 4, team: "PSG" },
  ];
  return (
    <RadioGroup label="Select your favourite football team">
      {footbalTeam.map((value) => (
        <Radio key={value.id} value={value.team}>
          {value.team}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default LocalRadioGroup;
