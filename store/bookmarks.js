import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

export const useBookmarkStore = create(
  persist(
    (set, get) => ({
      bookmarks: [],
      add: (user) => {
        console.log('Adding user to bookmarks:', user);
        console.log('Current bookmarks:', get().bookmarks);
        
        set((state) => {
          const exists = state.bookmarks.some((u) => u.id === user.id);
          console.log('User already bookmarked?', exists);
          
          if (exists) {
            console.log('User already exists in bookmarks, not adding');
            return { bookmarks: state.bookmarks };
          } else {
            const newBookmarks = [...state.bookmarks, user];
            console.log('Adding user, new bookmarks:', newBookmarks);
            return { bookmarks: newBookmarks };
          }
        });
      },
      remove: (id) => {
        console.log('Removing user with id:', id);
        console.log('Current bookmarks before removal:', get().bookmarks);
        
        set((state) => {
          const newBookmarks = state.bookmarks.filter((u) => u.id !== id);
          console.log('New bookmarks after removal:', newBookmarks);
          return { bookmarks: newBookmarks };
        });
      },
    }),
    {
      name: 'hr-dashboard-bookmarks', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage for persistence
      partialize: (state) => ({ bookmarks: state.bookmarks }), // only persist bookmarks
    }
  )
);
