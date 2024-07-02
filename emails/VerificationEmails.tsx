import React from 'react';

interface VerificationEmailsProp {
  username: string;
  otp: string
}

export const VerificationEmails: React.FC<VerificationEmailsProp> = ({ username, otp }) => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <title>Verification Code</title>
        <h1>Welcome, {username}!</h1>
      </header>
      <section style={styles.content}>
        <p style={styles.message}>
        Thank you for registring. Please use the following verification code to complete your registration:
        </p>
        <p>{otp}</p>
      <h4>If you did not request this code, please ignore this email.</h4>
        <footer style={styles.footer}>
          <p style={styles.footerText}>Best regards,</p>
          <p style={styles.footerText}>TalkDev</p>
        </footer>
      </section>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f2f2f2',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  content: {
    fontSize: '16px',
    color: '#333',
  },
  message: {
    marginBottom: '15px',
  },
  list: {
    paddingLeft: '20px',
    marginBottom: '15px',
  },
  footer: {
    marginTop: '20px',
    borderTop: '1px solid #ccc',
    paddingTop: '10px',
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
  },
  footerText: {
    margin: '5px 0',
  },
};

