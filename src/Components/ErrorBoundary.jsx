// src/components/ErrorBoundary.jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ERROR BOUNDARY CAUGHT:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center bg-red-50 border border-red-300 rounded-xl m-4">
          <h2 className="text-2xl font-bold text-red-700 mb-4">
            Oops! Something went wrong
          </h2>
          <pre className="text-left bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
            {this.state.error?.message}
          </pre>
          <p className="text-sm text-gray-600 mt-4">
            {this.state.errorInfo?.componentStack}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
