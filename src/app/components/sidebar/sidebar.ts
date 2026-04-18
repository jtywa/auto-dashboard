import { Component } from '@angular/core';
import { NavButton } from '../nav-button/nav-button';
import { UserBox } from '../user-box/user-box';

@Component({
  selector: 'app-sidebar',
  imports: [NavButton, UserBox],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {}
