import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: string | null }> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error: error.message + '\n' + error.stack };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ background: '#0A0A0F', color: '#EF4444', padding: 40, fontFamily: 'monospace', minHeight: '100vh' }}>
          <h2>RoadGuard AI — Render Error</h2>
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20, color: '#F59E0B', fontSize: 13 }}>{this.state.error}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
