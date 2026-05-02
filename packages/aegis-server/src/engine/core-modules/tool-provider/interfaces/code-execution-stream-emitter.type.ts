import { type CodeExecutionData } from 'aegis-shared/ai';

export type CodeExecutionStreamEmitter = (data: CodeExecutionData) => void;
