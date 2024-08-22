import { Rule, RuleGroup } from '../types';

// Helper to get the operator symbol for the given condition
const getOperator = (condition: string): string => {
  switch (condition) {
    case 'Equals':
      return '==';
    case 'Does not equal':
      return '!=';
    case 'Like':
      return 'LIKE';
    case 'Not like':
      return 'NOT LIKE';
    case 'Is Empty':
      return 'IS EMPTY';
    case 'Is':
      return 'IS';
    case 'Is not':
      return 'IS NOT';
    default:
      return condition;
  }
};

// Helper to format a single rule into a query string
const formatRule = (rule: Rule): string => {
  if (!rule.field || !rule.condition || !rule.value) return '';
  const operator = getOperator(rule.condition);
  return `(field.${rule.field}) ${operator} "${rule.value.join(", ")}"`;
};

// Function to create a string from the rules array
export const ruleToString = (rules: (Rule | RuleGroup)[], conjunction: 'AND' | 'OR'): string => {
  const parts = rules.map(rule => {
    if (rule.type === 'rule') {
      return formatRule(rule);
    } else {
      return `(${ruleToString(rule.children, rule.conjunction)})`;
    }
  });

  const joined = parts.filter(part => part !== '').join(` ${conjunction} `);
  return `"${joined}"`;  // Encapsulate the entire output in quotes
};
