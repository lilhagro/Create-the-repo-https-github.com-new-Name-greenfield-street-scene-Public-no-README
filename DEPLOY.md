# Deploy Greenfield Street Scene (do these 2 things)

This agent **cannot** log into your GitHub or Vercel accounts. Everything else is ready.

## A) Put the code on GitHub (required — you)

1. Open https://github.com/new  
2. Repository name: `greenfield-street-scene`  
3. Public  
4. **Do not** add README / .gitignore / license  
5. Click **Create repository**

Then on your phone/computer, open a terminal **in this project folder** and run (replace `YOUR_USERNAME`):

```bash
git remote remove origin 2>/dev/null
git remote add origin https://github.com/YOUR_USERNAME/greenfield-street-scene.git
git push -u origin cursor/redline-ai-shop-a47b:main
```

GitHub will ask you to sign in once.

**Or** in Cursor Desktop: open this folder → Source Control → Publish Branch → pick GitHub.

## B) Make it live on Vercel (required — you)

1. Open https://vercel.com/new  
2. Import `greenfield-street-scene`  
3. Click **Deploy** (defaults are fine)  
4. Copy the `.vercel.app` URL — that’s your live site

Optional later: add a custom domain in Vercel → Project → Settings → Domains.

## If you want the agent to push for you next time

1. Create the empty GitHub repo (step A)  
2. Start a **new Cloud Agent on that repo** from https://cursor.com/agents  
3. Say: “Push the Greenfield Street Scene shop and deploy”

Or reply here with:
- your GitHub repo URL, and  
- a **GitHub Personal Access Token** (repo scope)  

…and a future agent run with credentials can push. **Don’t paste passwords.** Tokens can be revoked after.
