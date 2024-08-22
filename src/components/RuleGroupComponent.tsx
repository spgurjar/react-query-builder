import React, { useState } from 'react';
import { Rule, RuleGroup } from '../types';
import RuleComponent from './RuleComponent';
import { MdDelete } from "react-icons/md";

interface RuleGroupComponentProps {
  group: RuleGroup;
  onChange: (updatedGroup: RuleGroup) => void;
  onDelete: () => void; // Handler to delete this group
  isNested?: boolean;
}

const RuleGroupComponent: React.FC<RuleGroupComponentProps> = ({ group, onChange, onDelete, isNested = false }) => {
  const [localGroup, setLocalGroup] = useState(group);

  const toggleConjunction = () => {
    const newConjunction: 'AND' | 'OR' = localGroup.conjunction === 'AND' ? 'OR' : 'AND';
    const updatedGroup = { ...localGroup, conjunction: newConjunction };
    setLocalGroup(updatedGroup);
    onChange(updatedGroup);
  };

  const addRuleToGroup = () => {
    const newRule: Rule = { type: 'rule' };
    const updatedGroup = { ...localGroup, children: [...localGroup.children, newRule] };
    setLocalGroup(updatedGroup);
    onChange(updatedGroup);
  };

  const addGroupToGroup = () => {
    const newGroup: RuleGroup = { type: 'rule_group', children: [], conjunction: 'AND', not: false };
    const updatedGroup = { ...localGroup, children: [...localGroup.children, newGroup] };
    setLocalGroup(updatedGroup);
    onChange(updatedGroup);
  };

  const deleteChild = (index: number) => {
    const updatedChildren = [...localGroup.children];
    updatedChildren.splice(index, 1);
    const updatedGroup = { ...localGroup, children: updatedChildren };
    setLocalGroup(updatedGroup);
    onChange(updatedGroup);
  };

  const setConjunction = (conj: 'AND' | 'OR') => {
    const updatedGroup = { ...localGroup, conjunction: conj };
    setLocalGroup(updatedGroup);
    onChange(updatedGroup);
  };

  return (
    <div className=" p-2 m-2 rounded bg-neutral-800 w-full">
      <div className="flex justify-start items-center">
      <div>
        <button
          onClick={() => setConjunction('AND')}
          style={{  backgroundColor: localGroup.conjunction === 'AND' ? 'rgb(34 197 94)' : 'lightgray', color: 'white', padding: '10px 10px', borderRadius: '5px 0 0 5px' }}
        >
          AND
        </button>
        <button
          onClick={() => setConjunction('OR')}
          style={{ backgroundColor: localGroup.conjunction === 'OR' ? 'rgb(34 197 94)' : 'lightgray', color: 'white', padding: '10px 10px', borderRadius: '0 5px 5px 0' }}
        >
          OR
        </button>
      </div>
        <div>
          <button onClick={() => addRuleToGroup()} className="mx-2 bg-violet-600 text-white px-2 py-2.5 rounded">+ Rule</button>
          <button onClick={() => addGroupToGroup()} className=" bg-violet-600 text-white px-2 py-2.5 rounded">+ Group</button>
          {isNested && <button onClick={onDelete} className=" ml-4 bg-neutral-600 text-neutral-300 p-2 rounded"><MdDelete/></button>}
        </div>
      </div>
      {localGroup.children.map((child, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          {child.type === 'rule' ? (
            <RuleComponent
              rule={child as Rule}
              onChange={(updatedRule) => updateChildRule(index, updatedRule)}
              onDelete={() => deleteChild(index)}
            />
          ) : (
            <RuleGroupComponent
              group={child as RuleGroup}
              onChange={(updatedGroup) => updateChildGroup(index, updatedGroup)}
              onDelete={() => deleteChild(index)}
              isNested={true}
            />
          )}
        </div>
      ))}
    </div>
  );

  function updateChildRule(index: number, updatedRule: Rule) {
    const updatedChildren = [...localGroup.children];
    updatedChildren[index] = updatedRule;
    const updatedGroup = { ...localGroup, children: updatedChildren };
    setLocalGroup(updatedGroup);
    onChange(updatedGroup);
  }

  function updateChildGroup(index: number, updatedGroup: RuleGroup) {
    const updatedChildren = [...localGroup.children];
    updatedChildren[index] = updatedGroup;
    const newGroup = { ...localGroup, children: updatedChildren };
    setLocalGroup(newGroup);
    onChange(newGroup);
  }
};

export default RuleGroupComponent;
