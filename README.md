![alt text](https://github.com/hitanshchadha/Cryptogenix-main/blob/main/src/assets/cryptogenix-high-resolution-logo-transparent.png?raw=true)

## Overview
### Cryptogenix is a complete crypto portfolio management web app designed to streamline the process of managing and monitoring various cryptocurrencies and ERC20 Tokens. Users can connect their Metamask wallets, view token balances, track their transaction history, track historical data, manage smart contract allowances, and transfer tokens securely. The app is intuitive and user-friendly, ensuring that beginners and experts benefit from its features.
## Features
### 1. Wallet Connection 
Cryptogenix allows users to securely connect their crypto wallets to the platform for real-time portfolio monitoring. Supported wallets include Metamask and support for other Web3-compatible wallets coming soon.
### 2. Watch List
Users can personalize their experience by creating a watch list of tokens. This feature allows for easy tracking of preferred tokens and includes:
* Add Tokens: Users can add multiple tokens by entering their contract addresses.
* Token Balances: Display the current balance of each token in the watch list for quick access.
### 3. Transaction History
* Detailed Transaction Records: Cryptogenix provides a comprehensive record of all transactions related to the user's wallet, including date, time, sender, recipient, amount, and transaction hash.
### 4. Historical Balances
* Comprehensive Analysis: Users can access detailed historical balance data for each token in their portfolio based on the date, enabling them to analyze past trends and make informed decisions.
* Visualizations: The application offers visualization options, like bar charts, to help users better understand historical data.
### 5. Token Allowance
* Smart Contract Interactions: Users can easily check their token allowance for different smart contracts, ensuring they have sufficient funds for transactions and interactions.
### 6.Token Transfer
* Secure and Efficient Transfers: Users can safely and efficiently transfer tokens to other addresses using the built-in transfer functionality.
### 7. Multi-Chain Compatibility
Cryptogenix supports multiple blockchain networks, enabling users to manage tokens across different chains seamlessly:
* Multiple Chain Support: Users can view and manage tokens on popular blockchain networks like Ethereum, Binance Smart Chain (BSC), Polygon, and more.
* Cross-Chain Management: Easily switch between different chains within the app to manage various token holdings without the need to switch platforms or wallets.
### 8. Market Insights
Cryptogenix provides users with real-time market data, enabling informed decision-making:
* Top ERC-20 Tokens: View the top ERC-20 tokens by market cap, trading volume, and other relevant data.
* Top Cryptocurrencies: Stay updated with the top cryptocurrencies, including Bitcoin, Ethereum, and others, along with key metrics like current prices, 24-hour changes, and market trends.
* Price Data: Get real-time price updates for tokens and cryptocurrencies directly within the app
# Tech Stack
### Frontend: 
* Next.js: Used as the frontend framework for building dynamic and static pages, ensuring a fast and optimized user experience.
* Tailwind CSS: Employed for styling, offering a utility-first framework to create a clean and visually appealing UI with minimal custom CSS.
### Blockchain
* MetaMask Integration: Cryptogenix supports MetaMask, allowing users to connect their wallets, manage their tokens, and interact with the blockchain securely and directly from the app.
* Web3.js: Integrated for handling token transfers, fetching token balances, and managing allowances, ensuring seamless interaction with the blockchain.
* Moralis Web3 SDK: Used to fetch past transaction history, providing users with detailed insights into their previous transactions.
# Getting Started
## Prerequisites
Before you begin, ensure you have the following installed on your machine:
* Node.js (v14 or higher)
* A code editor (e.g., Visual Studio Code)
* MetaMask extension installed in your browser
## Installation
### 1. Clone the Repository
Open your terminal and run the following command to clone the repository:
```
git clone https://github.com/hitanshchadha/Cryptogenix-main.git
```
### 2. Install Dependencies
Run the following command to install the required packages:
```
npm install
```
### 3. Set Up Moralis Web3 SDK
* Create a Moralis account at Moralis.io.
* Create a new app and note down your API KEY.
* Create a .env.local file in the root of the project and add the following:
```
NEXT_PUBLIC_MORALIS_API_KEY=your API KEY
```
### 4. Running the Application
To start the development server, run:
```
npm run dev
```
Note: Cryptogenix is currenty in its Beta Version which has been thoroughly tested and developed on the Sepolia and Linea Sepolia Testnets. While support for other popular chains is included, not all features may function as intended on those networks.

## Working Demos:
* [Demo Video](https://drive.google.com/file/d/1H0jSl8HiTNrnVrL-yXDl_OKr8malZ_0K/view?usp=sharing)
* [Website Deployment](https://cryptogenix-main.vercel.app/)







