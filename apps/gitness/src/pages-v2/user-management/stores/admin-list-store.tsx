import { create } from 'zustand'

import { IAdminListUsersStore, UsersProps } from '@harnessio/ui/views'

import { EActiveTab, PageResponseHeader } from '../../../types'

export const useAdminListUsersStore = create<IAdminListUsersStore>(set => ({
  users: [],
  totalPages: 1,
  page: 1,
  password: null,
  user: null,
  searchQuery: '',
  generatePassword: false,
  activeTab: EActiveTab.ACTIVE,
  setPage: page =>
    set({
      page
    }),
  setUsers: (data: UsersProps[]) => {
    set({
      users: data
    })
  },
  setTotalPages: (headers: Headers) => {
    const totalPages = parseInt(headers?.get(PageResponseHeader.xTotalPages) || '0')

    set({
      totalPages
    })
  },
  setPassword: (password: string) => {
    set({
      password
    })
  },
  setUser: (user: UsersProps) => {
    set({
      user
    })
  },
  setGeteneratePassword: (generatePassword: boolean) => {
    set({
      generatePassword
    })
  },
  setSearchQuery: (searchQuery: string) => {
    set({
      searchQuery
    })
  },
  setActiveTab: (activeTab: EActiveTab) => {
    set({
      activeTab
    })
  }
}))
