"use client";
import { Component, ReactNode } from "react";

interface Props {
    children: ReactNode;
    FallbackComponent: React.ComponentType<{ error: Error; reset: () => void }>;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public reset = () => {
        this.setState({ hasError: false, error: undefined });
    };

    public render() {
        if (this.state.hasError && this.state.error) {
            const Fallback = this.props.FallbackComponent;
            return <Fallback error={this.state.error} reset={this.reset} />;
        }

        return this.props.children;
    }
} 