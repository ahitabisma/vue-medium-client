import { useApiPrivate } from '@/composable/useApi'
import { defineStore } from 'pinia'

export interface Follow {
  id: string
  userId: string
  followingId: string
}

export interface Stories {
  id: string
  title: string
  slug: string
  body: string
  author: string
  created_at: string
  timetoRead: number
  imageUrl?: string
  full_name?: string
}

export const useFollowStore = defineStore('follow', {
  state: () => {
    return {
      followingStories: [] as Stories[],
      follow: {} as Follow
    }
  },

  actions: {
    async getFollowingStories() {
      try {
        const { data } = await useApiPrivate().get(`/api/v1/follows/following`)
        this.followingStories = data.data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async follow(followingId: any) {
      try {
        const { data } = await useApiPrivate().post(`/api/v1/follows/create`, followingId)
        this.follow = data.data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    }
  }
})
