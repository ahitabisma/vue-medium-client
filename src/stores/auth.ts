import { useApi, useApiPrivate } from '@/composable/useApi'
import { defineStore } from 'pinia'

export interface User {
  id: string
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  imageUrl: string
  full_name?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  first_name: string
  last_name: string
  password: string
  password_confirm: string
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: {} as User,
      accessToken: '' as string,
      allUser: [] as User[],
      userByUsername: {} as User
    }
  },
  getters: {
    userDetail: (state) => state.user,
    isAuth: (state) => (state.accessToken ? true : false)
  },
  actions: {
    async attempt() {
      try {
        await this.refresh()
        await this.getUser()
      } catch (error) {
        return
      }
      return
    },
    async register(payload: RegisterData) {
      try {
        const { data } = await useApi().post(`/api/v1/auth/register`, payload)
        return data
      } catch (error: Error | any) {
        throw error.response.data.message
      }
    },

    async login(payload: LoginData) {
      try {
        const { data } = await useApi().post(`/api/v1/auth/login`, payload)
        this.accessToken = data.access_token
        await this.getUser()
        return data
      } catch (error: Error | any) {
        // console.log(error.response.data.message)
        throw error.response.data.message
      }
    },

    async getUser() {
      try {
        const { data } = await useApiPrivate().get(`/api/v1/auth/profile`)
        this.user = data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async logout() {
      try {
        const { data } = await useApiPrivate().post(`/api/v1/auth/logout`)
        this.accessToken = ''
        this.user = {} as User
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async refresh() {
      try {
        const { data } = await useApi().post(`/api/v1/auth/refresh`)
        this.accessToken = data.access_token
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async getAllUsers() {
      try {
        const { data } = await useApiPrivate().get(`/api/v1/auth`)
        this.allUser = data.data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async getUserByUsername(username: any) {
      try {
        const { data } = await useApi().get(`/api/v1/auth/user/${username}`)
        this.userByUsername = data.data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    }
  }
})
