import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleMenuComponent } from './single-menu/single-menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
  declarations: [SingleMenuComponent, MenuItemComponent],
  imports: [CommonModule],
  exports: [SingleMenuComponent, MenuItemComponent],
})
export class ComponentsModule {}
