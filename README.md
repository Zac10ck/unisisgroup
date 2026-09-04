# Unisis Group website

Official static website for Unisis Group.

## Deployment — important

The live site at <https://unisisgroup.com> is **not** served from this
repository. The domain is served by a separate host that receives files by upload. Pushing to `main` does **not** update
the live site.

| Target | URL | Updated by |
| --- | --- | --- |
| Live site | https://unisisgroup.com | upload to the hosting account |
| GitHub Pages copy | https://zac10ck.github.io/unisisgroup/ | automatic, on push to `main` |

The GitHub Pages copy is a mirror. Its pages carry a canonical tag pointing at
`https://unisisgroup.com/`, so search engines will not treat it as duplicate
content competing with the live domain.

After merging a change, the affected files must be uploaded to the live host
to appear on unisisgroup.com. That upload step is done outside this repository
and is not automated here.

## Local preview

Serve the repository root with any static web server, then open `index.html`
through that server:

    python3 -m http.server 8000

## SEO / structured data

`index.html` carries a `schema.org` `@graph` describing the Unisis Group
`Organization` and the `Person` entity for Raju Kurian, plus canonical, Open
Graph and Twitter Card tags. `sitemap.xml` and `robots.txt` are served from the
site root. Absolute URLs in that markup all point at `https://unisisgroup.com/`,
so the files are correct only when hosted on that domain.
