## Mini Event Manager Page using Next-Forge Turbo template

### This App does not use all the possibilities of Next-Forge template, uses only App.

### How to run:
```
git clone https://github.com/pratap-panabaka/pycray-mini-event-manager-page
cd pycray-mini-event-manager-page
pnpm install
pnpm run dev --filter app
```

then copy paste the url http://localhost:3000/events

### prerequisite:
node, npm, pnpm

### Notes:
Next-Forge templage requires lots of configuration especially setting environmental variables.
Since I have used them in `.env.local` file, you may see errors on loading the page http://localhost:3000/events or may be redirected to signup/signin.