import React from 'react';
import { mapModifiers, ModifierProp } from '../../component.ts';


export interface TextProps {
  children?: React.ReactNode;
  modifiers?: ModifierProp<'small' | 'small-purple' | 'small-blue' | 'purple' | 'blue'>;
  align?: ModifierProp<'left' | 'center' | 'right'>;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  modifiers,
  align = 'left',
  className: additionalClassName = '',
}) => {
  const componentClassName = mapModifiers('a-text', modifiers, `align-${align}`);
  const className = `${componentClassName} ${additionalClassName}`.trim();
  return <p className={className}>{children}</p>;
};
