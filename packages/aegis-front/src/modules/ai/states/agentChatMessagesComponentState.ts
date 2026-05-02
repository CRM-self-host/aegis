import { AgentChatComponentInstanceContext } from '@/ai/states/AgentChatComponentInstanceContext';
import { createAtomComponentState } from '@/ui/utilities/state/jotai/utils/createAtomComponentState';
import { type ExtendedUIMessage } from 'aegis-shared/ai';

export const agentChatMessagesComponentState = createAtomComponentState<
  ExtendedUIMessage[]
>({
  key: 'agentChatMessagesComponentState',
  defaultValue: [],
  componentInstanceContext: AgentChatComponentInstanceContext,
});
