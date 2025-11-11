
import "../projects.scss"
import { client } from "../sanity/sanityClient"
import { allOutOfOfficeQuery } from "../sanity/queries/outOfOffice"

type MediaItem = { _type: string; url?: string; asset?: { url?: string } }
type Post = {
  _id: string
  title?: string
  caption?: string
  media?: MediaItem[]
  _createdAt?: string
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, html?: string) {
  const e = document.createElement(tag)
  if (cls) e.className = cls
  if (html) e.innerHTML = html
  return e
}

function fmtDate(s?: string) {
  if (!s) return ""
  try { return new Date(s).toLocaleDateString() } catch { return s }
}

function vimeoIframe(url: string) {
  const id = url.split('/').pop() || url
  const iframe = el('iframe', 'feed-media') as HTMLIFrameElement
  iframe.src = `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`
  iframe.setAttribute('frameborder', '0')
  iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture')
  iframe.allowFullscreen = true
  return iframe
}

async function load() {
  const projectsHero = document.querySelector('.projects-hero') as HTMLElement | null
  const mount = projectsHero || document
  const feed = el('div', 'feed-grid')
  mount.appendChild(feed)

  const loading = el('div', 'feed-loading', 'Loading posts…')
  feed.appendChild(loading)

  const posts: Post[] = await client.fetch(allOutOfOfficeQuery)
  feed.innerHTML = ""

  posts.forEach(p => {
    const item = el('article', 'feed-item')
    const title = el('h3', 'feed-title crt__glass crt-rgb', p.title || '')
    if (p.title) item.appendChild(title)

    const first = p.media?.[0]
    if (first) {
      if (first._type === 'image' && first.asset?.url) {
        const img = el('img', 'feed-image') as HTMLImageElement
        img.src = first.asset.url!
        img.alt = p.title || p.caption || ""
        item.appendChild(img)
      } else if (first._type === 'vimeoEmbed' && first.url) {
        item.appendChild(vimeoIframe(first.url))
      }
    }

    if (p.caption) {
      item.appendChild(el('p', 'feed-desc crt__glass crt-rgb', p.caption))
    }
    if (p._createdAt) {
      item.appendChild(el('div', 'feed-date crt__glass crt-rgb', fmtDate(p._createdAt)))
    }

    feed.appendChild(item)
  })
}

load().catch(err => {
  console.error(err)
  const projectsHero = document.querySelector('.projects-hero') as HTMLElement | null
  const mount = projectsHero || document.body
  const errBox = el('div', 'feed-error', 'Failed to load posts. Open console for details.')
  mount.appendChild(errBox)
})
