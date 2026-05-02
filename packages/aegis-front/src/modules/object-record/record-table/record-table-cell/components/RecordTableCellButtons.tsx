import { styled } from '@linaria/react';
import { type IconComponent } from 'aegis-ui/display';
import { LightIconButtonGroup } from 'aegis-ui/input';
import { MOBILE_VIEWPORT, themeCssVariables } from 'aegis-ui/theme-constants';
import { AnimatedContainer } from 'aegis-ui/utilities';

const StyledButtonContainer = styled.div`
  border: 1px solid ${themeCssVariables.border.color.strong};
  @media (max-width: ${MOBILE_VIEWPORT}px) {
    position: relative;
    right: 7px;
  }
  border-radius: ${themeCssVariables.border.radius.sm};
  margin: ${themeCssVariables.spacing[1]};
`;

type RecordTableCellButtonsProps = {
  onClick?: () => void;
  Icon: IconComponent;
}[];

export const RecordTableCellButtons = ({
  buttons,
}: {
  buttons: RecordTableCellButtonsProps;
}) => {
  return (
    <AnimatedContainer>
      <StyledButtonContainer>
        <LightIconButtonGroup size="small" iconButtons={buttons} />
      </StyledButtonContainer>
    </AnimatedContainer>
  );
};
