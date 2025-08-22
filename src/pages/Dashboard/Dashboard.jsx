import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const [expenses] = useState([
    { id: 1, category: 'Food & Dining', amount: 245.50, date: '2024-01-15', status: 'completed' },
    { id: 2, category: 'Transportation', amount: 89.20, date: '2024-01-14', status: 'pending' },
    { id: 3, category: 'Shopping', amount: 156.75, date: '2024-01-13', status: 'completed' },
    { id: 4, category: 'Entertainment', amount: 67.30, date: '2024-01-12', status: 'completed' },
    { id: 5, category: 'Utilities', amount: 234.00, date: '2024-01-11', status: 'pending' }
  ]);

  const [cards] = useState([
    { id: 1, name: 'Visa Platinum', number: '**** **** **** 1234', balance: 5240.50, color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', status: 'active' },
    { id: 2, name: 'Mastercard Gold', number: '**** **** **** 5678', balance: 3120.75, color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', status: 'active' },
    { id: 3, name: 'American Express', number: '**** **** **** 9012', balance: 1890.25, color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', status: 'frozen' }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = expenses.filter(expense => expense.status === 'pending');
  const completedExpenses = expenses.filter(expense => expense.status === 'completed');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <Link to="/" className="back-to-home">
            ← Back to Home
          </Link>
          <h1>TrackIt Dashboard</h1>
          <p>Welcome back, {user.name}</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <img src={user.avatar} alt={user.name} className="user-avatar" />
            <span className="user-name">{user.name}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`nav-tab ${activeTab === 'expenses' ? 'active' : ''}`}
          onClick={() => setActiveTab('expenses')}
        >
          Expenses
        </button>
        <button 
          className={`nav-tab ${activeTab === 'cards' ? 'active' : ''}`}
          onClick={() => setActiveTab('cards')}
        >
          Cards
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        <Breadcrumb 
          items={[
            { label: 'Home', link: '/' },
            { label: 'Dashboard', link: '/dashboard' },
            { label: activeTab.charAt(0).toUpperCase() + activeTab.slice(1) }
          ]} 
        />
        
        {activeTab === 'overview' && (
          <div className="overview-section">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h3>Total Balance</h3>
                  <p className="stat-value">{formatCurrency(10251.50)}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>Monthly Expenses</h3>
                  <p className="stat-value">{formatCurrency(totalExpenses)}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <h3>Pending</h3>
                  <p className="stat-value">{pendingExpenses.length}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h3>Completed</h3>
                  <p className="stat-value">{completedExpenses.length}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {expenses.slice(0, 5).map(expense => (
                  <div key={expense.id} className="activity-item">
                    <div className="activity-icon">
                      {expense.status === 'completed' ? '✅' : '⏳'}
                    </div>
                    <div className="activity-content">
                      <h4>{expense.category}</h4>
                      <p>{formatDate(expense.date)}</p>
                    </div>
                    <div className="activity-amount">
                      {formatCurrency(expense.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="expenses-section">
            <div className="section-header">
              <h2>Expense Management</h2>
              <button className="add-expense-btn">+ Add Expense</button>
            </div>
            
            <div className="expenses-list">
              {expenses.map(expense => (
                <div key={expense.id} className="expense-card">
                  <div className="expense-info">
                    <h3>{expense.category}</h3>
                    <p>{formatDate(expense.date)}</p>
                    <span className={`status-badge ${expense.status}`}>
                      {expense.status}
                    </span>
                  </div>
                  <div className="expense-amount">
                    {formatCurrency(expense.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="cards-section">
            <div className="section-header">
              <h2>Card Management</h2>
              <button className="add-card-btn">+ Add Card</button>
            </div>
            
            <div className="cards-grid">
              {cards.map(card => (
                <div key={card.id} className="card-item">
                  <div 
                    className="card-visual"
                    style={{ background: card.color }}
                  >
                    <div className="card-header">
                      <h3>{card.name}</h3>
                      <span className={`card-status ${card.status}`}>
                        {card.status}
                      </span>
                    </div>
                    <div className="card-number">
                      {card.number}
                    </div>
                    <div className="card-balance">
                      Balance: {formatCurrency(card.balance)}
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="action-btn">Freeze</button>
                    <button className="action-btn">Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
