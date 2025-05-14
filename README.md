# Blockchain Developer Portfolio

A modern, blockchain-themed portfolio website built with Next.js 15 and Tailwind CSS 4. This portfolio showcases blockchain development skills with unique blockchain-inspired UI components and animations.

## 🔗 Features

- **Blockchain-Themed Design**: Unique blockchain-inspired UI throughout the site
- **Animated Background**: Dynamic blockchain network visualization with cryptocurrency icons (BTC, ETH, SOL)
- **Blockchain Explorer Navigation**: Left sidebar navigation styled as a blockchain explorer interface
- **NFT-Style Project Cards**: Projects displayed as NFT tokens with metadata and hover effects
- **Experience Blocks**: Work experience displayed as a blockchain with connected blocks through hash references
- **Skill Level Visualization**: Skills displayed with blockchain confirmation indicators showing experience level
- **Responsive Design**: Fully responsive with mobile-friendly sidebar navigation
- **Tailwind CSS Animations**: Smooth animations and transitions using Tailwind CSS

## 🧱 Project Structure

```
blockchain-portfolio/
├── public/               # Static assets
│   ├── icons/            # SVG icons for technologies and cryptocurrencies
│   │   ├── crypto/       # Cryptocurrency icons (BTC, ETH, SOL)
│   │   └── tech/         # Technology stack icons (Solidity, Ethereum, etc.)
│   └── projects/         # Project images
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── blocks/       # Experience blocks page
│   │   ├── contact/      # Contact page
│   │   ├── projects/     # Projects page
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout with sidebar
│   │   └── page.tsx      # Homepage
│   └── components/       # React components
│       ├── blocks/       # Experience block components
│       ├── contact/      # Contact form components
│       ├── layout/       # Layout components (sidebar, blockchain navigation)
│       ├── projects/     # Project card components
│       └── ui/           # UI components and animations
└── ...                   # Config files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blockchain-portfolio.git
   cd blockchain-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🎨 Blockchain-Themed Components

### AnimatedBlockchainBackground

A dynamic background animation that visualizes a blockchain network with floating cryptocurrency icons (BTC, ETH, SOL) and connected blocks. The animation is rendered on a canvas element and only runs on the client side.

```tsx
// Usage in layout.tsx
<ClientBackgroundWrapper />
```

### BlockchainNavigation

A blockchain explorer-style sidebar navigation that displays pages as blocks in a chain. Each navigation item includes blockchain metadata like block height, hash, and gas price.

```tsx
// Usage in SidebarLayout.tsx
<BlockchainNavigation />
```

### ProjectCard

Projects displayed as NFT-style tokens with metadata including token ID, chain, and rarity. Each card has hover effects and can open a modal with detailed project information.

```tsx
// Usage in projects/page.tsx
<ProjectCard
  title="DeFi Swap Protocol"
  description="A decentralized token swap protocol..."
  techStack={[
    { name: "Solidity", icon: "/icons/tech/solidity.svg" },
    // ...
  ]}
  githubLink="https://github.com"
  demoLink="https://example.com"
  contractAddress="0x1234..."
  tokenId="0001"
  chain="ETH"
  rarity="Rare"
/>
```

### Block

Experience blocks displayed as a blockchain with each block connected to the previous one through its hash. Blocks include mining animations and blockchain-style metadata.

```tsx
// Usage in blocks/page.tsx
<Block
  title="Senior Smart Contract Engineer"
  company="DeFi Protocol Inc."
  period="2022 - Present"
  description="Led the development of a decentralized lending protocol..."
  techStack={[
    { name: "Solidity", icon: "/icons/tech/solidity.svg" },
    // ...
  ]}
  blockHash="0x1234..."
  prevBlockHash="0x5678..."
  blockHeight={3}
/>
```

### SkillLevel

A visual indicator for skill levels represented as blockchain confirmations. The more blocks, the higher the skill level.

```tsx
// Usage in page.tsx
<SkillLevel name="Solidity" level={80} icon="/icons/tech/solidity.svg" />
```

## 🎭 Customization

### Updating Personal Information

Edit the following files to update your personal information:

- `src/app/page.tsx`: Update the hero section with your title and description
- `src/app/blocks/page.tsx`: Update the experience blocks with your work history
- `src/app/projects/page.tsx`: Update the projects with your portfolio items
- `src/app/contact/page.tsx`: Update your contact information

### Changing Theme Colors

The main theme colors are defined in the CSS variables and Tailwind classes:

- Primary color: `#00ff9d` (Neon green)
- Secondary color: `#00c3ff` (Cyan blue)
- Background: `#0a0a0a` (Near black)
- Card background: `#121212` (Dark gray)
- Border color: `#2d2d2d` (Medium gray)

To change these colors, update the references in `src/app/globals.css` and component files.

### Adding Custom Icons

1. Add your SVG icons to the appropriate folders:
   - Technology icons: `public/icons/tech/`
   - Cryptocurrency icons: `public/icons/crypto/`

2. Reference them in your components:
   ```tsx
   <img src="/icons/tech/your-icon.svg" alt="Technology Name" className="w-6 h-6" />
   ```

### Modifying Blockchain Animations

The blockchain-themed animations can be customized in the following files:

- `src/components/ui/AnimatedBlockchainBackground.tsx`: Main background animation
- `src/components/ui/BlockchainAnimation.tsx`: Block mining animations
- `src/components/ui/BlockchainBackground.tsx`: Static blockchain background

## 📦 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import your repository on Vercel
3. Vercel will detect Next.js and set up the optimal build settings automatically

### Other Deployment Options

You can also deploy this app to any platform that supports Next.js applications, such as:

- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted with Node.js

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute to this project:

1. **Fork the repository**
   - Create your own copy of the project to work on

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Add or modify code
   - Update documentation as needed
   - Ensure your code follows the project's style

4. **Test your changes**
   - Make sure your changes don't break existing functionality
   - Test on different screen sizes for responsive design

5. **Commit your changes**
   ```bash
   git commit -m "Add feature: your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Submit a PR from your branch to the main repository
   - Provide a clear description of the changes and their purpose

### Contribution Guidelines

- Follow the existing code style and naming conventions
- Keep blockchain theming consistent throughout new components
- Add comments for complex logic
- Update the README if you add new features or dependencies
- Respect the existing architecture and component structure

### Commit Message Style: Conventional Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages to make the commit history more structured and machine-readable:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files

#### Examples:
```
"feat(projects): add NFT card hover effects"
"fix(sidebar): resolve responsive layout issues"
"perf(animation): optimize blockchain background rendering"
"docs(readme): update installation instructions"
"refactor(blocks): improve Block component reusability"
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React framework (v15)
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework (v4)
- [React](https://react.dev/) - UI library (v19)
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
