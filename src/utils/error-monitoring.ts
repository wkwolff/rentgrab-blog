// Error monitoring utility
// Can be integrated with Sentry, LogRocket, or other error tracking services

interface ErrorContext {
  url?: string;
  userAgent?: string;
  timestamp?: string;
  extra?: Record<string, any>;
}

class ErrorMonitor {
  private isDevelopment = import.meta.env.DEV;
  private errorQueue: Array<{ error: Error; context: ErrorContext }> = [];
  private maxQueueSize = 10;

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupGlobalErrorHandlers();
    }
  }

  private setupGlobalErrorHandlers() {
    // Handle unhandled errors
    window.addEventListener('error', (event) => {
      this.captureError(event.error || new Error(event.message), {
        url: event.filename,
        extra: {
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError(
        new Error(`Unhandled Promise Rejection: ${event.reason}`),
        {
          extra: {
            reason: event.reason,
            promise: event.promise,
          },
        }
      );
    });
  }

  captureError(error: Error, context?: ErrorContext) {
    const enrichedContext: ErrorContext = {
      ...context,
      url: context?.url || (typeof window !== 'undefined' ? window.location.href : ''),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      timestamp: new Date().toISOString(),
    };

    // In development, log to console
    if (this.isDevelopment) {
      console.error('Error captured:', error, enrichedContext);
      return;
    }

    // Queue error for batch sending
    this.errorQueue.push({ error, context: enrichedContext });

    // Limit queue size
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }

    // Send errors (can be integrated with external service)
    this.sendErrors();
  }

  private async sendErrors() {
    if (this.errorQueue.length === 0) return;

    // TODO: Integrate with error monitoring service
    // Example for Sentry:
    // if (window.Sentry) {
    //   this.errorQueue.forEach(({ error, context }) => {
    //     window.Sentry.captureException(error, {
    //       extra: context,
    //     });
    //   });
    // }

    // For now, just log that we would send errors
    if (!this.isDevelopment) {
      console.log('Would send errors to monitoring service:', this.errorQueue);
    }

    // Clear the queue after sending
    this.errorQueue = [];
  }

  // Performance monitoring
  capturePerformance() {
    if (typeof window === 'undefined' || !window.performance) return;

    const perfData = {
      navigation: performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming,
      resources: performance.getEntriesByType('resource'),
    };

    // Log Core Web Vitals
    if ('web-vital' in window) {
      // This would be integrated with web-vitals library
      console.log('Web Vitals data would be captured here');
    }

    return perfData;
  }

  // Custom event tracking
  trackEvent(eventName: string, properties?: Record<string, any>) {
    const event = {
      name: eventName,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : '',
      },
    };

    if (this.isDevelopment) {
      console.log('Event tracked:', event);
    } else {
      // TODO: Send to analytics service
      console.log('Would send event to analytics:', event);
    }
  }
}

// Create singleton instance
const errorMonitor = new ErrorMonitor();

export default errorMonitor;
export { ErrorMonitor, type ErrorContext };