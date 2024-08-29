This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Enhance Search Functionality task - Implementing filters based on file type to refine search results. 
- I modified the current icons for the file types, and passed an `isFilterIcon` prop, which then returns a different svg based on whether this is true or false. I did this so as to avoid creating different svg files for the different icons that were used in the filters.
- I created a `SearchFilters` component, which renders the search filters as well as a `Clear Filters` button. 
- I modified the Search component and added a filter state which keeps track of the set filter and renders results based on the filters. This component also has a `clearFilters` function, which clears the filters and displays all results regardless of file type.

## Enhance Chat Functionality - using the browser's local storage API to store a list of chat sessions (with a design similar to ChatGPT's interface). 
- I began by working on storing chat sessions in an object having  `id`, `title`, `messages` and `createdAt` fields.
- I implemented getting the chat sessions from local storage and setting the messages as the messages of the `currentChatSession`.
- Thereafter, I worked on rendering for the `chatSessions` and their messages, and lastly, I extracted some code into a custom hook so as to keep the code clean. 

