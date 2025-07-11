import { NgtTriple } from '@angular-three/core';

/**
 * Represents the settings for a feature panel in the home scene.
 */
export class FeaturePanel {
  constructor(
    public position: NgtTriple,
    public rotation: number,
    public route: string,
    public label: string
  ) {}
} 