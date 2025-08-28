import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { StudioThemeProvider } from './StudioThemeProvider';
import { StudioHeader } from './StudioHeader';
import { SidebarPanel } from './panels/SidebarPanel';
import { EditorPanel } from './panels/EditorPanel';
import { PreviewPanelContainer } from './panels/PreviewPanelContainer';
import { DetachedPreview } from './components/DetachedPreview';
import { useStudioState } from '@/hooks/useStudioState';
import { useResizablePanels } from '@/hooks/useResizablePanels';

interface PostStudioLayoutProps {
  children?: React.ReactNode;
}

export const PostStudioLayout: React.FC<PostStudioLayoutProps> = ({ children }) => {
  const { state, updateState, togglePanel, togglePreview } = useStudioState();
  const { 
    panelSizes, 
    panelState, 
    togglePanel: togglePanelResize, 
    toggleFullscreen, 
    togglePreviewDetached,
    handlePanelResize,
    getResponsivePanelConfig 
  } = useResizablePanels();

  const responsiveConfig = getResponsivePanelConfig();

  const handleToggleFullscreen = () => {
    toggleFullscreen();
    togglePanel('fullscreen');
  };

  const handleTogglePreviewDetached = () => {
    togglePreviewDetached();
    togglePreview('detach');
  };

  const handleViewChange = (view: 'studio' | 'history') => {
    updateState({ currentView: view });
  };

  const handleToggleTheme = () => {
    updateState({ darkMode: !state.darkMode });
  };

  return (
    <StudioThemeProvider initialTheme={{ isDark: state.darkMode }}>
      <div className={`h-full min-h-screen flex flex-col bg-gradient-subtle transition-all duration-300 ${state.isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
        {/* Studio Header */}
        <StudioHeader
          state={state}
          onViewChange={handleViewChange}
          onToggleFullscreen={handleToggleFullscreen}
          onToggleTheme={handleToggleTheme}
        />

        {/* Main Content Area */}
        <div className={`container mx-auto px-4 py-6 flex-1 flex flex-col ${state.isFullscreen ? 'p-4' : ''}`}>
          <ResizablePanelGroup 
            direction="horizontal" 
            className="h-full min-h-[calc(100vh-12rem)] rounded-lg border border-border shadow-elegant overflow-hidden"
            onLayout={handlePanelResize}
          >
            {/* Left Panel - Sidebar */}
            <ResizablePanel 
              defaultSize={responsiveConfig.defaultSizes[0]} 
              minSize={responsiveConfig.minSizes[0]}
              maxSize={40}
              collapsible={responsiveConfig.collapsible[0]}
              collapsedSize={0}
              onCollapse={() => togglePanelResize('left')}
              onExpand={() => togglePanelResize('left')}
              className="bg-card transition-all duration-300"
            >
              <SidebarPanel
                state={state}
                updateState={updateState}
                isCollapsed={panelState.isLeftCollapsed}
                onToggleCollapse={() => togglePanelResize('left')}
              />
            </ResizablePanel>
            
            {/* Resizable Handle */}
            {!panelState.isLeftCollapsed && (
              <ResizableHandle 
                withHandle 
                className="hover:bg-primary/20 transition-colors duration-200" 
              />
            )}
            
            {/* Center Panel - Editor */}
            <ResizablePanel 
              defaultSize={responsiveConfig.defaultSizes[1]} 
              minSize={responsiveConfig.minSizes[1]}
              className="bg-card transition-all duration-300"
            >
              <EditorPanel
                state={state}
                updateState={updateState}
                onTogglePreviewDetached={handleTogglePreviewDetached}
              />
            </ResizablePanel>
            
            {/* Right Panel - Preview (only if not detached) */}
            {!state.isPreviewDetached && (
              <>
                <ResizableHandle 
                  withHandle 
                  className="hover:bg-primary/20 transition-colors duration-200" 
                />
                
                <ResizablePanel 
                  defaultSize={responsiveConfig.defaultSizes[2]} 
                  minSize={responsiveConfig.minSizes[2]}
                  maxSize={40}
                  collapsible={responsiveConfig.collapsible[2]}
                  collapsedSize={0}
                  onCollapse={() => togglePanelResize('right')}
                  onExpand={() => togglePanelResize('right')}
                  className="bg-card transition-all duration-300"
                >
                  <PreviewPanelContainer
                    state={state}
                    updateState={updateState}
                    isCollapsed={panelState.isRightCollapsed}
                    onToggleCollapse={() => togglePanelResize('right')}
                    onToggleDetached={handleTogglePreviewDetached}
                  />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>

        {/* Detached Preview Window */}
        {state.isPreviewDetached && (
          <DetachedPreview
            state={state}
            updateState={updateState}
            onClose={handleTogglePreviewDetached}
          />
        )}

        {/* Custom children (for additional overlays, modals, etc.) */}
        {children}
      </div>
    </StudioThemeProvider>
  );
};