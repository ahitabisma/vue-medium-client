import { useAuthStore } from '@/stores/auth'
import { axiosInstance, axiosPrivateInstance } from '@/utils/axios'
import type { AxiosInstance } from 'axios'
import { watchEffect } from 'vue'

export function useApi() {
  return axiosInstance
}

export function useApiPrivate(): AxiosInstance {
  const authStore = useAuthStore()

  watchEffect(() => {
    axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
  })

  axiosPrivateInstance.interceptors.response.use(
    // Mengembalikan respons jika berhasil
    (response) => response,
    async (error) => {
      const prevRequest = error?.config // Menyimpan konfigurasi permintaan sebelumnya
      // Jika terjadi error 403 atau 401 dan permintaan sebelumnya belum dikirim
      if (
        (error?.response?.status === 403 || error?.response?.status === 401) &&
        !prevRequest.sent
      ) {
        // Menandai bahwa permintaan sudah dikirim
        prevRequest.sent = true
        try {
          // Mencoba menyegarkan token otentikasi
          await authStore.refresh()
          // Menetapkan token otentikasi yang baru
          prevRequest.headers['Authorization'] = authStore.accessToken
          // Mengirim ulang permintaan dengan token yang baru
          return axiosPrivateInstance(prevRequest)
        } catch (error) {
          // Mengembalikan error jika gagal menyegarkan token
          return Promise.reject(error)
        }
      }

      // Mengembalikan error jika tidak terjadi error 403 atau 401
      return Promise.reject(error)
    }
  )

  return axiosPrivateInstance
}
