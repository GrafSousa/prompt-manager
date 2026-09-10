import { PromptList } from '../prompts/prompt-list';
import { SidebarRoot } from '../sidebar/root';
import { SidebarContent } from '../sidebar/content';

export function PromptSidebar() {
  return (
    <SidebarRoot>
      <SidebarContent>
        <PromptList />
      </SidebarContent>
    </SidebarRoot>
  );
}
