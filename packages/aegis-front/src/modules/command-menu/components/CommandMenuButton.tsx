import { getCommandMenuItemLabel } from '@/command-menu-item/utils/getCommandMenuItemLabel';
import { styled } from '@linaria/react';
import { type MessageDescriptor } from '@lingui/core';
import { type MouseEvent } from 'react';
import { type Nullable } from 'aegis-shared/types';
import { isDefined } from 'aegis-shared/utils';
import {
  AppTooltip,
  type IconComponent,
  TooltipDelay,
  TooltipPosition,
} from 'aegis-ui/display';
import { Button, IconButton } from 'aegis-ui/input';
import { themeCssVariables } from 'aegis-ui/theme-constants';

const StyledWrapper = styled.div`
  font-size: ${themeCssVariables.font.size.md};
`;

export type CommandMenuButtonProps = {
  command: {
    key: string;
    label: Nullable<string | MessageDescriptor>;
    shortLabel?: Nullable<string | MessageDescriptor>;
    Icon: IconComponent;
    isPrimaryCTA?: boolean;
  };
  onClick?: (event?: MouseEvent<HTMLElement>) => void;
  to?: string;
  disabled?: boolean;
};

export const CommandMenuButton = ({
  command,
  onClick,
  to,
  disabled = false,
}: CommandMenuButtonProps) => {
  const resolvedLabel = getCommandMenuItemLabel(command.label);

  const resolvedShortLabel = isDefined(command.shortLabel)
    ? getCommandMenuItemLabel(command.shortLabel)
    : undefined;

  const buttonAccent = command.isPrimaryCTA ? 'blue' : 'default';

  return (
    <>
      {resolvedShortLabel !== undefined ? (
        <Button
          Icon={command.Icon}
          size="small"
          variant="secondary"
          accent={buttonAccent}
          to={to}
          onClick={onClick}
          disabled={disabled}
          title={resolvedShortLabel}
          ariaLabel={resolvedLabel}
        />
      ) : (
        <div id={`command-menu-item-entry-${command.key}`} key={command.key}>
          <IconButton
            Icon={command.Icon}
            size="small"
            variant="secondary"
            accent={buttonAccent}
            to={to}
            onClick={onClick}
            disabled={disabled}
            ariaLabel={resolvedLabel}
          />
          <StyledWrapper>
            <AppTooltip
              anchorSelect={`#command-menu-item-entry-${command.key}`}
              content={resolvedLabel}
              delay={TooltipDelay.longDelay}
              place={TooltipPosition.Bottom}
              offset={5}
              noArrow
            />
          </StyledWrapper>
        </div>
      )}
    </>
  );
};
