import { PromptList } from '../prompts/prompt-list';
import { SidebarRoot } from '../sidebar/root';
import { SidebarContent } from '../sidebar/content';
import { fetchPromptsQuery } from '@/presentation/prompts/queries/fetch-prompts-query';

export async function PromptSidebar() {
  const initialPageData = await fetchPromptsQuery({});

  return (
    <SidebarRoot>
      <SidebarContent>
        <PromptList initialPageData={initialPageData} />
      </SidebarContent>
    </SidebarRoot>
  );
}
