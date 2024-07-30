import React from 'react'

const ProjectSwitcher = {
  Root: function Root({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col background-primary">{children}</div>
  },

  List: function List({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col">{children}</div>
  },

  Item: function Item({ children }: { children: React.ReactNode }) {
    return (
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2.5 py-2.5 px-3 cursor-pointer group hover:bg-white/10 ease-in-out duration-150">
        {children}
      </div>
    )
  },

  ItemAvatar: function ItemAvatar({ children }: { children: React.ReactNode }) {
    return <div className="">{children}</div>
  },

  ItemTitle: function ItemTitle({ children }: { children: React.ReactNode }) {
    return <div className="text-xs">{children}</div>
  },

  ItemAction: function ItemAction({ children }: { children: React.ReactNode }) {
    return <div className="text-[12px] group-hover:text-primary text-grey-40">{children}</div>
  },

  AddNew: function AddNew() {
    return <div className="border-t text-xs py-2.5 px-3 text-grey-40">Create new project</div>
  }
}

export default ProjectSwitcher
