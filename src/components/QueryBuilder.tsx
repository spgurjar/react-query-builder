import React, { useState } from 'react';
import { Rule, RuleGroup } from '../types';
import RuleComponent from './RuleComponent';
import RuleGroupComponent from './RuleGroupComponent';
import { ruleToString } from '../utils/ruleParser';

const QueryBuilder = () => {
  const [rules, setRules] = useState<(Rule | RuleGroup)[]>([]);
  const [conjunction, setConjunction] = useState<'AND' | 'OR'>('AND');
  const [outputFormat, setOutputFormat] = useState<'string' | 'object'>('string');

  const addRule = () => {
    const newRule: Rule = { type: 'rule' };
    setRules([...rules, newRule]);
  };

  const addRuleGroup = () => {
    const newRuleGroup: RuleGroup = { type: 'rule_group', children: [], conjunction: conjunction, not: false };
    setRules([...rules, newRuleGroup]);
  };

  const updateRule = (index: number, newRule: Rule | RuleGroup) => {
    const newRules = [...rules];
    newRules[index] = newRule;
    setRules(newRules);
  };

  const deleteRule = (index: number) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  const toggleConjunction = (conj: 'AND' | 'OR') => {
    setConjunction(conj);
  };

  return (
    <div className="p-8 m-12 bg-neutral-800">
      <div className="flex space-x-4 mb-4">
      <div>
        <button
          onClick={() => toggleConjunction('AND')}
          style={{
            backgroundColor: conjunction === 'AND' ? 'rgb(34 197 94)' : 'lightgray',
            color: 'white',
            padding: '10px 10px',
            borderRadius: '5px 0 0 5px'
          }}
        >
          AND
        </button>
        <button
          onClick={() => toggleConjunction('OR')}
          style={{
            backgroundColor: conjunction === 'OR' ? 'rgb(34 197 94)' : 'lightgray',
            color: 'white',
            padding: '10px 10px',
            borderRadius: '0 5px 5px 0'
          }}
        >
          OR
        </button>
      </div>
        <button onClick={addRule} className="bg-violet-600 text-white px-2 py-1 rounded">Add Rule</button>
        <button onClick={addRuleGroup} className="bg-violet-600 text-white p-2 rounded">Add Rule Group</button>
        <select onChange={(e) => setOutputFormat(e.target.value as 'string' | 'object')}
                className="p-2 border rounded">
          <option value="string">String Format</option>
          <option value="object">Object Format</option>
        </select>
      </div>
      {rules.map((rule, index) => (
        <div key={index} className="flex justify-between items-center">
          {rule.type === 'rule' ? 
            <RuleComponent rule={rule as Rule} onChange={(updatedRule) => updateRule(index, updatedRule)} onDelete={() => deleteRule(index)}/> :
            <RuleGroupComponent group={rule as RuleGroup} onChange={(updatedGroup) => updateRule(index, updatedGroup)} onDelete={() => deleteRule(index)}  isNested={true}/>
          }
        </div>
      ))}
      <div className="mt-4">
        <h2 className="text-lg font-bold text-slate-100">Output:</h2>
        {outputFormat === 'string' ? (
          <p className=" p-2 text-slate-100 bg-gray-700" >{ruleToString(rules, conjunction)}</p>
        ) : (
          <pre className="text-slate-100 bg-gray-700 p-2 rounded">{JSON.stringify(rules, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default QueryBuilder;
