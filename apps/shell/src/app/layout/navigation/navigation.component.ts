import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'pulso-shell-navigation',
  imports: [MatListModule, MatIconModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent { }
