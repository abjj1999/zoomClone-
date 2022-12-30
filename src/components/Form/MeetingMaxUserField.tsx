import { EuiFieldNumber, EuiFormRow } from '@elastic/eui'
import React from 'react'

const MeetingMaxUserField = ({value, setValue}: {value:number, setValue: React.Dispatch<React.SetStateAction<number>>}) => {
  return (
    <EuiFormRow label="Max people" >
        <EuiFieldNumber placeholder='Max people' min={1} max={50} value={value} onChange={e => {
            if(!e.target.value.length || +e.target.value === 0) return setValue(1)
            else if(+e.target.value > 50) return setValue(50)
            else return setValue(+e.target.value)
        }} />
    </EuiFormRow>
  )
}

export default MeetingMaxUserField
