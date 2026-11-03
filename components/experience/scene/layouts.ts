import type { CameraPreset } from "@/components/experience/store";

export const CAMERA_PRESETS: Record<
  CameraPreset,
  {
    position: [number, number, number];
    target: [number, number, number];
    label: string;
    code: string;
  }
> = {
  overview: {
    position: [0.35, 3.35, 5.15],
    target: [0, 0.25, 0],
    label: "Studio Overview",
    code: "CAM // 01",
  },
  screen: {
    position: [0.0, 1.45, 2.55],
    target: [0, 0.72, -0.45],
    label: "Workstation Display",
    code: "CAM // 02",
  },
  hardware: {
    position: [-1.85, 1.85, 2.85],
    target: [-1.35, 0.18, 0.2],
    label: "Cable & ZK Signer",
    code: "CAM // 03",
  },
  blueprint: {
    position: [0.0, 5.8, 0.65],
    target: [0, 0, 0],
    label: "Top-Down Schematic",
    code: "CAM // 04",
  },
};
