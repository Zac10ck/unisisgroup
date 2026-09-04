#!/bin/bash
#
# Deploy the site to the live host.
#
# unisisgroup.com is NOT served from GitHub Pages — it runs on SiteGround
# and is updated by upload. Pushing to main does not make anything live.
# This script uploads the current working tree over FTPS.
#
# Run it from Terminal, not from an AI coding session: it prompts for the
# password with `read -s`, so the password is never echoed, never written
# to shell history, and never captured in a transcript.
#
#   ./deploy.sh check     # list the remote web root
#   ./deploy.sh deploy    # upload the SEO-relevant files
#   ./deploy.sh verify    # fetch the live URL and confirm what landed
#
set -euo pipefail

HOST="sgp7.siteground.asia"
USER="main@unisisgroup.com"
REMOTE="public_html"
SITE="https://unisisgroup.com"
ROOT="$(cd "$(dirname "$0")" && pwd)"

FILES=(index.html robots.txt sitemap.xml
       images/raju-kurian.jpg images/og-image.jpg images/logo.png)

ask_pass() {
  read -rsp "FTP password for $USER: " PASS
  echo
  # --ssl-reqd forces explicit FTPS. Plain FTP would send this password
  # across the network in cleartext; refuse to do that.
  CURL=(curl -sS --ssl-reqd --user "$USER:$PASS" --connect-timeout 20)
}

case "${1:-}" in
  check)
    ask_pass
    echo "--- account root ---"
    "${CURL[@]}" "ftp://$HOST/"
    echo "--- $REMOTE ---"
    "${CURL[@]}" "ftp://$HOST/$REMOTE/" \
      || echo "no '$REMOTE' here; set REMOTE= to the right dir from the listing above"
    ;;

  deploy)
    for f in "${FILES[@]}"; do
      [ -f "$ROOT/$f" ] || { echo "missing: $f" >&2; exit 1; }
    done
    ask_pass
    for f in "${FILES[@]}"; do
      printf '%-26s ' "$f"
      "${CURL[@]}" -T "$ROOT/$f" "ftp://$HOST/$REMOTE/$f" && echo ok
    done
    echo
    echo "uploaded. now run: ./deploy.sh verify"
    ;;

  verify)
    html=$(curl -sS -L --max-time 20 "$SITE/?cb=$RANDOM")
    printf 'structured data   %s\n' "$(echo "$html" | grep -c 'application/ld+json')"
    printf 'canonical tag     %s\n' "$(echo "$html" | grep -c 'rel="canonical"')"
    printf 'og:image tag      %s\n' "$(echo "$html" | grep -c 'og:image')"
    printf 'stale "#" links   %s   (want 0)\n' "$(echo "$html" | grep -c 'href="#" aria-label')"
    for f in sitemap.xml robots.txt images/raju-kurian.jpg images/og-image.jpg; do
      printf '%-26s %s\n' "$f" "$(curl -sS -o /dev/null -w '%{http_code}' -L --max-time 15 "$SITE/$f")"
    done
    ;;

  *) echo "usage: $0 {check|deploy|verify}" >&2; exit 1 ;;
esac
