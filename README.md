# Decentralized Crime Reporting DApp

### A decentralized platform built on the Aptos blockchain to securely and anonymously report crimes using a blockchain-based system. This DApp ensures the integrity, immutability, and transparency of reports submitted by users, while also protecting user identities.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Smart Contract Details](#smart-contract-details)
- [Security](#security)
- [Contact Information](#contact-information)
- [License](#license)

## Overview
The **Decentralized Crime Reporting DApp** aims to provide a secure and anonymous platform for users to report criminal activities without fear of retaliation. This DApp leverages the Aptos blockchain to ensure the integrity and confidentiality of each report. All reports are encrypted and stored on the blockchain, ensuring they cannot be tampered with or deleted.

## Features
- **Decentralized Reporting**: Crime reports are submitted directly to the Aptos blockchain.
- **Immutability**: Once a report is submitted, it cannot be altered or deleted.
- **Anonymity**: Users can report crimes without revealing their identity.
- **User-Friendly Interface**: Easy-to-use interface built with React.
- **Report Status**: Users can track the status of their reports.
- **Transparent & Secure**: Built on Aptos, ensuring security and transparency.

## Technology Stack
- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Node.js
- **Blockchain**: Aptos Blockchain (Move contracts)
- **Wallet Integration**: Martian Wallet or Petra Wallet
- **Database**: Blockchain for immutable data storage
- **Smart Contracts**: Aptos Move contracts
- **Libraries/Tools**:
  - `@aptos-labs/aptos-wallet-adapter` for wallet integration
  - `@aptos-labs/aptos` for blockchain interaction
  - `React` for the user interface

## Installation

### Prerequisites
- Node.js (v16 or above)
- npm or yarn
- Martian or Petra Wallet installed in your browser

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/vatsaltibrewal/ReportCrimeOnAptos.git
   cd ReportCrimeOnAptos
   cd Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   Or, if you're using yarn:
   ```bash
   yarn install
   ```

3. **Start the application**:
   ```bash
   npm start
   ```

   Or, if you're using yarn:
   ```bash
   yarn start
   ```

4. Open your browser and visit `http://localhost:3000` to use the DApp.

### Smart Contract Deployment
The smart contracts for this DApp are written in Move and are deployed on the Aptos blockchain. To deploy the contracts, follow the steps below:

1. Install the Aptos CLI: [Aptos CLI Installation Guide](https://aptos.dev/cli-tools/aptos-cli-tool/install-cli)
2. Deploy the Move contracts:
   ```bash
   aptos move publish --package-dir path/to/your/move/package --profile testnet
   ```

3. Update the contract addresses in your frontend config file (if required).

## Usage
1. **Connect your wallet**: Use Martian or Petra Wallet to connect your Aptos account.
2. **Submit a report**: Enter the details of the crime, including date, location, and description, and click "Submit Report." Your report will be submitted to the blockchain.
3. **Track report**: Use your report ID to track the status of your report.

### Wallet Setup
Ensure that you have Aptos tokens in your connected wallet for transaction fees.

## Smart Contract Details
The Move smart contracts deployed on the Aptos blockchain are responsible for:
- Storing reports in an immutable way.
- Encrypting sensitive data before saving it to the blockchain.
- Tracking the status of submitted reports.

### Functions in the Smart Contract:
1. **Submit Report**: Allows users to submit crime reports.
2. **Get Report**: Retrieves details of a crime report by its ID.
3. **Update Status**: Admin-only function to update the status of a report.

## Security
- **Anonymity**: User identities are not recorded in any form during the submission of reports.
- **Encryption**: Sensitive data is encrypted before being sent to the blockchain, ensuring privacy.
- **Auditability**: All reports are immutable and cannot be altered once submitted.
- **Wallet Security**: Users must connect through a secure, compatible wallet (e.g., Martian or Petra) to ensure the security of their accounts.

## Contact Information
If you have any questions, suggestions, or need help, feel free to contact us:

- **Developer**: Vatsal Tibrewal
- **X**: [@_Vattyy](https://x.com/_Vattyy)
- **LinkedIn**: [Vatsal Tibrewal](https://linkedin.com/in/vatsaltibrewal)

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

