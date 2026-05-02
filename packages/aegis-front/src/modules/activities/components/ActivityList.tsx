import { styled } from '@linaria/react';
import { Card } from 'aegis-ui/layout';
import { themeCssVariables } from 'aegis-ui/theme-constants';

const StyledListContainer = styled.div`
  width: 100%;

  > * {
    & > :not(:last-child) {
      border-bottom: 1px solid ${themeCssVariables.border.color.light};
    }
    overflow: auto;
    width: calc(100% - 2px);
  }
`;

export const ActivityList = ({ children }: React.PropsWithChildren) => {
  return (
    <StyledListContainer>
      <Card>{children}</Card>
    </StyledListContainer>
  );
};
