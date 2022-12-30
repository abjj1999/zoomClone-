import { EuiFieldText, EuiFormRow } from "@elastic/eui";
import React from "react";
import ThemeSelector from "../ThemeSelector";

const MeetingNameField = ({
  label,
  placeholder,
  value,
  setMeetingName,
  isInvalid,
  error,
}: {
  label: string;
  placeholder: string;
  value: string;
  setMeetingName: React.Dispatch<React.SetStateAction<string>>;
  isInvalid: boolean;
  error: Array<string>
}) => {
  return (
    <ThemeSelector>
      <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
        <EuiFieldText
        isInvalid={isInvalid} 
          placeholder={placeholder}
          value={value}
          onChange={(e) => setMeetingName(e.target.value)}
        />
      </EuiFormRow>
    </ThemeSelector>
  );
};

export default MeetingNameField;
