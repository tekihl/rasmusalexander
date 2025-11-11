export const allProjectsQuery = `
  *[_type == "project"] | order(date desc) {
    _id,
    title,
    slug,
    description,
    date,
    thumbnail,
    "media": media[]{
      _type,
      url,
      asset->{_id, url}
    }
  }
`

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    description,
    date,
    thumbnail,
    "media": media[]{
      _type,
      url,
      asset->{_id, url}
    }
  }
`
