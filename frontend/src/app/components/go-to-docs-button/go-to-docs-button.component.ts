import { Component, inject, Input } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { VersionsStore } from "../../state/versions/versions.store";

@Component({
  selector: 'app-go-to-docs-button',
  standalone: true,
  imports: [
    MatAnchor,
    RouterLink
  ],
  templateUrl: './go-to-docs-button.component.html',
  styleUrl: './go-to-docs-button.component.scss'
})
export class GoToDocsButtonComponent {
  @Input() title = 'Get started';
  readonly versionsStore = inject(VersionsStore);
}
