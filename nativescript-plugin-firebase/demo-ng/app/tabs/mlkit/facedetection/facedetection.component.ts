import { Component } from "@angular/core";
import { MLKitDetectFacesOnDeviceResult, MLKitDetectFacesResultFace } from "nativescript-plugin-firebase/mlkit/facedetection";
import { AbstractMLKitViewComponent } from "~/tabs/mlkit/abstract.mlkitview.component";

@Component({
  selector: "mlkit-facedetection",
  moduleId: module.id,
  templateUrl: "./facedetection.component.html",
})
export class FaceDetectionComponent extends AbstractMLKitViewComponent {
  faces: Array<MLKitDetectFacesResultFace>;

  mlKitAllOK: string;
  allSmilingAndEyesOpen: boolean = false;

  onFaceDetectionResult(scanResult: any): any {
    const value: MLKitDetectFacesOnDeviceResult = scanResult.value;
    if (value.faces.length > 0) {
      this.faces = value.faces;
      console.log("this.faces: " + JSON.stringify(this.faces));

      this.allSmilingAndEyesOpen = true;
      value.faces.forEach(face => {
        this.allSmilingAndEyesOpen = this.allSmilingAndEyesOpen && face.smilingProbability && face.leftEyeOpenProbability && face.rightEyeOpenProbability &&
            face.smilingProbability > 0.7 && face.leftEyeOpenProbability > 0.7 && face.rightEyeOpenProbability > 0.7;
      });
      this.mlKitAllOK = `All smiling and eyes open? ${this.allSmilingAndEyesOpen ? 'Yes!' : 'Nope'}`;
    }
  }
}
