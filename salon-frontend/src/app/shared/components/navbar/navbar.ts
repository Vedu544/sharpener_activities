import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],  // ← Add this
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
}