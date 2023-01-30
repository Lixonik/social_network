import { Component } from '@angular/core';
import {TestService} from "../../services/test.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  constructor(testService: TestService) {
    testService.consoleText()
  }
}
