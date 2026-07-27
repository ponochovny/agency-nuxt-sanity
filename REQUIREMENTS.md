# Monorepo (Nuxt + Sanity Studio)

## Commands

- `npm run dev` - Runs two workspaces (nuxt + sanity studio)
- `npm run dev:nuxt`
- `npm run dev:sanity`

## (Production) ISR Revalidate on change

### On-Demand ISR with Sanity Webhooks

```TS
// server/api/revalidate.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const secret = getQuery(event).secret || body?.secret

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }

  const slug = body?.slug?.current
  const type = body?._type
  const storage = useStorage('cache')

  try {
    // In Nitro, route cache keys typically look like nitro:handlers:_:path
    // The safest approach is to get all keys and delete those that match
    const keys = await storage.getKeys('nitro:handlers')

    // Function to clear a specific path
    const clearRoute = async (path: string) => {
      // Find keys that contain our path (for example /blog/my-post)
      const keysToDelete = keys.filter(k => k.includes(path.replace(/\//g, ':')))
      for (const key of keysToDelete) {
        await storage.removeItem(key)
      }
    }

    if (type === 'post' && slug) {
      await clearRoute(`/blog/${slug}`)
      await clearRoute(`/blog`)
    } else {
      await clearRoute(`/`) // Clear the home page cache
    }

    return { success: true, message: 'Cache cleared' }
  } catch (error) {
    return { success: false, message: 'Cache clear failed' }
  }
})
```

#### Setting up Webhook in Sanity

Go to `manage.sanity.io` $\rightarrow$ your project $\rightarrow$ API $\rightarrow$ Webhooks.

Press Create Webhook:

- URL: `https://your-domain.com/api/revalidate?secret=YOUR_SUPER_SECRET_KEY`
- Dataset: `production`
- Trigger on: `Create, Update, Delete`.
- Filter: `_type in ["post", "project", "page"]`

Save.

Now, when you click Publish in Sanity Studio, Sanity will instantly send the request to Nuxt, and changed page will rubuild.
