import { type LogicFunctionManifest } from 'aegis-shared/application';
import { type InputJsonSchema } from 'aegis-shared/logic-function';

export type LogicFunctionHandler = (...args: any[]) => any | Promise<any>;

export type LogicFunctionConfig = Omit<
  LogicFunctionManifest,
  | 'sourceHandlerPath'
  | 'builtHandlerPath'
  | 'builtHandlerChecksum'
  | 'handlerName'
  | 'toolInputSchema'
> & {
  handler: LogicFunctionHandler;
  toolInputSchema?: InputJsonSchema;
};
