# Quote Builder App

A React-based quote generation tool built with Next.js and Tailwind, hosted on Vercel. This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- Create and remove quote items
- Automatic VAT calculations
- Support for both charges and credits
- Responsive Tailwind based UI
- Export to PDF

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/davecartledge/quotes-app.git
cd quotes-app
```

2. `npm install`

3. `npm run dev`

4. Open http://localhost:3000 in your browser


### Running Tests

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Notes and comments

- Unfortunately I didn't get time to write more tests
- I wanted to add a Docker config to the project too
- I chose to add PDF export functionality over reordering the items
- VAT rate is fixed at 20% but I could have set this as an editable variable perhaps in an .env file
- The some of the Tailwind classes, particularly on the form elements could have been made more DRY with a CSS class or a utility component
- Only using the basic eslint config that comes with create-next-app
- Built using Cursor with some AI-assisted refinements
