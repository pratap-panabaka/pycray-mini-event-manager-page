## Mini Event Manager Page using Next-Forge Turbo template

This App does not use all the possibilities of Next-Forge template, uses only App.

### How to run:
```
git clone https://github.com/pratap-panabaka/pycray-mini-event-manager-page
cd pycray-mini-event-manager-page
pnpm install
pnpm run dev --filter app
```

then copy paste the url http://localhost:3000/events

### prerequisite:
```
node
npm
pnpm
```

### Notes:
1. Next-Forge template requires lots of configuration especially setting environmental variables.  
Since I have used them in `.env.local` file, you will not have those files while cloning.  
You may see errors on loading the page http://localhost:3000/events or may be redirected to signup/signin.
2. To delete the event, please **double click** on the delete icon.

### Screenshot when running on Local:
<img width="1920" height="1080" alt="Mini Event Manager" src="https://github.com/user-attachments/assets/1f9a469b-046f-49f0-a483-bfe748484401" />
