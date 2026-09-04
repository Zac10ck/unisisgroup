# Unisis Group website

Official static website for Unisis Group.

## Deployment — important

The live site at <https://unisisgroup.com> is **not** served from this
repository. The domain resolves to `35.213.146.147` (nginx), a separate host
that receives files by manual upload. Pushing to `main` does **not** update
the live site.

| Target | URL | Updated by |
| --- | --- | --- |
| Live site | https://unisisgroup.com | manual upload to the nginx host |
| GitHub Pages copy | https://zac10ck.github.io/unisisgroup/ | automatic, on push to `main` |

The GitHub Pages copy is a mirror. Its pages carry a canonical tag pointing at
`https://unisisgroup.com/`, so search engines will not treat it as duplicate
content competing with the live domain.

After merging a change, upload the affected files to the live host to make it
live. `deploy.sh` does this over FTPS:

    ./deploy.sh check     # list the remote web root
    ./deploy.sh deploy    # upload from the working tree
    ./deploy.sh verify    # confirm what actually landed on the live URL

Run it from a normal terminal. It prompts for the FTP password with `read -s`,
so the password is never echoed, never stored in shell history and never
captured in a transcript. Do not paste the password into a command line, a
script, or an AI coding session.

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
