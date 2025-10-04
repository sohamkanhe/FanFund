# FanFund

FanFund is a crowdfunding platform that connects creators with their fans, enabling community-driven support for creative projects. Whether you're an artist, musician, filmmaker, or any type of creator, FanFund helps you bring your ideas to life through direct fan contributions.

## Features

- **GitHub Authentication**: Secure login using GitHub OAuth
- **Creator Profiles**: Personalized pages for creators to showcase their work
- **Payment Integration**: Seamless payments via Razorpay
- **Search Functionality**: Find and support your favorite creators
- **Community Building**: Connect creators with dedicated fans
- **Responsive Design**: Modern UI with dark theme and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with GitHub provider
- **Payments**: Razorpay integration
- **Deployment**: Vercel-ready

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fanfund
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   AUTH_GITHUB_ID=your_github_client_id
   AUTH_GITHUB_SECRET=your_github_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Creators
1. Sign in with GitHub
2. Set up your creator profile
3. Share your profile link with fans
4. Receive direct support and project funding

### For Fans
1. Browse and search for creators
2. Visit creator profiles
3. Make payments to support projects
4. Leave messages with your contributions

## Project Structure

```
fanfund/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── [username]/        # Dynamic creator pages
│   ├── dashboard/         # Creator dashboard
│   ├── login/             # Authentication page
│   └── payments/          # Payment management
├── components/            # Reusable React components
├── db/                    # Database connection
├── models/                # Mongoose schemas
├── public/                # Static assets
└── actions/               # Server actions
```

## Environment Variables

- `MONGO_URI`: MongoDB connection string
- `AUTH_GITHUB_ID`: GitHub OAuth client ID
- `AUTH_GITHUB_SECRET`: GitHub OAuth client secret
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `NEXTAUTH_URL`: Base URL for the application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue on GitHub.
