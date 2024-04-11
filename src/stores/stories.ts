import { useApi, useApiPrivate } from '@/composable/useApi'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

const authStore = useAuthStore()

export interface Story {
  id: string
  title: string
  body: string
  slug: string
  author: string
  username:string
  topic:string
  created_at: string
  timetoRead: number
  imageUrl?: string
  full_name?: string
}

export interface StoryData {
  title: string
  body: string
}

export interface MyStory {
  author: string
}

export const useStoriesStore = defineStore('stories', {
  state: () => {
    return {
      stories: [] as Story[],
      story: {} as Story
    }
  },

  getters: {
    isLoading: (state) => (state.stories ? false : true)
  },

  actions: {
    async getAllStories() {
      try {
        const { data } = await useApi().get(`/api/v1/stories`)
        this.stories = data.data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async getMyStories(payload : MyStory) {
      try {
        const { data } = await useApiPrivate().post(`/api/v1/stories/me/stories`, payload )
        this.stories = data.data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async getStoryByUsernameSlug(username: any, slug: any) {
      try {
        const { data } = await useApi().get(`/api/v1/stories/${username}/${slug}`)
        this.story = data.data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async createStory(payload: StoryData) {
      try {
        const { data } = await useApiPrivate().post(`/api/v1/stories/create`, payload)
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    }
  }
})
