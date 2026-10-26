'use client';

import React, { useState } from 'react';
import {
  Search,
  Bell,
  Menu,
  X,
  CreditCard,
  ChevronDown,
  User,
  Settings,
  LogOut,
  LayoutGrid,
  GitBranch,
  Images,
  FolderKanban,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import Image from 'next/image';

/**
 * Main application header with segmented view switcher (Spatial Canvas vs Studio Grid),
 * command palette trigger, and account status in the premium black & orange theme.
 * Labels collapse to icons below the md breakpoint so the header never overflows.
 */
export default function Navbar({
  credits = 148,
  onOpenGallery,
  onOpenAssets,
  viewMode = 'canvas',
  onToggleViewMode,
  onOpenPalette,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-surface-dark/95 backdrop-blur-md">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-5 h-14 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-2 cursor-pointer select-none shrink-0 min-w-0">
          <div className="w-7 h-7 rounded-btn bg-accent flex items-center justify-center text-white shadow-subtle shrink-0">
            <span className="font-semibold text-xs tracking-tight">F</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-semibold text-sm tracking-tight text-content-primary">FOMI</span>
            <span className="hidden sm:inline text-[10px] font-medium tracking-wide px-1.5 py-0.5 rounded-btn bg-base-subtle text-content-secondary border border-border-subtle">
              Canvas
            </span>
          </div>
        </div>

        {/* Center: Segmented View Switcher — labels collapse to icons on mobile */}
        <div className="flex items-center p-0.5 rounded-card bg-base-subtle border border-border-subtle min-w-0 max-w-full overflow-x-auto scrollbar-hide shrink">
          <button
            type="button"
            onClick={() => onToggleViewMode?.('canvas')}
            aria-pressed={viewMode === 'canvas'}
            aria-label="Spatial Canvas view"
            title="Spatial Canvas"
            className={cn(
              'flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-btn text-xs font-medium whitespace-nowrap transition-all duration-150 ease-premium border',
              viewMode === 'canvas'
                ? 'bg-surface-elevated text-content-primary border-border-subtle shadow-subtle'
                : 'text-content-secondary border-transparent hover:text-content-primary hover:bg-surface-elevated/60'
            )}
          >
            <GitBranch className={cn('w-3.5 h-3.5', viewMode === 'canvas' && 'text-accent')} />
            <span className="hidden md:inline">Spatial Canvas</span>
            <span
              className={cn(
                'text-[9px] px-1 py-0.2 rounded-btn font-mono hidden lg:inline border',
                viewMode === 'canvas'
                  ? 'bg-accent-subtle text-accent border-accent/30'
                  : 'bg-base-muted text-content-secondary border-border-subtle'
              )}
            >
              Tree
            </span>
          </button>

          <button
            type="button"
            onClick={() => onToggleViewMode?.('grid')}
            aria-pressed={viewMode === 'grid'}
            aria-label="Studio Grid view"
            title="Studio Grid"
            className={cn(
              'flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-btn text-xs font-medium whitespace-nowrap transition-all duration-150 ease-premium border',
              viewMode === 'grid'
                ? 'bg-surface-elevated text-content-primary border-border-subtle shadow-subtle'
                : 'text-content-secondary border-transparent hover:text-content-primary hover:bg-surface-elevated/60'
            )}
          >
            <LayoutGrid className={cn('w-3.5 h-3.5', viewMode === 'grid' && 'text-accent')} />
            <span className="hidden md:inline">Studio Grid</span>
          </button>
        </div>

        {/* Right: Actions, Credits & Profile */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Command Palette Trigger (⌘K) */}
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette (⌘K)"
            className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-btn bg-base-subtle hover:bg-base-muted border border-border-subtle text-xs text-content-secondary hover:text-content-primary transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-content-secondary" />
            <span className="font-normal">Search commands</span>
            <kbd className="px-1.5 py-0.5 rounded-[4px] bg-surface-elevated text-[10px] font-mono text-content-secondary border border-border-subtle">
              ⌘K
            </kbd>
          </button>

          {/* Credits indicator: subtle, not a glowing badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-btn bg-base-subtle border border-border-subtle text-xs text-content-secondary font-normal">
            <CreditCard className="w-3.5 h-3.5 text-content-secondary" />
            <span className="font-medium text-content-primary">{credits}</span>
            <span className="text-[11px] text-content-secondary">credits</span>
          </div>

          {/* Quick icon buttons */}
          <button
            type="button"
            onClick={onOpenGallery}
            aria-label="Open inspiration gallery"
            title="Gallery"
            className="p-2 rounded-btn text-content-secondary hover:text-content-primary hover:bg-base-subtle border border-transparent hover:border-border-subtle transition-colors hidden sm:inline-flex min-w-[34px] min-h-[34px] items-center justify-center"
          >
            <Images className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenAssets}
            aria-label="Open project assets"
            title="Project Assets"
            className="p-2 rounded-btn text-content-secondary hover:text-content-primary hover:bg-base-subtle border border-transparent hover:border-border-subtle transition-colors hidden sm:inline-flex min-w-[34px] min-h-[34px] items-center justify-center"
          >
            <FolderKanban className="w-4 h-4" />
          </button>

          {/* Notification bell */}
          <button
            type="button"
            aria-label="View notifications"
            title="Notifications"
            className="relative p-2 rounded-btn text-content-secondary hover:text-content-primary hover:bg-base-subtle border border-transparent hover:border-border-subtle transition-colors min-w-[34px] min-h-[34px] flex items-center justify-center"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent" />
          </button>

          {/* Avatar / Account Dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-label="User profile settings"
              aria-expanded={userDropdownOpen}
              onClick={() => setUserDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 p-1 rounded-btn hover:bg-base-subtle border border-border-subtle transition-colors"
            >
              <div className="w-6 h-6 rounded-btn overflow-hidden bg-base-subtle flex items-center justify-center text-xs font-medium text-content-primary">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Sana Profile"
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown className="w-3 h-3 text-content-secondary hidden sm:block mr-0.5" />
            </button>

            {/* Profile Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-52 rounded-panel bg-surface-elevated border border-border-subtle p-1 shadow-floating z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-border-subtle mb-1">
                  <p className="text-xs font-medium text-content-primary">Sana (Fashion Pro)</p>
                  <p className="text-[11px] text-content-secondary truncate">sana@fomi.art</p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-content-secondary">
                    <span>Balance:</span>
                    <span className="font-medium text-content-primary">{credits} credits</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-btn text-xs text-content-primary hover:bg-base-subtle transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-content-secondary" />
                  <span>Creator Profile</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-btn text-xs text-content-primary hover:bg-base-subtle transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-content-secondary" />
                  <span>Preferences</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-btn text-xs text-danger hover:bg-danger-subtle transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-btn text-content-secondary hover:text-content-primary hover:bg-base-subtle min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile action sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-full border-b border-border-subtle bg-surface-elevated shadow-floating animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-3 space-y-1">
            <div className="flex items-center justify-between px-3 py-2 rounded-btn bg-base-subtle border border-border-subtle text-xs text-content-secondary">
              <span className="flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Credit balance</span>
              </span>
              <span className="font-medium text-content-primary">{credits}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                onOpenPalette?.();
                closeMobileMenu();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-btn text-xs text-content-primary hover:bg-base-subtle transition-colors"
            >
              <Search className="w-4 h-4 text-content-secondary" />
              <span>Search commands</span>
              <kbd className="ml-auto text-[10px] font-mono text-content-secondary">⌘K</kbd>
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenGallery?.();
                closeMobileMenu();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-btn text-xs text-content-primary hover:bg-base-subtle transition-colors"
            >
              <Images className="w-4 h-4 text-content-secondary" />
              <span>Inspiration Gallery</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenAssets?.();
                closeMobileMenu();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-btn text-xs text-content-primary hover:bg-base-subtle transition-colors"
            >
              <FolderKanban className="w-4 h-4 text-content-secondary" />
              <span>Project Assets</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
