import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { input } from '@angular/core';

@Component({
  selector: 'app-nav-button',
  imports: [NgClass],
  templateUrl: './nav-button.html',
  styleUrl: './nav-button.css',
})
export class NavButton {
  current = input<boolean>(false);
  label = input<string>();
  count = input<number>();
}
