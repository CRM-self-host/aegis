import { type ConfirmationModalCaller } from 'aegis-shared/types';

export type CommandMenuConfirmationModalResult = 'confirm' | 'cancel';

export type CommandMenuConfirmationModalResultBrowserEventDetail = {
  caller: ConfirmationModalCaller;
  confirmationResult: CommandMenuConfirmationModalResult;
};
