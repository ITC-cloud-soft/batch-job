import React from 'react';
import { mapModifiers, ModifierProp } from '../../component.ts';
import { Icon, ICON_SHAPES } from '../icon';


export const NAV_ICON_SHAPES = ['news', 'request-list', 'approval-list', 'labor-menu', 'settings', 'avatar', 'id-menu'];

export type NavIconShape = typeof NAV_ICON_SHAPES[number];

export interface NavIconProps {
  icon?: NavIconShape;
  badge?: boolean;
  active?: boolean;
  size?: ModifierProp<'large'>;
  id?: string;
  className?: string;
}

export const NavIcon: React.FC<NavIconProps> = ({
  icon = 'news',
  badge = false,
  active = false,
  size,
  id,
  className: additionalClassName = '',
}) => {
  const componentClassName = mapModifiers('a-nav-icon', icon, badge && 'badge', active && 'active', size);
  const className = `${componentClassName} ${additionalClassName}`.trim();
  const iconName = `${icon.toString()}${active ? '-selected' : ''}` as typeof ICON_SHAPES[number];
  return (
    <div className={className} id={id}>
      <Icon name={iconName} />
      {badge && <i className="a-nav-icon__badge"></i>}
    </div>
  );
};
