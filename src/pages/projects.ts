
import "../projects.scss"
import { client } from "../sanity/sanityClient"
import { allProjectsQuery } from "../sanity/queries/projects"

type MediaItem = { _type: string; url?: string; asset?: { url?: string } }
type Project = {
  _id: string
  title: string
  slug?: { current: string }
  description?: string
  date?: string
  thumbnailUrl?: string
  media?: MediaItem[]
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

  // loading state
  const loading = el('div', 'feed-loading', 'Loading projects…')
  feed.appendChild(loading)

  const projects: Project[] = await client.fetch(allProjectsQuery)
  feed.innerHTML = ""

  projects.forEach(p => {
    const item = el('article', 'feed-item')
    const title = el('h3', 'feed-title crt__glass crt-rgb', p.title || 'Untitled')
    item.appendChild(title)

    // media block
    let mediaEl: HTMLElement | null = null
    const thumb = p.thumbnailUrl
    const first = p.media?.[0]
    if (thumb) {
      const img = el('img', 'feed-media') as HTMLImageElement
      img.src = thumb
      img.alt = p.title || ""
      mediaEl = img
    } else if (first) {
      if (first._type === 'image' && first.asset?.url) {
        const img = el('img', 'feed-media') as HTMLImageElement
        img.src = first.asset.url!
        img.alt = p.title || ""
        mediaEl = img
      } else if (first._type === 'vimeoEmbed' && first.url) {
        mediaEl = vimeoIframe(first.url)
      }
    }
    if (mediaEl) item.appendChild(mediaEl)

    const desc = el('p', 'feed-desc crt__glass crt-rgb', p.description || '')
    item.appendChild(desc)

    const date = el('div', 'feed-date crt__glass crt-rgb', fmtDate(p.date))
    item.appendChild(date)

    feed.appendChild(item)
  })
}

load().catch(err => {
  console.error(err)
  const projectsHero = document.querySelector('.projects-hero') as HTMLElement | null
  const mount = projectsHero || document.body
  const errBox = el('div', 'feed-error', 'Failed to load projects. Open console for details.')
  mount.appendChild(errBox)
})
