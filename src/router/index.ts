import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/layout/GuestLayout.vue'),
      children: [
        // Home Page
        {
          path: '',
          name: 'guest',
          component: () => import('../views/auth/GuestView.vue'),
          meta: {
            guest: true
          }
        },
        // Login View
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
          meta: {
            guest: true,
            hideNavbar: true
          }
        },
        // Register View
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
          meta: {
            guest: true,
            hideNavbar: true
          }
        }
      ]
    },

    // Main Explore View
    {
      path: '/main',
      component: () => import('../views/layout/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'main',
          component: () => import('../views/main/ExploreView.vue'),
          meta: {
            auth: true
          }
        }
      ]
    },

    // Main Following View
    {
      path: '/following',
      component: () => import('../views/layout/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'following',
          component: () => import('../views/main/FollowingView.vue'),
          meta: {
            auth: true
          }
        }
      ]
    },

    // Detail Story adn User For Guest
    {
      path: '/@',
      children: [
        // User Profile View
        {
          path: ':username',
          component: () => import('../views/layout/UserLayout.vue'),
          children: [
            {
              path: '',
              name: 'user-profile',
              component: () => import('../views/user/UserProfile.vue'),
              meta: {
                guestDetail: true
              }
            }
          ]
        },
        // Detail Story View
        {
          path: ':username/:slug',
          component: () => import('../views/layout/GuestLayout.vue'),
          children: [
            {
              path: '',
              name: 'user-story-detail',
              component: () => import('../views/story/DetailStory.vue'),
              meta: {
                guestDetail: true
              }
            }
          ]
        },
      ]
    },

    // Create New Story
    {
      path: '/new-story',
      name: 'new-story',
      component: () => import('../views/story/CreateStory.vue'),
      meta: {
        auth: true,
        newStory: true
      }
    },
    // Your Story
    {
      path: '/me/stories',
      name: 'your-story',
      component: () => import('../views/story/YourStories.vue'),
      meta: {
        auth: true,
      }
    }
  ]
})

router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.auth && !authStore.isAuth) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.guest && authStore.isAuth) {
    return next({ name: 'main' })
  } else {
    return next()
  }
})

export default router
