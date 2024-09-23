import { Category } from '../../core/interfaces/category';
import { CategoryService } from './../../core/services/category.service';
import { Component, inject, WritableSignal, signal, effect, computed, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  protected readonly  _CategoryService = inject(CategoryService);
  searchTerm:WritableSignal<string> = signal("");
  protected categories:Signal<Category[]> = computed(() => {
    console.log(this._CategoryService.categories());
    
    return this._CategoryService.search(this.searchTerm());
  });
  ngOnInit(): void {
    this._CategoryService.getCategories().subscribe({
      next: (res) => {
        this._CategoryService.categories.set(res.data)
      }
    });
  }
  getCategories():void
  {
    this._CategoryService.getCategories().subscribe({
      next: (res) => {
        this._CategoryService.categories.set(res.data)
      }
    });
  }
  
}
