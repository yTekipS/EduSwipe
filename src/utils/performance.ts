// Performance monitoring utility
export const reportMetric = (name: string, duration: number) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
  }
};

export const measurePerformance = (name: string, fn: () => any) => {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;
  reportMetric(name, duration);
  return result;
};

// Report Web Vitals
export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 ${metric.name}: ${metric.value}`);
  }
};

// Optimize lighthouse score
export const initializePerformanceObserver = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 3000) {
            console.warn(`⚠️ Long task detected: ${entry.name} (${entry.duration.toFixed(0)}ms)`);
          }
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Performance observer not supported
    }
  }
};
