import React, { Component, ErrorInfo } from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error: ", error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="eb-wrapper">
          <div className="eb-block">
            <p>
              Something went wrong, try refreshing the page. If it doesn't help,
              let us know.
            </p>
            <a href="/">Home</a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
