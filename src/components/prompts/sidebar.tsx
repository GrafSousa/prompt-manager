import { Suspense } from 'react';

import { PromptList } from '../prompts/prompt-list';
import { SidebarRoot } from '../sidebar/root';
import { SidebarContent } from '../sidebar/content';

export async function PromptSidebar() {
  return (
    <Suspense fallback={<p>Carregando</p>}>
      <SidebarRoot>
        <SidebarContent>
          <PromptList />
        </SidebarContent>
      </SidebarRoot>
    </Suspense>
  );
}
