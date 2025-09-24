# SavvySphere: Your Ultimate Deal Aggregator

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/vinothkumarta-art/generated-app-20250924-121cloudziffy)

SavvySphere is a premium, user-centric deal aggregator platform designed for visual excellence and intuitive navigation. It provides a curated collection of coupons, promo codes, and cashback offers from a wide range of online retailers. The platform features a clean, modern interface with powerful filtering and search capabilities, allowing users to effortlessly find the best deals.

## Key Features

- **Modern & Clean UI:** A visually stunning and intuitive interface built for a delightful user experience.
- **Dynamic Deal Grid:** A responsive grid showcasing the latest deals, which updates instantly as filters are applied.
- **Powerful Filtering:** A sophisticated, collapsible sidebar with filters for categories, price ranges, brands, and more.
- **Responsive Perfection:** Flawless layouts and performance across all device sizes, from mobile phones to large desktops.
- **Interactive Polish:** Smooth animations, hover states, and micro-interactions that make browsing for deals enjoyable.
- **Client-Side First:** Built with a mock data setup, allowing for rapid UI development and a demoable application from day one.

## Technology Stack

- **Frontend:**
    - [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
    - [Vite](https://vitejs.dev/) for fast development and builds
    - [Tailwind CSS](https://tailwindcss.com/) for styling
    - [shadcn/ui](https://ui.shadcn.com/) for the component library
    - [Framer Motion](https://www.framer.com/motion/) for animations
    - [Zustand](https://zustand-demo.pmnd.rs/) for state management
    - [Lucide React](https://lucide.dev/) for icons
- **Backend & Deployment:**
    - [Cloudflare Workers](https://workers.cloudflare.com/) for serverless backend logic
    - [Hono](https://hono.dev/) as the web framework for the Worker
    - [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/) for stateful coordination (in later phases)
    - [Wrangler](https://developers.cloudflare.com/workers/wrangler/) for deployment and management

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Bun](https://bun.sh/) as the package manager and runtime

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/savvysphere.git
    cd savvysphere
    ```

2.  **Install dependencies:**
    This project uses Bun for package management.
    ```bash
    bun install
    ```

## Development

To start the local development server, which includes both the Vite frontend and the Cloudflare Worker backend:

```bash
bun dev
```

The application will be available at `http://localhost:3000` (or the port specified by the `PORT` environment variable). The frontend will hot-reload on changes, and the worker will restart automatically.

## Deployment

This project is configured for seamless deployment to Cloudflare's global network.

1.  **Login to Wrangler:**
    If this is your first time, you'll need to authenticate Wrangler with your Cloudflare account.
    ```bash
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script, which builds the project and deploys it using Wrangler.
    ```bash
    bun run deploy
    ```

Alternatively, you can deploy your own version of this project with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/vinothkumarta-art/generated-app-20250924-121cloudziffy)

## Project Structure

The codebase is organized into three main directories:

-   `src/`: Contains all the frontend React application code, including pages, components, hooks, and utility functions.
-   `worker/`: Contains the backend Cloudflare Worker code, built with Hono. This is where API routes and logic reside.
-   `shared/`: Contains TypeScript types and mock data that are shared between the frontend and the backend to ensure type safety.

## Contributing

Contributions are welcome! If you have suggestions for improving the application, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.