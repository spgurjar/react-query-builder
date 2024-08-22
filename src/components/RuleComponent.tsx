import React, { useState } from 'react';
import { Rule } from '../types';
import { MdDelete } from "react-icons/md";

interface RuleComponentProps {
  rule: Rule;
  onChange: (rule: Rule) => void;  // Callback to update rule in parent state
  onDelete: () => void;
}

const RuleComponent: React.FC<RuleComponentProps> = ({ rule, onChange, onDelete }) => {
    const [field, setField] = useState(rule.field);
    const [condition, setCondition] = useState(rule.condition);
    const [value, setValue] = useState<string[]>(rule.value || []);

    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setField(e.target.value as any);
        onChange({...rule, field: e.target.value as any});
    };

    const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCondition(e.target.value as any);
        onChange({...rule, condition: e.target.value as any});
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const values = e.target.value.split(',').map(v => v.trim());
        setValue(values);
        onChange({...rule, value: values});
    };

    return (
        <div className="flex items-center justify-between border border-slate-400-600 p-2 my-2 rounded w-full">
            <div className="flex items-center justify-between w-2/3">
                <div>
                    <div className='ml-1 mb-2 text-slate-100'><label htmlFor="field-select">Field</label></div>
                    <select className='bg-neutral-600 text-slate-100' id="field-select" value={field} onChange={handleFieldChange}>
                        <option value="Theme">Theme</option>
                        <option value="Sub-theme">Sub-theme</option>
                        <option value="Reason">Reason</option>
                        <option value="Language">Language</option>
                        <option value="Source">Source</option>
                        <option value="Rating">Rating</option>
                        <option value="Time Period">Time Period</option>
                        <option value="Customer ID">Customer ID</option>
                    </select>
                </div>
                <div>
                    <div className='ml-1 mb-2 text-slate-100'><label htmlFor="condition-select">Condition</label></div>
                    <select className='bg-neutral-600 text-slate-100' id="condition-select" value={condition} onChange={handleConditionChange}>
                        <option value="Equals">Equals</option>
                        <option value="Does not equal">Does not equal</option>
                        <option value="Like">Like</option>
                        <option value="Not like">Not like</option>
                        <option value="Is Empty">Is Empty</option>
                        <option value="Is">Is</option>
                        <option value="Is not">Is not</option>
                    </select>
                </div>
                <div>
                    <div className='ml-1 mb-2 text-slate-100'><label htmlFor="value-input">Value</label></div>
                    <input className='bg-neutral-600 text-slate-100' id="value-input" type="text" value={value.join(", ")} onChange={handleValueChange} />
                </div>
            </div>
            <div><button onClick={onDelete} className="ml-4 bg-neutral-600 text-neutral-300 p-2 rounded"><MdDelete/></button></div>
        </div>
    );
};

export default RuleComponent;
