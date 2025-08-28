import { useState, useCallback, useEffect } from 'react';

interface PanelSizes {
  left: number;
  center: number;
  right: number;
}

interface PanelState {
  isLeftCollapsed: boolean;
  isRightCollapsed: boolean;
  isFullscreen: boolean;
  isPreviewDetached: boolean;
}

export const useResizablePanels = () => {
  const [panelSizes, setPanelSizes] = useState<PanelSizes>({
    left: 25,
    center: 50,
    right: 25,
  });

  const [panelState, setPanelState] = useState<PanelState>({
    isLeftCollapsed: false,
    isRightCollapsed: false,
    isFullscreen: false,
    isPreviewDetached: false,
  });

  // Save panel sizes to localStorage
  const savePanelSizes = useCallback((sizes: PanelSizes) => {
    localStorage.setItem('studio-panel-sizes', JSON.stringify(sizes));
  }, []);

  // Load panel sizes from localStorage
  const loadPanelSizes = useCallback(() => {
    const saved = localStorage.getItem('studio-panel-sizes');
    if (saved) {
      try {
        const sizes = JSON.parse(saved);
        setPanelSizes(sizes);
      } catch (error) {
        console.warn('Failed to load panel sizes:', error);
      }
    }
  }, []);

  // Update panel sizes
  const updatePanelSizes = useCallback((newSizes: Partial<PanelSizes>) => {
    setPanelSizes(prev => {
      const updated = { ...prev, ...newSizes };
      savePanelSizes(updated);
      return updated;
    });
  }, [savePanelSizes]);

  // Toggle panel collapse state
  const togglePanel = useCallback((panel: 'left' | 'right') => {
    setPanelState(prev => {
      const newState = { ...prev };
      
      if (panel === 'left') {
        newState.isLeftCollapsed = !prev.isLeftCollapsed;
        
        // Adjust center panel size when left panel is toggled
        if (newState.isLeftCollapsed) {
          updatePanelSizes({
            left: 0,
            center: prev.isRightCollapsed || newState.isPreviewDetached ? 100 : 75,
          });
        } else {
          updatePanelSizes({
            left: 25,
            center: prev.isRightCollapsed || newState.isPreviewDetached ? 75 : 50,
          });
        }
      } else {
        newState.isRightCollapsed = !prev.isRightCollapsed;
        
        // Adjust center panel size when right panel is toggled
        if (newState.isRightCollapsed || newState.isPreviewDetached) {
          updatePanelSizes({
            center: prev.isLeftCollapsed ? 100 : 75,
            right: 0,
          });
        } else {
          updatePanelSizes({
            center: prev.isLeftCollapsed ? 75 : 50,
            right: 25,
          });
        }
      }
      
      return newState;
    });
  }, [updatePanelSizes]);

  // Toggle fullscreen mode
  const toggleFullscreen = useCallback(() => {
    setPanelState(prev => ({
      ...prev,
      isFullscreen: !prev.isFullscreen,
    }));
  }, []);

  // Toggle preview detached state
  const togglePreviewDetached = useCallback(() => {
    setPanelState(prev => {
      const newState = {
        ...prev,
        isPreviewDetached: !prev.isPreviewDetached,
      };
      
      // Adjust panel sizes when preview is detached/attached
      if (newState.isPreviewDetached) {
        updatePanelSizes({
          center: prev.isLeftCollapsed ? 100 : 75,
          right: 0,
        });
      } else {
        updatePanelSizes({
          center: prev.isLeftCollapsed ? 75 : 50,
          right: 25,
        });
      }
      
      return newState;
    });
  }, [updatePanelSizes]);

  // Handle panel resize
  const handlePanelResize = useCallback((sizes: number[]) => {
    const [left, center, right] = sizes;
    updatePanelSizes({ left, center, right });
  }, [updatePanelSizes]);

  // Get responsive panel configuration
  const getResponsivePanelConfig = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    
    if (isMobile) {
      return {
        defaultSizes: [0, 100, 0],
        minSizes: [0, 100, 0],
        collapsible: [true, false, true],
      };
    }
    
    if (isTablet) {
      return {
        defaultSizes: [0, panelState.isPreviewDetached ? 100 : 70, panelState.isPreviewDetached ? 0 : 30],
        minSizes: [0, 50, 20],
        collapsible: [true, false, true],
      };
    }
    
    return {
      defaultSizes: [
        panelState.isLeftCollapsed ? 0 : panelSizes.left,
        panelSizes.center,
        panelState.isRightCollapsed || panelState.isPreviewDetached ? 0 : panelSizes.right,
      ],
      minSizes: [15, 30, 15],
      collapsible: [true, false, true],
    };
  }, [panelSizes, panelState]);

  // Load saved sizes on mount
  useEffect(() => {
    loadPanelSizes();
  }, [loadPanelSizes]);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const config = getResponsivePanelConfig();
      updatePanelSizes({
        left: config.defaultSizes[0],
        center: config.defaultSizes[1],
        right: config.defaultSizes[2],
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getResponsivePanelConfig, updatePanelSizes]);

  return {
    panelSizes,
    panelState,
    updatePanelSizes,
    togglePanel,
    toggleFullscreen,
    togglePreviewDetached,
    handlePanelResize,
    getResponsivePanelConfig,
  };
};