"use client";

import { useSyncExternalStore } from "react";

export type StageId =
  | "hero"
  | "about"
  | "projects"
  | "stack"
  | "terminal"
  | "writing"
  | "contact";

export type AppId =
  | "about"
  | "projects"
  | "stack"
  | "terminal"
  | "writing"
  | "contact";

export type CameraPreset = "overview" | "screen" | "hardware" | "blueprint";

export type WindowState = {
  id: AppId;
  title: string;
  subtitle: string;
  code: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  defaultPos: { x: number; y: number };
};

export type SoundEffectType =
  | "click"
  | "plug"
  | "unplug"
  | "window-open"
  | "window-close"
  | "switch"
  | "cartridge";

const INITIAL_WINDOWS: Record<AppId, WindowState> = {
  about: {
    id: "about",
    title: "About.app",
    subtitle: "Biography & Engineering Philosophy",
    code: "APP // 01",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    defaultPos: { x: 80, y: 68 },
  },
  projects: {
    id: "projects",
    title: "Projects.app",
    subtitle: "The Workbench — Case Studies & Archive",
    code: "APP // 02",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 25,
    defaultPos: { x: 130, y: 76 },
  },
  stack: {
    id: "stack",
    title: "Stack.app",
    subtitle: "The Workshop — Hardware & Protocol Modules",
    code: "APP // 03",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 21,
    defaultPos: { x: 170, y: 88 },
  },
  terminal: {
    id: "terminal",
    title: "Terminal.app",
    subtitle: "Interactive Shell & Protocol Simulators",
    code: "APP // 04",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 22,
    defaultPos: { x: 210, y: 96 },
  },
  writing: {
    id: "writing",
    title: "Writing.app",
    subtitle: "Field Notes & Technical Publications",
    code: "APP // 05",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 23,
    defaultPos: { x: 240, y: 108 },
  },
  contact: {
    id: "contact",
    title: "Contact.app",
    subtitle: "Direct Dispatch & Verified Channels",
    code: "APP // 06",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 24,
    defaultPos: { x: 280, y: 118 },
  },
};

export interface WorkspaceSnapshot {
  activeStage: StageId;
  stageIndex: number;
  scrollProgress: number;
  workspaceMode: "editorial" | "desktop";
  cableConnected: boolean;
  laptopOpen: boolean;
  studioLampOn: boolean;
  activeCartridgeId: "preflight" | "betta-pay" | "verivault";
  cameraPreset: CameraPreset;
  hoveredArtefact: string | null;
  soundEnabled: boolean;
  windows: Record<AppId, WindowState>;
  focusedAppId: AppId | null;
  selectedProjectId: string;
  selectedClusterId: string;
  selectedToolId: string;
  topZIndex: number;
}

export const STAGE_ORDER: StageId[] = [
  "hero",
  "about",
  "projects",
  "stack",
  "terminal",
  "writing",
  "contact",
];

// Mutable high-frequency 3D motion state read inside useFrame
export const sceneState = {
  scrollProgress: 0,
  stageIndex: 0,
  pointerX: 0,
  pointerY: 0,
  workstationRotationY: 0,
  workstationRotationX: 0,
  dragVelocity: 0,
  zkModuleOffset: { x: 0, z: 0 },
  cablePlugOffset: { x: 0, y: 0, z: 0 },
};

let snapshot: WorkspaceSnapshot = {
  activeStage: "hero",
  stageIndex: 0,
  scrollProgress: 0,
  workspaceMode: "editorial",
  cableConnected: true,
  laptopOpen: true,
  studioLampOn: true,
  activeCartridgeId: "preflight",
  cameraPreset: "overview",
  hoveredArtefact: null,
  soundEnabled: false, // Disabled by default per spec
  windows: INITIAL_WINDOWS,
  focusedAppId: null,
  selectedProjectId: "preflight",
  selectedClusterId: "protocol",
  selectedToolId: "solidity",
  topZIndex: 30,
};

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

let audioCtx: AudioContext | null = null;

export function playTactileSound(type: SoundEffectType) {
  if (!snapshot.soundEnabled || typeof window === "undefined") return;
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === "click" || type === "switch") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(type === "switch" ? 280 : 420, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.035);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === "plug" || type === "cartridge") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.075);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.085);
    } else if (type === "unplug") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.08);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === "window-open") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(310, now);
      osc.frequency.exponentialRampToValueAtTime(460, now + 0.06);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);
      osc.start(now);
      osc.stop(now + 0.07);
    } else if (type === "window-close") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(190, now + 0.05);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
      osc.start(now);
      osc.stop(now + 0.06);
    }
  } catch {
    // Ignore audio context restrictions
  }
}

export function setActiveStage(stage: StageId) {
  const idx = STAGE_ORDER.indexOf(stage);
  const nextIndex = idx === -1 ? 0 : idx;
  sceneState.stageIndex = nextIndex;
  if (snapshot.activeStage === stage && snapshot.stageIndex === nextIndex) return;
  snapshot = {
    ...snapshot,
    activeStage: stage,
    stageIndex: nextIndex,
  };
  emit();
}

export function setScrollProgress(progress: number) {
  sceneState.scrollProgress = progress;
}

export function pulseScene(impulse = 0.35) {
  sceneState.dragVelocity += impulse;
}

export function rotateWorkstationBy(deltaY: number, deltaX = 0) {
  sceneState.workstationRotationY += deltaY;
  sceneState.workstationRotationX = Math.max(
    -0.35,
    Math.min(0.45, sceneState.workstationRotationX + deltaX),
  );
}

export function resetWorkstationTransform() {
  sceneState.workstationRotationY = 0;
  sceneState.workstationRotationX = 0;
  sceneState.zkModuleOffset = { x: 0, z: 0 };
  snapshot = {
    ...snapshot,
    cameraPreset: "overview",
  };
  playTactileSound("switch");
  emit();
}

export function setWorkspaceMode(mode: "editorial" | "desktop") {
  if (snapshot.workspaceMode === mode) return;
  let nextWindows = snapshot.windows;
  let nextFocused = snapshot.focusedAppId;
  let nextZ = snapshot.topZIndex;

  // When entering Desktop OS mode, ensure Projects.app and About.app or Terminal.app are open if none are open
  if (mode === "desktop") {
    const anyOpen = Object.values(snapshot.windows).some((w) => w.isOpen && !w.isMinimized);
    if (!anyOpen) {
      nextZ += 2;
      nextWindows = {
        ...snapshot.windows,
        about: {
          ...snapshot.windows.about,
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ - 1,
        },
        projects: {
          ...snapshot.windows.projects,
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      };
      nextFocused = "projects";
    }
  }

  snapshot = {
    ...snapshot,
    workspaceMode: mode,
    windows: nextWindows,
    focusedAppId: nextFocused,
    topZIndex: nextZ,
  };
  playTactileSound("switch");
  emit();
}

export function toggleCableConnection(forceState?: boolean) {
  const next = forceState ?? !snapshot.cableConnected;
  snapshot = {
    ...snapshot,
    cableConnected: next,
  };
  playTactileSound(next ? "plug" : "unplug");
  pulseScene(next ? 0.45 : -0.3);
  emit();
}

export function toggleLaptopLid(forceState?: boolean) {
  const next = forceState ?? !snapshot.laptopOpen;
  snapshot = {
    ...snapshot,
    laptopOpen: next,
  };
  playTactileSound("switch");
  emit();
}

export function toggleStudioLamp(forceState?: boolean) {
  const next = forceState ?? !snapshot.studioLampOn;
  snapshot = {
    ...snapshot,
    studioLampOn: next,
  };
  playTactileSound("switch");
  emit();
}

export function setActiveCartridge(id: "preflight" | "betta-pay" | "verivault") {
  snapshot = {
    ...snapshot,
    activeCartridgeId: id,
    selectedProjectId: id,
  };
  playTactileSound("cartridge");
  pulseScene(0.25);
  emit();
}

export function setCameraPreset(preset: CameraPreset) {
  snapshot = {
    ...snapshot,
    cameraPreset: preset,
  };
  playTactileSound("click");
  emit();
}

export function setHoveredArtefact(label: string | null) {
  if (snapshot.hoveredArtefact === label) return;
  snapshot = {
    ...snapshot,
    hoveredArtefact: label,
  };
  emit();
}

export function toggleSoundEnabled() {
  const next = !snapshot.soundEnabled;
  snapshot = {
    ...snapshot,
    soundEnabled: next,
  };
  if (next) {
    playTactileSound("switch");
  }
  emit();
}

export function openAppWindow(appId: AppId, options?: { projectId?: string; toolId?: string }) {
  const nextZ = snapshot.topZIndex + 1;
  const target = snapshot.windows[appId];
  snapshot = {
    ...snapshot,
    windows: {
      ...snapshot.windows,
      [appId]: {
        ...target,
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      },
    },
    focusedAppId: appId,
    topZIndex: nextZ,
    selectedProjectId: options?.projectId ?? snapshot.selectedProjectId,
    selectedToolId: options?.toolId ?? snapshot.selectedToolId,
  };
  playTactileSound("window-open");
  emit();
}

export function closeAppWindow(appId: AppId) {
  const target = snapshot.windows[appId];
  if (!target.isOpen) return;
  snapshot = {
    ...snapshot,
    windows: {
      ...snapshot.windows,
      [appId]: {
        ...target,
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    },
    focusedAppId: snapshot.focusedAppId === appId ? null : snapshot.focusedAppId,
  };
  playTactileSound("window-close");
  emit();
}

export function minimizeAppWindow(appId: AppId) {
  const target = snapshot.windows[appId];
  snapshot = {
    ...snapshot,
    windows: {
      ...snapshot.windows,
      [appId]: {
        ...target,
        isMinimized: !target.isMinimized,
      },
    },
  };
  playTactileSound("click");
  emit();
}

export function toggleMaximizeAppWindow(appId: AppId) {
  const nextZ = snapshot.topZIndex + 1;
  const target = snapshot.windows[appId];
  snapshot = {
    ...snapshot,
    windows: {
      ...snapshot.windows,
      [appId]: {
        ...target,
        isMaximized: !target.isMaximized,
        isMinimized: false,
        zIndex: nextZ,
      },
    },
    focusedAppId: appId,
    topZIndex: nextZ,
  };
  playTactileSound("click");
  emit();
}

export function focusAppWindow(appId: AppId) {
  const target = snapshot.windows[appId];
  if (!target.isOpen) return;
  const nextZ = snapshot.topZIndex + 1;
  snapshot = {
    ...snapshot,
    windows: {
      ...snapshot.windows,
      [appId]: {
        ...target,
        isMinimized: false,
        zIndex: nextZ,
      },
    },
    focusedAppId: appId,
    topZIndex: nextZ,
  };
  emit();
}

export function closeAllAppWindows() {
  const updated: Record<AppId, WindowState> = { ...snapshot.windows };
  (Object.keys(updated) as AppId[]).forEach((k) => {
    updated[k] = { ...updated[k], isOpen: false, isMinimized: false, isMaximized: false };
  });
  snapshot = {
    ...snapshot,
    windows: updated,
    focusedAppId: null,
  };
  playTactileSound("window-close");
  emit();
}

export function selectProject(projectId: string) {
  snapshot = {
    ...snapshot,
    selectedProjectId: projectId,
    activeCartridgeId:
      projectId === "preflight" || projectId === "betta-pay" || projectId === "verivault"
        ? projectId
        : snapshot.activeCartridgeId,
  };
  playTactileSound("click");
  emit();
}

export function selectWorkshopTool(clusterId: string, toolId: string) {
  snapshot = {
    ...snapshot,
    selectedClusterId: clusterId,
    selectedToolId: toolId,
  };
  playTactileSound("click");
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

export function useWorkspaceStore(): WorkspaceSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

// Backwards-compatible alias for components referencing useStageStore
export function useStageStore() {
  const state = useWorkspaceStore();
  return {
    activeStage: state.activeStage,
    stageIndex: state.stageIndex,
  };
}
