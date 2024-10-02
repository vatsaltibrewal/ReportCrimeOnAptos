// src/CrimeReportApp.js
import React, { useState, useEffect } from 'react';
import { Aptos } from '@aptos-labs/ts-sdk';
import './App.css'

const aa = new Aptos();

const CONTRACT_ADDRESS = "0f38bcadcc3760f984853fd21675cbd9bbaba0c3cb74ece3574719357b964616"; // Replace with the actual contract address

function CrimeReportApp() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [crimeType, setCrimeType] = useState('');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [reports, setReports] = useState([]);

  // Connect to Petra Wallet
  const connectWallet = async () => {
    if ('aptos' in window) {
      try {
        const account = await window.aptos.connect();
        setAccount(account);
        setWalletConnected(true);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    } else {
      console.error('Petra Wallet not found!');
    }
  };

  // Report a crime function
  const reportCrime = async () => {
    if (!account) {
      console.error("Wallet not connected!");
      return;
    }

    const payload = {
      type: "entry_function_payload",
      function: `${CONTRACT_ADDRESS}::report::report_crime`,
      type_arguments: [],
      arguments: [crimeType, location, severity, message],
    };

    try {
      const txnRequest = await window.aptos.signAndSubmitTransaction(payload);

      console.log('Crime reported, Transaction Hash:', txnRequest.hash);
      fetchReports(); // Refresh reports after a new crime is reported
    } catch (error) {
      console.error("Failed to report crime:", error);
    }
  };

  // Fetch all reports from the blockchain
  const fetchReports = async () => {
    try {
      const resource = await aa.getAccountResources({
        accountAddress:`${CONTRACT_ADDRESS}`,
        resourceType:`${CONTRACT_ADDRESS}::report::ReportList`
    }
      );
      console.log('Fetched Reports:', resource[1]);
      setReports(resource[1].data.reports);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    }
  };
  

  useEffect(() => {
    if (walletConnected) {
      fetchReports();
    }
  }, [walletConnected]);

  return (
    <div>
      <h1>Crime Reporting DApp</h1>
      {!walletConnected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected Account: {account.address}</p>
          <div>
            <h2>Report a Crime</h2>
            <input value={crimeType} onChange={(e) => setCrimeType(e.target.value)} placeholder="Crime Type" />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
            <input value={severity} onChange={(e) => setSeverity(e.target.value)} placeholder="Severity" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
            <button onClick={reportCrime}>Submit Report</button>
          </div>

          <div>
            <h2>Reported Crimes</h2>
            {reports.length > 0 ? (
              <ul>
                {reports.map((report, index) => (
                  <li key={index}>
                    <p><strong>Crime Type:</strong> {report.crime_type}</p>
                    <p><strong>Location:</strong> {report.location}</p>
                    <p><strong>Severity:</strong> {report.severity}</p>
                    <p><strong>Message:</strong> {report.message}</p>
                    <p><strong>Reported By:</strong> {report.from}</p>
                    <p><strong>Solved:</strong> {report.solved ? "Yes" : "No"}</p>
                    <hr />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reports found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CrimeReportApp;
