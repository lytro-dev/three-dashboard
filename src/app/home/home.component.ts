import { Component, NgZone, OnInit } from '@angular/core';
import { NgtTriple } from '@angular-three/core';
import { CameraService } from '../camera.service';
import { Intersection, Object3D } from 'three';
import { ActivatedRoute, Router } from '@angular/router';
import { FeaturePanel } from './feature-panel.model';

/**
 * Represents the settings for a feature panel in the home scene.
 */

@Component({
  templateUrl: 'home.component.html',
  // styleUrls: ['home.component.css'], // Uncomment if/when CSS file is added
})
export class HomeComponent implements OnInit {
  /**
   * Feature groups for the home scene, organized by row.
   */
  readonly topRowFeatures = [
    { route: 'datagrid', label: 'Data Grids' },
    { route: 'three-gui', label: 'Ng3 GUI' },
    { route: 'lists', label: 'Lists' },
    { route: 'flat-ui', label: 'Flat UI' },
    { route: 'kanban', label: 'Kanban Board' },
    { route: 'actions', label: 'Actions' },
    { route: 'patheditor', label: 'Path Editor' },
    { route: 'pexelsvideo', label: 'Pexels Video' },
    { route: 'shapeware-shapes', label: 'Shapeware Shapes' },
    { route: 'file-browser', label: 'File/Folder Browser' },
    { route: 'charts', label: 'Charts' },
  ];

  readonly middleRowFeatures = [
    { route: 'htmlgui', label: 'GUI Window' },
    { route: 'buttons', label: 'Buttons' },
    { route: 'forcelayout', label: 'Force Layout' },
    { route: 'spirograph', label: 'Spirograph' },
    { route: 'artlife', label: 'Particle Life' },
    { route: 'svg', label: 'SVG Icons' },
    { route: 'graph', label: 'Directed Graph Layout' },
    { route: 'collisions', label: 'Collisions' },
    { route: 'loading', label: 'Loading' },
    { route: 'stats', label: 'Stats' },
    { route: 'jdenticon', label: 'Jdenticon' },
    { route: 'dicebear', label: 'DiceBear Avatars' },
    { route: 'pexelsphoto', label: 'Pexels Photo' },
  ];

  readonly bottomRowFeatures = [
    { route: 'ballshooter', label: 'Ball Shooter' },
    { route: 'dragging', label: 'Dragging' },
    { route: 'handinput', label: 'Hand Input' },
    { route: 'teleport', label: 'Teleport' },
    { route: 'bat', label: 'Physics Bat' },
    { route: 'inspect', label: 'Grab / Inspect' },
    { route: 'drumstick', label: 'Keyboard / Drumstick' },
    { route: 'touchpad', label: 'Touchpad Movement' },
    { route: 'joystick', label: 'Joystick Movement' },
    { route: 'behaviors', label: 'Toggle Controller Behaviors' },
    { route: 'studio', label: 'Lights, Camera, Action' },
    { route: 'paint', label: 'Paint' },
    { route: 'scale', label: 'World Scale' },
    { route: 'morphwall', label: 'Morphing Wall' },
  ];

  /**
   * Panels for each row, calculated from feature groups.
   */
  readonly topPanels: FeaturePanel[] = [];
  readonly middlePanels: FeaturePanel[] = [];
  readonly bottomPanels: FeaturePanel[] = [];

  /**
   * List of selectable 3D objects for interaction.
   */
  readonly selectableObjects: Object3D[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly zone: NgZone,
    private readonly cameraService: CameraService,
  ) {
    // Restore camera defaults
    this.cameraService.position = [0, 2, 4];
    this.cameraService.fov = 55;

    this.topPanels = this.createPanels(this.topRowFeatures);
    this.middlePanels = this.createPanels(this.middleRowFeatures);
    this.bottomPanels = this.createPanels(this.bottomRowFeatures);
  }

  /**
   * Converts a feature list into a set of FeaturePanel objects arranged in a circle.
   */
  private createPanels(features: { route: string; label: string }[]): FeaturePanel[] {
    const angleStep = 360 / features.length;
    return features.map((feature, index) => {
      const position: NgtTriple = [0, 0, 0];
      const rotation = angleStep * index;
      return new FeaturePanel(position, rotation, feature.route, feature.label);
    });
  }

  ngOnInit(): void {
    // If a query param 'example' is present, navigate to that route after a short delay
    const example = this.route.snapshot.queryParams['example'];
    if (example) {
      setTimeout(() => {
        this.router.navigate(['/' + example]);
      }, 1000);
    }
  }

  /**
   * Handles intersection event from VR controller.
   */
  onIntersect(intersection: Intersection): void {
    this.onSelect(intersection.object);
  }

  /**
   * Handles selection of a 3D object, navigating to the associated route.
   */
  onSelect(object: Object3D): void {
    const route = object.userData['asset'];
    if (route) {
      this.zone.run(() => {
        this.router.navigate([route]);
      });
    }
  }

  /**
   * Highlights a 3D object when hovered/selected.
   */
  onHighlight(intersection: Intersection): void {
    intersection.object.scale.multiplyScalar(1.02);
  }

  /**
   * Removes highlight from a 3D object.
   */
  onUnhighlight(intersection: Intersection): void {
    intersection.object.scale.multiplyScalar(0.98);
  }
}
