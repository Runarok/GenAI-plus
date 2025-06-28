module.exports = {
  content: ["./pages/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#11d0ba", // teal-400
        secondary: "#0891b2", // cyan-600
        accent: "#06b6d4", // cyan-500
        background: "#0f172a", // slate-900
        surface: "#1e293b", // slate-800
        "text-primary": "#f8fafc", // slate-50
        "text-secondary": "#94a3b8", // slate-400
        success: "#10b981", // emerald-500
        warning: "#f59e0b", // amber-500
        error: "#ef4444", // red-500
        glass: {
          border: "rgba(148, 163, 184, 0.2)",
          overlay: "rgba(30, 41, 59, 0.1)",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      backdropBlur: {
        glass: '10px',
      },
      boxShadow: {
        floating: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        surface: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        fast: '150ms',
        smooth: '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      scale: {
        '98': '0.98',
        '102': '1.02',
      },
      spacing: {
        'touch': '44px',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [],
}