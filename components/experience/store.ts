"use client";

import { useSyncExternalStore } from "react";

export const STAGES = [
  { id: "hero", label: "Index", state: "LATTICE" },
  { id: "about", label: "About", state: "TOWER" },
  { id: "projects", label: "Projects", state: "ORBIT" },
  { id: "stack", label: "Stack", state: "GRID" },
  { id: "lab", label: "Lab", state: "MEMPOOL" },
  { id: "writing", label: "Writing", state: "GROUND" },
  { id: "contact", label: "Contact", state: "CORE" },
] as const;

export type StageId = (typeof STAGES)[number]["id"];

export const sceneState = {
  stage: 0,
  pointerX: 0,
  pointerY: 0,
  dragVelocity: 0,
};

export function pulseScene(velocity = 1) {
  sceneState.dragVelocity = Math.max(-2.5, Math.min(2.5, velocity));
}

export function setPointer(x: number, y: number) {
  sceneState.pointerX = x;
  sceneState.pointerY = y;
}

export function decayDragVelocity(factor: number) {
  sceneState.dragVelocity *= factor;
}

const stageListeners = new Set<() => void>();

export function setStage(stage: number) {
  if (sceneState.stage === stage) return;
  sceneState.stage = stage;
  stageListeners.forEach((listener) => listener());
}

export function subscribeStage(listener: () => void) {
  stageListeners.add(listener);
  return () => {
    stageListeners.delete(listener);
  };
}

export function useStage() {
  return useSyncExternalStore(
    subscribeStage,
    () => sceneState.stage,
    () => 0,
  );
}

/* ---------- Case-file (project detail) store ---------- */

let openProjectId: string | null = null;
const projectListeners = new Set<() => void>();

export function openProject(id: string | null) {
  openProjectId = id;
  projectListeners.forEach((listener) => listener());
}

function subscribeProject(listener: () => void) {
  projectListeners.add(listener);
  return () => {
    projectListeners.delete(listener);
  };
}

export function useOpenProject() {
  return useSyncExternalStore(
    subscribeProject,
    () => openProjectId,
    () => null,
  );
}

/* ---------- Smooth-scroll bridge ---------- */

type ScrollTarget = string | number | HTMLElement;
type Scroller = {
  scrollTo: (target: ScrollTarget, options?: { offset?: number }) => void;
  stop: () => void;
  start: () => void;
};

let scroller: Scroller | null = null;

export function registerScroller(instance: Scroller | null) {
  scroller = instance;
}

export function scrollToTarget(target: ScrollTarget) {
  if (scroller) {
    scroller.scrollTo(target, { offset: 0 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function lockScroll(locked: boolean) {
  if (scroller) {
    if (locked) scroller.stop();
    else scroller.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
