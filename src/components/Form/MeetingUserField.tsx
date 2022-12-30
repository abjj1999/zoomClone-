import { EuiComboBox, EuiFormRow } from "@elastic/eui";
import React from "react";

const MeetingUserField = ({
  label,
  options,
  onchange,
  selectedOptions,
  isClearable,
  placeholder,
  singleSelection,
  isInvalid,
  error,
}: {
  label: string;
  options: any;
  onchange: any;
  selectedOptions: any;
  isClearable: boolean;
  placeholder: string;
  singleSelection: any;
  isInvalid: boolean;
  error: Array<string>
}) => {
  return (
    <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
      <EuiComboBox
        options={options}
        onChange={onchange}
        selectedOptions={selectedOptions}
        singleSelection={singleSelection}
        placeholder={placeholder}
        isClearable={isClearable}
        isInvalid={isInvalid} 
      />
    </EuiFormRow>
  );
};

export default MeetingUserField;
