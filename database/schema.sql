CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(10) NOT NULL CHECK (type IN ('deposit', 'withdraw')),
  amount DECIMAL(20, 7) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  provider VARCHAR(20) NOT NULL,
  stellar_address VARCHAR(56) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_stellar_address ON transactions(stellar_address);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
