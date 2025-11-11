export const allOutOfOfficeQuery = `
  *[_type == "outOfOffice"] | order(_createdAt desc) {
    _id,
    title,
    caption,
    "media": media[]{
      _type,
      url,
      asset->{_id, url}
    }
  }
`
