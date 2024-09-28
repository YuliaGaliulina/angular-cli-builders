import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { LoadingService } from './services/loading.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatProgressBar, AsyncPipe, NgIf],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    loading$!: Observable<boolean>;
    
    constructor(private loadingService: LoadingService,
    ) {
    }
    
    ngOnInit(): void {
        this.loading$ = this.loadingService.loading$;
    }
}
