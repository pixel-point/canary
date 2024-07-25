import React from 'react'
import Container from '../../components/layout/container'
import { GitnessNavbar } from '../components/NavBar.stories'
import { GitnessNoActionTopBar } from '../components/TopBar.stories'
import { Button } from '@harnessio/canary'
import { ChevronRightIcon } from '@radix-ui/react-icons'

export default {
  title: 'Screens/Pipeline',
  parameters: {
    layout: 'fullscreen'
  }
}

export function CreatePipeline() {
  return (
    <Container.Root>
      <Container.Sidebar>
        <GitnessNavbar />
      </Container.Sidebar>
      <Container.Main>
        <Container.Topbar>
          <GitnessNoActionTopBar />
        </Container.Topbar>
        <Container.Content>
          {/* View */}
          <div className="w-full max-w-[860px] min-h-full mx-auto px-5 py-5">
            {/* Section */}
            <div className="flex flex-col mt-16 gap-3">
              {/* Section Header */}
              {/* Section Title */}
              <p className="text-3xl text-primary font-regular -tracking-[2%]">Create your pipeline</p>
              {/* Section Content */}
              <p className="text-sm text-[#C9C9CF] font-light -tracking-[2%] max-w-[50%]">
                It’s very simple to start using Gitness. Allow our AI to create your pipeline based on the code base or
                start from a clean state.
              </p>
            </div>

            {/* Section */}
            <div className="flex flex-col gap-4 border-t border-[#18181B] mt-6 pt-6">
              {/* Section Header */}
              {/* Section Title */}
              <p className="text-xl text-primary font-regular -tracking-[2%]">
                Don't know where to start? Use a template...
              </p>
              {/* Section Content */}
              {/* Section Card Grid */}
              <div className="grid grid-flow-col auto-rows-[200px] gap-4">
                {/* Section Card */}
                <div className="border bg-white/5 rounded-md"></div>
                {/* Section Card */}
                <div className="border bg-white/5 rounded-md"></div>
                {/* Section Card */}
                <div className="border bg-white/5 rounded-md"></div>
              </div>
            </div>

            {/* Section */}
            <div className="flex flex-col gap-3 border-t border-[#18181B] mt-6 pt-6">
              {/* Section Content */}
              {/* Section Card Grid */}
              <div className="grid grid-flow-col auto-cols-[1fr] auto-rows-[200px] gap-4">
                {/* Section Card */}
                <div className="flex flex-col gap-2">
                  <p className="text-xl text-primary font-regular -tracking-[2%]">Resources</p>
                  <p className="text-sm text-[#C9C9CF] font-light -tracking-[2%]">
                    Explore more about Gitness and it’s architecture in the documentation.
                  </p>
                  <Button variant="link" size="sm" className="self-start p-0 mt-1">
                    Read documentation&nbsp;
                    <ChevronRightIcon className="w-3 h-3" />
                  </Button>
                </div>
                {/* Section Card */}
                <div className="flex border bg-white/5 rounded-md"></div>
                {/* Section Card */}
                <div className="flex border bg-white/5 rounded-md"></div>
              </div>
            </div>
          </div>
        </Container.Content>
      </Container.Main>
    </Container.Root>
  )
}
