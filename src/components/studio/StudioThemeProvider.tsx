import React, { createContext, useContext, useEffect, useState } from 'react';

interface StudioTheme {
  isDark: boolean;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  foregroundColor: string;
  borderColor: string;
  mutedColor: string;
}

interface StudioThemeContextType {
  theme: StudioTheme;
  toggleTheme: () => void;
  setTheme: (theme: Partial<StudioTheme>) => void;
}

const defaultTheme: StudioTheme = {
  isDark: true,
  primaryColor: 'rgb(30 30 30)',
  secondaryColor: 'rgb(255 215 0)',
  accentColor: 'rgb(255 193 7)',
  backgroundColor: 'rgb(18 18 18)',
  foregroundColor: 'rgb(245 245 245)',
  borderColor: 'rgb(64 64 64)',
  mutedColor: 'rgb(45 45 45)',
};

const StudioThemeContext = createContext<StudioThemeContextType | undefined>(undefined);

export const useStudioTheme = () => {
  const context = useContext(StudioThemeContext);
  if (!context) {
    throw new Error('useStudioTheme must be used within a StudioThemeProvider');
  }
  return context;
};

interface StudioThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Partial<StudioTheme>;
}

export const StudioThemeProvider: React.FC<StudioThemeProviderProps> = ({ 
  children, 
  initialTheme = {} 
}) => {
  const [theme, setThemeState] = useState<StudioTheme>({
    ...defaultTheme,
    ...initialTheme,
  });

  const toggleTheme = () => {
    setThemeState(prev => ({
      ...prev,
      isDark: !prev.isDark,
      backgroundColor: prev.isDark ? 'rgb(255 255 255)' : 'rgb(18 18 18)',
      foregroundColor: prev.isDark ? 'rgb(18 18 18)' : 'rgb(245 245 245)',
      primaryColor: prev.isDark ? 'rgb(245 245 245)' : 'rgb(30 30 30)',
      borderColor: prev.isDark ? 'rgb(226 232 240)' : 'rgb(64 64 64)',
      mutedColor: prev.isDark ? 'rgb(248 250 252)' : 'rgb(45 45 45)',
    }));
  };

  const setTheme = (newTheme: Partial<StudioTheme>) => {
    setThemeState(prev => ({ ...prev, ...newTheme }));
  };

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    
    // Convert RGB values to individual components for CSS variables
    const rgbToComponents = (rgb: string) => {
      const match = rgb.match(/rgb\((\d+)\s+(\d+)\s+(\d+)\)/);
      return match ? `${match[1]} ${match[2]} ${match[3]}` : '0 0 0';
    };

    root.style.setProperty('--studio-background', rgbToComponents(theme.backgroundColor));
    root.style.setProperty('--studio-foreground', rgbToComponents(theme.foregroundColor));
    root.style.setProperty('--studio-primary', rgbToComponents(theme.primaryColor));
    root.style.setProperty('--studio-secondary', rgbToComponents(theme.secondaryColor));
    root.style.setProperty('--studio-accent', rgbToComponents(theme.accentColor));
    root.style.setProperty('--studio-border', rgbToComponents(theme.borderColor));
    root.style.setProperty('--studio-muted', rgbToComponents(theme.mutedColor));

    // Apply dark/light class to body
    if (theme.isDark) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <StudioThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div 
        className={`studio-theme ${theme.isDark ? 'dark' : 'light'}`}
        style={{
          '--studio-bg': theme.backgroundColor,
          '--studio-fg': theme.foregroundColor,
          '--studio-primary': theme.primaryColor,
          '--studio-secondary': theme.secondaryColor,
          '--studio-accent': theme.accentColor,
          '--studio-border': theme.borderColor,
          '--studio-muted': theme.mutedColor,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </StudioThemeContext.Provider>
  );
};

// Theme utility classes
export const studioThemeClasses = {
  background: 'bg-[rgb(var(--studio-background))]',
  foreground: 'text-[rgb(var(--studio-foreground))]',
  primary: 'bg-[rgb(var(--studio-primary))] text-[rgb(var(--studio-foreground))]',
  secondary: 'bg-[rgb(var(--studio-secondary))] text-[rgb(var(--studio-background))]',
  accent: 'bg-[rgb(var(--studio-accent))] text-[rgb(var(--studio-background))]',
  border: 'border-[rgb(var(--studio-border))]',
  muted: 'bg-[rgb(var(--studio-muted))] text-[rgb(var(--studio-foreground))]',
  card: 'bg-card border-border',
  hover: 'hover:bg-[rgb(var(--studio-muted))] transition-colors duration-200',
  focus: 'focus:ring-2 focus:ring-[rgb(var(--studio-secondary))] focus:ring-offset-2',
  gradient: 'bg-gradient-primary',
  shadow: 'shadow-elegant',
  interactive: 'transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5',
};